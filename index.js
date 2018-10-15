"use strict";

var authorize = require("./lib/authorize.js");

exports.handler = function (event, context, callback) {
  var requestId = event.request_id;
  authorize(event.identity_id, event.request, function (result) {
    if (result.auth) {
      callback(null, {
        authorized: requestId
      });
    } else {
      callback("Unauthorized");
    }
  });
};