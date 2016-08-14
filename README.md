[![Coverage Status](https://coveralls.io/repos/github/codefresh-io/cf-errors/badge.svg?branch=develop)](https://coveralls.io/github/codefresh-io/cf-errors?branch=develop)

This module was written with inspiration taken from verror module. <br/>
This library supports a fully extensible error objects.

```javascript
var CFError    = require('cf-errors');
```

## Creating an error
```javascript
var error = new CFError("error message");
```
###Extending the error is very easy
```javascript
var error = new CFError({
    field: "value",
    message: `error messagex

###Passing multiple object will extend the previous objects
```javascript
var error = new CFError({field: "value", message: `error message`}, {field2: "value"}, {field: "override first value"});
```

###Last argument passed to the constructor can be a string, which will populate the message field automatically
```javascript
var error = new CFError({field: "value", message: `error message`}, {field2: "value"}, "my error message");
```

###Setting the error name is as simple as just populating the name field
```javascript
var error = new CFError({name: "ErrorType"}, "my error name");
```

## Extending an already existing error will also chain their stacks
```javascript
var extendedError = new CFError({
    message: `extended error message`,
    cause: error
});
```

## Printing the stack
will print the stack of all previous errors too
```javascript
console.log(extendedError.stack);
```
## toString()
will print a the whole chain of errors

## Predefined Error Types
```javascript
var CFError    = require('cf-errors');
var Errors     = CFError.Errors;
```
All predefined errors are exposed on 'CFError.Errors' object. </br>
They are actually just simple objects so using the extension capability allows us to use them easily and extend them when needed.
#### Http Errors
All http errors are available.
They will contain a field name 'statusCode' for your use.
```javascript
var error = new CFError(Errors.Http.BadRequest, {
    message: `failed to validate your request`
});
```
If you are using express.js then your error middleware can look something like this:
```javascript
app.use(function(err, request, response, next){
    console.error(err.stack);
    var statusCode = 400;
    if (err.constructor && err.constructor.name === "CFError") { 
        statusCode = err.statusCode || statusCode;
    }
    return response.status(statusCode).send(err.message);
});
```
#### Node Errors
All node.js core errors are also available using the Errors.Node object.

## Inheriting the previous error type
In order to be able to extend the previous error with more data without affecting the type of the error is possible using the Inherited error type
```javascript
var extendedError = new CFError(Errors.Inherit, {
    message: `extended error message`,
    cause: error
});
```

## Signifying an error as a recognized error
Sometimes it is important to be able to differentiate between an error that is recognized and between an un-recognized error.
For example in case your api receives a request that has a missing parameter you would like to create an error but not report it back to your monitoring systems like new-relic.
Then in your error middleware you can check if the error has been recognized and act accordingly and not report this error to your monitoring systems.
```javascript
var extendedError = new CFError(Errors.Inherit, {
    message: `extended error message`,
    cause: error,
    recognized: true
});
```
Then you can check if the error is recognized:
```javascript
if (error.recognized){
  //Your code
}
```
The default return value of recognized field will be false.
Signifying an error as a recognized error will affect the whole chain of errors and will be inherited.
This also means that you can signify a higher error explicitly with the value false which will then make the recognized field return false even if declared true somewhere in the chain.

## Using recognized errors to report to external systems
If you are marking errors as recognized you can use it to decide if you should send the generated error to monitoring system. <br/>
If you are using express.js your error middleware can look something like this:
```javascript
app.use(function(err, request, response, next){
    console.error(err.stack);
    var statusCode = 400;
    if (err.constructor && err.constructor.name === "CFError") { 
        statusCode = err.statusCode || statusCode;
       if (!err.recognized){
          //report to external system. like new-relic
        }
    }
    else {
      //report to external system. like new-relic
    }
    return response.status(statusCode).send(err.message);
});
```

