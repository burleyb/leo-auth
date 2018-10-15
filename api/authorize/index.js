"use strict";
var request = require("@leo-sdk/core/auth/request.js");

exports.handler = function (event, context, callback) {

  request.authorize(event.body.event, event.body.resource, function (err, user) {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        authorized: event.body.request_id,
        user: user
      });
    }
  });

};
