#KidoZen Custom Script
These set of utilities are designed to help customers to develop custom scripts which will run on Kidozen's platform.

##Requirements
You will need version 0.10.33 or greater of Node.js installed in your system. You can download it [here](http://nodejs.org/download/).

##Installation
You can install this module dependencies from npm (by executing `npm install` in your terminal)

##Files Description
Each file has a specific purpose:

* **api.js**: This is the exposed API for invoking Kidozen Services from inside the custom script. **This file is not intended to be edited**.
* **run.js**: This is another sample file which will run your custom script and will print the result on stdout. You can run it with `node run.js`. **This file is not intended to be edited**.
* **config.json.sample**: This is the config file sample. Copy this file with the name 'config.json' and complete it with the Tenant, application and security's configuration details.
* **user.js**: User Profile Mock. An array of user claims which will be passed to the custom scripts. This mock represents the user which is invoking the custom script.
* **script.js**: Here you can write your custom script. 
* **test.js**: This is a sample file with mocha unit tests. The code here can be executed with the `mocha` test runner

##Setting up
Create a file named `config.json` (you can use the config.json.sample as a template).

```javascript
{
    "tenant": <TENANT NAME>,
    "clientID": <APPLICATION CLIENT ID>,
    "clientSecret": <APPLICATION CLIENT SECRET>,
    "app": <APPLICATION NAME>,
    "url": <APPLICATION URL>
}
```

For example a config file for the tenant "kidodemo" and the application "tasks" is as follows:

```javascript
{
    "tenant": "kidodemo",
    "clientID": "a41468c9-3e6d-4c6f-baef-b040cc024f98",
    "clientSecret": "86BE9511AhJzCGM7w1J6m+cBeq8jH7oA2SvyWqQqFE7=",
    "app": "tasks",
    "url": "https://tasks-kidodemo.kidocloud.com"
}
```

##Sample Scripts

### Validation Sample:

```javascript
function userCustomFunction (api, params, user) {
    if (!params)
        return api.reject("missing required params");
    if (!params.name)
        return api.reject("missing required name parameter");
    if (params.name.length > 25)
        return api.reject("name is too long");

    api.resolve("The name param is: " + params.name);
}
```

### Agregating from two Data Access APIs (datasources)

```javascript
function userCustomFunction (api, params, user) {
    return api.invoke({path: "/api/v2/datasources/GetCityForecastByZIP-33431-Cloud"})
    .then(function (data1) {
        return return api.invoke({path: "/api/v2/datasources/GetCityForecastByZIP-33033-Cloud"})
        .then(function (data2) {
            return { data1: data1, data2: data2 };
        });
    });
}
```

### Invoking an Operation Data Access API with parameters

```javascript
function userCustomFunction (api, params, user) {
    return api.invoke({path: "/api/v2/datasources/GetCityForecastByZIP-Cloud",
        method: "POST", data: {zip: params.zip}})
    .then(function (data) {
        return { data: data };
    });
}
```

### Invoking a query Data Access API passing a parameter

```javascript
function userCustomFunction (api, params, user) {
    return api.invoke({path: "/api/v2/datasources/GetCityForecastByZIP-Cloud?zip=" + params.zip})
    .then(function (data) {
        return { data: data };
    });
}
```

### Invoking a Storage Core API

```javascript
function userCustomFunction (api, params, user) {
    return api.invoke({path: "/storage/local"}).then(function (data) {
        return { data: data };
    });
}
```