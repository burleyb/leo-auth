const { unmarshall } = require("@aws-sdk/util-dynamodb");
const config = require("leo-config");
const env = process.env.LEO_ENVIRONMENT as string
const resourcesJson = JSON.parse(process.env.Resources as string);
config.bootstrap({ [env]: { leoaws: resourcesJson } })
const leoAws = require("leo-aws");
var dynamodb = leoAws.dynamodb;
var async = require("async");

let AUTH_TABLE = config.leoaws.LeoAuth;
let IDENTITY_TABLE = config.leoaws.LeoAuthIdentity;
let POLICY_TABLE = config.leoaws.LeoAuthPolicy;

type Callback = (err: Error | null, data?: any) => void 
interface Event { Records: any[] }
interface Identity { identity?: any, policies?: any } 

export function handler(event: Event, _: any, callback: Callback) {
  var record = event.Records[0]; //We limit to 1 event per call
  console.log(record.eventSourceARN);
  if (record.eventSourceARN.match(POLICY_TABLE)) {
    console.log(JSON.stringify(record, null, 2));
    var policy = unmarshall(record.dynamodb.NewImage);
    console.log(JSON.stringify(policy,null, 2));
    dynamodb._service.query({
      TableName: IDENTITY_TABLE,
      IndexName: "policy-identity-id",
      KeyConditionExpression: "policy = :policy",
      ExpressionAttributeValues: {
        ":policy": policy.name
      }
    }, function (err: Error, data: { Items: any[]; }) {
      if (err) {
        callback(err);
      } else {
        var updates: any[] = [];

        var ids = data.Items.reduce((sum, each) => {
          sum[each.identity] = true;
          return sum;
        }, {});

        // Verify all entries have the default policies object
        Object.keys(ids).forEach(id => {
          updates.push(function (done: Callback) {
            console.log("ID", id)
            dynamodb._service.update({
              TableName: AUTH_TABLE,
              Key: {
                identity: id
              },
              UpdateExpression: 'set #policies = if_not_exists(#policies, :policies)',
              ExpressionAttributeNames: {
                '#policies': "policies"
              },
              ExpressionAttributeValues: {
                ':policies': {}
              }
            }, done);
          });
        });

        data.Items.forEach(function (identity) {
          updates.push(function (done: Callback) {
            console.log("Identity", identity.identity, policy.name, policy.statements)
            dynamodb._service.update({
              TableName: AUTH_TABLE,
              Key: {
                identity: identity.identity
              },
              UpdateExpression: 'set policies.#policy  = :policy',
              ExpressionAttributeNames: {
                '#policy': policy.name
              },
              ExpressionAttributeValues: {
                ':policy': policy.statements
              }
            }, done);
          });
        });
        async.series(updates, callback);
      }
    });
  } else {
    var keys = unmarshall(record.dynamodb.Keys);
    dynamodb._service.get({
      TableName: AUTH_TABLE,
      Key: {
        identity: keys.identity
      }
    }, function (err: Error, data: any) {
      if (err) {
        callback(err);
      } else {
        var identity: Identity = {};
        if (data.Item) {
          identity = data.Item;
        } else {
          identity = {
            identity: keys.identity,
            policies: {}
          };
        }
        console.log("in identity", identity);
        if (record.eventName == "REMOVE") {
          delete identity.policies[keys.policy.toLowerCase()];
          saveIdentity(identity, callback);
        } else {
          dynamodb._service.get({
            TableName: POLICY_TABLE,
            Key: {
              name: keys.policy
            }
          }, function (err:Error, data: any) {
            if (err) {
              callback(err);
            } else if (data.Item) {
              identity.policies[keys.policy.toLowerCase()] = data.Item.statements;
            } else {
              identity.policies[keys.policy.toLowerCase()] = "";
            }
            // console.log(identity);
            saveIdentity(identity, callback);
          });
        }
      }
    });
  }
};

function saveIdentity(identity: Identity, callback: Callback) {
  console.log("out identity", identity);
  dynamodb._service.put({
    TableName: AUTH_TABLE,
    Item: identity
  }, callback);
}