var assert  = require("assert");
var Api     = require("./api");
var script  = require("./script");
var config  = require("./config.json");

var authServiceURL = "https://auth.kidozen.com/v1/" + config.tenant + "/oauth/token";

var apiParams = {
    app: config.app,
    url: config.url,
    authServiceURL: authServiceURL,
    clientID: config.clientID,
    clientSecret: config.clientSecret
};

var api = new Api(apiParams);

describe("Custom Script Test Case", function () {
    "use strict";

    it("Unit test 1. Should Execute OK", function (done) {
        this.timeout(5000);
        var user;
        var params = {"name":"sole"};
        var doneCallback = function (data) {
            assert.ok(data);
            done();
        };
        var errorCallback = function (err) {
            done(err);
        };
        var result = script(api, params, user);
        if (result instanceof Promise) {
            result.then(doneCallback).catch(errorCallback);
        } else {
            doneCallback(result);
        }
    });
});             