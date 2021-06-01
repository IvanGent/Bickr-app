This is guide to creating a quick backend with express

1. IN THE TERMINAL TYPE
    - npm init
        - add description
        - change entry point
        - add author
    - touch app.js
    - touch .gitignore
    - code .
    - npm i express mongoose cors requests validator
        (requests is like postman but for something simple
         validator is for database validation on the backend)
    the -D is devDependencies
    - npm i -D nodemon (nodemon is for debugging)
    - in your .gitignore add /node_modules

2. Go to package.json
    Here you mess with the scripts
    - first one to add is "start":"node app.js"
    - second one is "server":"nodemon app.js"
    - third one is "server:debug":"nodemon --inspect app.js"
    scripts should look like so:
```js
    "scripts": {
        "start":"node app.js",
        "server":"nodemon app.js",
        "server:debug":"nodemon --inspect app.js"
    }
```

3. Go to app.js
    - require express and save to a variable (const express = require('express')).
    - initiate app by invoking that variable (const app = express())
    - create a route to see if it works
```js
        app.get('/', (req,res) => res.send("This Works"))
        // two arguments path and callback and the callback always takes a request - req and a response - res.
```
    - create a port
```js
        const port = process.env.PORT || 5000
        // Checking the .env file if a port is specified and if not then go with 5000
```
    - have the app listen on that port
```js
        app.listen(port, () => console.log(`Server is serving on port ${port}`))
```

4. IN TERMINAL TYPE
    - npm run server:debug
    (Going to local host should show "This Works" and your terminal should show "Server is serving on port `PORT NUMBER`")

(CORS - Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources. CORS also relies on a mechanism by which browsers make a “preflight” request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

An example of a cross-origin request: the front-end JavaScript code served from https://domain-a.com uses XMLHttpRequest to make a request for https://domain-b.com/data.json.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy. This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.)

///////////////////////////

This is a guide for an express app with postgres database

 - Create a .gitignore and add the following:
    node_modules
    .env
    build
    .DS_Store
    
 - initiate npm and install the following dependencies:
    - bcryptjs - password hashing
    - cookie-parser - parsing cookies from requests
    - cors - CORS
    - csurf - CSRF protection
    - dotenv - load environment variables into Node.js from a .env file
    - express - Express
    - express-async-handler - handling async route handlers
    - express-validator - validation of request bodies
    - faker - random seeding library
    - helmet - security middleware
    - jsonwebtoken - JWT
    - morgan - logging information about server requests/responses
    - per-env - use environment variables for starting app differently
    - pg@">=8.4.1" - PostgresQL greater or equal to version 8.4.1
    - sequelize@5 - Sequelize
    - sequelize-cli@5 - use sequelize in the command line

    npm install -D the following:
    - dotenv-cli - use dotenv in the command line
    - nodemon - hot reload server backend files
 
 - Create a .env file that will be use to define your environment variables
    PORT=<<port number>>
    DB_USERNAME=auth_app <<can be another user>>
    DB_PASSWORD=<<db_users password>>
    DB_DATABASE=auth_db <<name of the database>>
    DB_HOST=localhost
    JWT_SECRET=<<generate_strong_secret>>
    JWT_EXPIRES_IN=604800 <<604800 is a week in seconds>>

- Create a config file and create and index.js in that file
    add the following:
```js
    module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
}
```