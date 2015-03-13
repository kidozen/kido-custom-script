
/**
 * User Profile Mock
 * An array of user claims which will be passed to the custom scripts.
 * This mock represents the user which is invoking the custom script.
 */
var user = [ { type: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
       value: "johndoe@kidozen.com" },
     { type: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
       value: "John Doe" },
     { type: "http://schemas.kidozen.com/role",
       value: "Application Center Admin" },
     { type: "http://schemas.kidozen.com/usersource",
       value: "Administrative User" },
     { type: "http://schemas.kidozen.com/identityprovider",
       value: "https://identity.kidozen.com/" },
     { type: "http://schemas.kidozen.com/action",
       value: "allow all *" } ];

module.exports = user;