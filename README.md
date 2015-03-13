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
