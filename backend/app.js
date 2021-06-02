const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {ValidationError} = require('sequelize');
const {environment} = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes');

const app = express();
//connecting the morgan middleware for logging information about requests and responses:
app.use(morgan('dev'));

//adding the cookie-parser middleware for parsing cookies and the express.json middleware
// for parsing JSON bodies for requests with Content-Type of "application/json"
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));

//Security Middleware
if(!isProduction) {
  // only in development because React frontend will be served from a different server than the Express server.
  // CORS isn't needed in production since all of our React and Express resources will come from the same origin.
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(helmet({
  //React is generally safe at mitigating Cross-Site Scripting.
  contentSecurityPolicy: false
}))

//Setting the _csurf token and creating req.csrfToken method
// The csuf middleware will add a _csurf cookie that is HTTP-only(can't be read by JS)
// to any server response. It also adds a method on all requests(req.csrfToken) that will
// be set to another cookie(XSRF-TOKEN) later on. These two cookies work together to provide CSRF(Cross-Site Request Forgery)
// protection for this app. The XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET.
// This header will be used to validate the _csrf cookie to confirm that the request comes from your site and not an unauthorized site.
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    }
  })
)

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/public'))
app.use(express.static("../frontend/build"));
app.use(routes);

// This is just a regular middleware that will catch any requests that don't match any of the
// routes defined and create a server error with status code of 404.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  // next is invoked without anything means error handlers defined after this middleware will
  // NOT be invoked, but next invoked with the error means that error handlers defined after 
  // this middleware will be invoked.
  next(err);
});

// This middleware is for catching Sequelize errors and formatting it to make it look pretty before
// sending the error response.
app.use((err, _req, _res, next) => {
  // checking if error is a Sequelize error:
  if(err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// This last middleware if for formatting all the errors before returning a JSON response with
// the error message, the errors array, and the error stack trace (if the environment is in development)
// with the status code of the error message.
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});


module.exports = app;