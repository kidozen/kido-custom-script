var Api     = require("./api");
var script  = require("./script");
var config  = require("./config.json");
var user    = require("./user.js");

var authServiceURL = "https://auth.kidozen.com/v1/" + config.tenant + "/oauth/token";

var apiParams = {
    app: config.app,
    url: config.url,
    authServiceURL: authServiceURL,
    clientID: config.clientID,
    clientSecret: config.clientSecret
};

var api = new Api(apiParams);

script(api, {"name":"foo"}, user).then(function (data) {
    console.log("Execution Successful. Returned Data:", data);
}).catch(function (err) {
    console.log("Error in execution:", err);
});
