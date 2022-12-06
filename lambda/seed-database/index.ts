"use strict";

const https = require("https");
const url = require("url");

const config = require("leo-config");
const env = process.env.LEO_ENVIRONMENT as string;
const resourcesJson = JSON.parse(process.env.Resources as string);
config.bootstrap({ [env]: { leoaws: resourcesJson } });
const leoAws = require("leo-aws");

export type Callback = (err: Error | null, data?: any) => void;

export interface Event {
  ResponseURL?: any;
  PhysicalResourceId?: any;
  StackId?: any;
  RequestId?: any;
  LogicalResourceId?: any;
  RequestType?: any;
}

export interface Response {
  Status: string;
  Reason?: string;
  PhysicalResourceId: any;
  StackId: any;
  RequestId: any;
  LogicalResourceId: any;
}

export interface HttpResponse {
  statusCode: string;
  statusMessage: string;
}

export interface Policy {
  name: string;
  statements: any;
}

export interface Identity {
  identity: any;
  policy: Policy | "*";
}

export function handler(event: Event, _: any, callback: Callback) {
  console.log(event);

  function sendResponse(result: Response) {
    return new Promise((resolve, reject) => {
      console.log(result);
      var responseBody = JSON.stringify(result);
      var parsedUrl = url.parse(event.ResponseURL);
      var options = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.path,
        method: "PUT",
        headers: {
          "content-type": "",
          "content-length": responseBody.length,
        },
      };

      var request = https.request(options, function (response: HttpResponse) {
        console.log("Status code: " + response.statusCode);
        console.log("Status message: " + response.statusMessage);
        resolve(result);
      });

      request.on("error", function (error: Error) {
        console.log("send(..) failed executing https.request(..): " + error);
        reject(error);
      });
      request.write(responseBody);
      request.end();
    });
  }

  process.on("uncaughtException", function (err) {
    console.log("Got unhandled Exception");
    console.log(err);
    return sendResponse({
      Status: "FAILED",
      Reason: "Uncaught Exception",
      PhysicalResourceId: event.PhysicalResourceId,
      StackId: event.StackId,
      RequestId: event.RequestId,
      LogicalResourceId: event.LogicalResourceId,
    });
  });

  event.PhysicalResourceId = "install";
  const steps =
    event.RequestType === "Create"
      ? [
          addIdentity({
            identity: "*",
            policy: "*",
          }).then(() => {
            return addPolicy({
              name: "*",
              statements: ['{"Effect": "Allow","Action": "*","Resource": "*"}'],
            });
          }),
        ]
      : [];

  console.log("STEPS", steps);
  const sendRespPromise = Promise.all(steps)
    .then((foo) => {
      console.log("Got success", foo);
      return sendResponse({
        Status: "SUCCESS",
        PhysicalResourceId: event.PhysicalResourceId,
        StackId: event.StackId,
        RequestId: event.RequestId,
        LogicalResourceId: event.LogicalResourceId,
      });
    })
    .catch((err) => {
      console.log("Got error");
      console.log(err);
      return sendResponse({
        Status: "FAILED",
        Reason: "it failed",
        PhysicalResourceId: event.PhysicalResourceId,
        StackId: event.StackId,
        RequestId: event.RequestId,
        LogicalResourceId: event.LogicalResourceId,
      });
    });
  sendRespPromise
    .then((resp) => {
      callback(null, resp);
    })
    .catch(callback);
}

function addPolicy(policy: Policy): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log("Adding policy", leoAws.config.LeoAuthPolicy, policy);
    leoAws.dynamodb._service.update(
      {
        TableName: leoAws.config.LeoAuthPolicy,
        Key: {
          name: policy.name,
        },
        UpdateExpression: "set statements  = :statements",
        ExpressionAttributeValues: {
          ":statements": policy.statements,
        },
      },
      (err: Error, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

function addIdentity(identity: Identity): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log("Adding Identity", leoAws.config.LeoAuthIdentity, identity);
    leoAws.dynamodb._service.update(
      {
        TableName: leoAws.config.LeoAuthIdentity,
        Key: {
          identity: identity.identity,
          policy: identity.policy,
        },
      },
      (err: Error, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}
