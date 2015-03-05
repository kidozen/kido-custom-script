
module.exports = userCustomFunction;

/**
 * This function contains the custom code to execute.
 * It's important that you don't modify the function's name.
 * The Kidozen Platform expects a function called 'userCustomFunction'
 * @param  {object} api    An instance of the Api Class
 * @param  {object} params The params (if needed) to execute the custom code
 * @param  {object} user   A user mockup.
 * @return {object}        Returns a Promise.
 */
function userCustomFunction(api, params, user) {
    // Sample code which invokes the storage service for the current application
    return api.invoke({path: "/storage/local"}).then(function (data) {
        return { length: JSON.stringify(data).length };
    });
}