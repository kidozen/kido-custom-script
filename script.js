
module.exports = userCustomFunction;
var Promise = require("es6-promise").Promise;

/**
 * This function contains the custom code to execute.
 * It's important that you don't modify the function's name.
 * The Kidozen Platform expects a function called 'userCustomFunction'
 * @param  {object} api    An instance of the Api Class
 * @param  {object} params The params (if needed) to execute the custom code
 * @param  {object} user   A user mockup.
 * @return {object}        Returns a Promise.
 */

function userCustomFunction (api, params, user) {
    if (!params)
        return api.reject("missing required params");
    if (!params.name)
        return api.reject("missing required name parameter");
    if (params.name.length > 25)
        return api.reject("name is too long");

    return api.resolve("The name param is: " + params.name);

    //API invocation example
    // return api.invoke({
    //     method: "GET", 
    //     path: "/api/v2/datasources/http-bin-get?name=foo&age=32"
    // });
}