cf-errors
===========
[![Coverage Status](https://coveralls.io/repos/github/codefresh-io/cf-errors/badge.svg?branch=develop)](https://coveralls.io/github/codefresh-io/cf-errors?branch=develop)

Extensible error library.
Inspired from Verror.https://github.com/joyent/node-verror

## Installation
```javascript
$ npm install cf-errors
```

* [Creating an error](#constructor)
* [Extending with a previous error](#cause)
* [Printing the stack](#stack)
* [toString](#toString)
* [Predefined errors](#predefined)
* [Inheriting the previous error type](#inherit)
* [Getting the value of the first occurrence of a field in the chain](#getfirstvalue)
* [Running the tests](#tests)


<a name="constructor" />
## Creating an error
```javascript
var CFError = require('cf-errors');
var error   = new CFError("error message");
```

###Extending the error
```javascript
var error = new CFError({field: "value", message: `error message`});
```

###Setting the error name is as simple as just populating the name field
```javascript
var error = new CFError({name: "ErrorType", message: "my error name"});
```

###Passing multiple objects will extend the previous objects
```javascript
var error = new CFError({field: "value", message: `error message`}, {field2: "value"}, {field: "override first value"});
```

###Last argument passed to the constructor can be a string, which will populate the message field automatically
```javascript
var error = new CFError({field: "value", message: `error message`}, {field2: "value"}, "my error message");
```

</br>
<a name="cause" />
## Extending with a previous error
```javascript
var extendedError = new CFError({
    message: `extended error message`,
    cause: error
});
```

</br>
<a name="stack" />
## Printing the stack
will print the stack of all previous errors too
```javascript
console.log(extendedError.stack);
```

</br>
<a name="toString" />
## toString()
Will print the whole chain of errors in a nice way. </br>
You can always override it if you want.
```javascript
CFError.prototype.toString = function(){
    //your implementation
}
```

</br>
<a name="predefined" />
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

</br>
<a name="inherit" />
## Inheriting the previous error type
Creating an error with the same name as its cause can be achieved using 'Inherit' as the error name.
```javascript
var extendedError = new CFError(Errors.Inherit, {
    message: `extended error message`,
    cause: error
});
```
This will also work
```javascript
var extendedError = new CFError({
    name: "Inherit",
    message: `extended error message`,
    cause: error
});

</br>
<a name="getfirstvalue" />
## Getting the value of the first occurrence of a field in the chain
Sometimes you will populate an error with a field and wrap it with an additional error. Then in order to get the value of the field you will need to recursivelly go over the whole chain. </br>
In order to get the first value of a field in the chain use 'getFirstValue' function
```javascript
var error = new CFError({field: "value", field1: "firstValue"});
var extendedError = new CFError({cause: error, field1: "newValue"});
extendedError.getFirstValue('field') // "value"
extendedError.getFirstValue('field1') // "newValue"
extendedError.getFirstValue('field2') // undefined
```

</br>
<a name="tests" />
## Running the tests
Just run 'npm test' or 'gulp unit_test'

