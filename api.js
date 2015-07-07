var request = require("request");
var Promise = require("es6-promise").Promise;

/**
 * Exporting API for development
 */
module.exports = Api;

/**
 * Exporting API for custom execution
 */
exports.api = {
    Api: Api,
    Promise: Promise
};


/**
 * Api client for KidoZen backend services.
 * @param {object} opts An object containing the following parameters:
 *                      @param {string} url Application URL
 *                      @param {string} app Application Name
 *                      @param {string} authServiceURL Auth Service URL
 *                      @param {string} token User Token for Impersonation Security
 *                      @param {object} user User Profile Set of Claims For Delegation Security
 *                      @param {string} clientID Client ID Service Account
 *                      @param {string} clientSecret Client Secret Service Account
 */
function Api (opts) {
    var self  = this;
    this.opts = opts;
    this.url  = opts.url; //application URL
    this.authServiceURL = opts.authServiceURL;
    this.impersonation = !!opts.token;
    this.delegation = !!opts.user;
    if (this.impersonation) this.token = new Promise(function (resolve, reject) { 
        resolve({ access_token: opts.token }); 
    });
    //service account
    else this.token = getToken();

    function getToken () {
        return new Promise(function (resolve, reject) {
            var requestOptions = {
                url: self.authServiceURL,
                form: {
                    "client_id": self.opts.clientID,
                    "client_secret": self.opts.clientSecret,
                    "scope": self.opts.app
                },
                strictSSL: false
            };

            if (self.delegation) {
                requestOptions.form.user_profile = self.opts.user;
                requestOptions.form.grant_type = "user_profile";

            } else requestOptions.form.grant_type = "client_credentials";

            request.post(requestOptions, function (err, res, body) {
                if (err) {
                    reject({"message":"Error getting auth token","error":err,"requestOptions":requestOptions});
                }
                else if (res.statusCode !== 200) {
                    reject({"message":"Error getting auth token","status":res.statusCode,"error":body,"requestOptions":requestOptions});
                }
                else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    this.invoke = function (opts) {
       return self.token
            .then(function (token) {
                //TODO: if (!impersontation && tokenExpired(token)) return self.getToken();
                return token;
            })
            .then(function (token) {
                return new Promise(function (resolve, reject) {
                    invoke(opts, token, function (err, res, body) {
                        if (err) reject(err);
                        else if (res.statusCode !== 200) reject({"message":"API invokation error","status":res.statusCode,"error":body});
                        else resolve(body);
                    });
                });
            }).catch(function(err){
                return err;
            });

        function invoke (opts, token, cb) {
            var authorization = "Bearer " + token.access_token;
            request({
                method: opts.method || "GET",
                url: self.url + opts.path,
                json: opts.data,
                headers: {
                    Authorization: authorization
                },
                strictSSL: false
            }, cb);
        }
    };

    this.reject = function () {
        var args = arguments;
        return new Promise(function (resolve, reject) {
            reject.apply(this, args);
        } );
    };

    this.resolve = function () {
        var args = arguments;
        return new Promise(function (resolve, reject) {
            resolve.apply(this, args);
        } );
    };
}

