'use strict';

let leo = require("leo-sdk");
var base = require("@leo-sdk/core/command/lib/installBase");
var util = require("@leo-sdk/core/command/lib/installUtil");
let dynamodb = leo.aws.dynamodb;

var self = module.exports = base("Auth", [{
  name: "LeoAuth",
  format: function (resources) {
    //console.log(resources);
    return {
      Roles: module.exports.getRoles(resources),
      RestAPI: resources.AuthorizationGateway.id
    }
  }
}], {
  tasks: [
    (done) => {
      dynamodb.update("Leo_microservice", {
        name: "leo_auth"
      }, {
        version: 0
      }, {
        fields: {
          version: {
            once: true
          }
        },
        ReturnValues: "ALL_NEW"
      }, (err, data) => {
        if (!err) {
          self.setVariables({
            version: data.Attributes.version
          });
        }
        done(err, data)
      })
    },
    (done) => {
      dynamodb.update("Leo_auth_identity", {
        identity: "*",
        policy: "*"
      }, {}, (err) => {
        console.log(err);
        done(err);
      });
    },
    (done) => {
      dynamodb.scan("Leo_auth_policy", null, (err, data) => {
        if (err) {
          return done(err);
        }

        if (data.length == 0) {
          dynamodb.put("Leo_auth_policy", "*", {
            statements: [JSON.stringify({
                Effect: "Allow",
                Action: "auth:*",
                Resource: "lrn:leo:auth:::*"
              }),
              JSON.stringify({
                Effect: "Allow",
                Action: "botmon:*",
                Resource: "lrn:leo:botmon:::*"
              }),
              JSON.stringify({
                Effect: "Allow",
                Action: "micro:*",
                Resource: "lrn:leo:micro:::*"
              }),
              JSON.stringify({
                Effect: "Allow",
                Action: "core:*",
                Resource: "lrn:leo:core:::*"
              }),
              JSON.stringify({
                Effect: "Allow",
                Action: "dw:*",
                Resource: "lrn:leo:dw:::*"
              })
            ]
          }, {
            id: "name"
          }, (err) => {
            done(err);
          });
        } else {
          done();
        }
      });
    },
    (done) => {
      var refs = {
        "authenticated": self.getVariable("micro.roles.auth"),
        "unauthenticated": self.getVariable("micro.roles.unauth"),
        "api": self.getVariable("auth.restapi")
      };

      console.log(refs)
      util.addApiToRoles(
        [refs.authenticated, refs.unauthenticated],
        "leo_micro_exec",
        refs.api,
        module.exports.getAccountId(),
        done
      );
    }
  ]
});

self.bots = [
  "bots/watch"
];

// var flag = process.argv[2];
// module.exports.install(() => {
//   console.log("ALL DONE");
//   if (flag == "deploy") {
//     var bots = [
//       "bots/watch"
//     ];

//     async.eachSeries(bots, (bot, done) => {
//       var botPath = path.resolve(process.cwd() + "../../", bot);
//       console.log("Deploying", botPath);
//       exec(`npm install && leo deploy . ${configure._meta.env} ${configure._meta.region}`, {
//         cwd: botPath,
//         stdio: 'inherit'
//       });
//       done();
//     });
//   }
// });