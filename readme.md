# Codefresh Unified Error Modeling (draft 2)
## JavaScript/Node CFError
Inside JavaScript/Node all errors should be reported as an error specific class derived from CFError. CFError itself should inherit from VError.

Each module should define it’s possible thrown errors by inheriting from CFError, optionally adding additional relevant members, for each error type.

### Usage Example:
```javascript
// Define User Not Found error.
class CFUserNotFoundError extends CFError {

}

// Define User Already Exists error
class CFUserAlreadyExistsError extends CFError {
    constructor(options, existingUserID) {
        super(options);
        this.existingUserID = existingUserID;
    }
}
```
# REST Response Errors
Guidelines and best practice taken from

## HTTP Response Code
Success responses should be of the HTTP 2xx response code. Examples:
```
HTTP/1.1 200 OK
HTTP/1.1 201 Created
```
Client requests error responses should be of the HTTP 4xx client error codes. Examples:
```
HTTP/1.1 403 Forbidden
HTTP/1.1 404 Not Found
```
Server error responses should of the HTTP 5xx server error codes. Examples:
```
HTTP/1.1 500 Internal Server Error
```
## HTTP Error Response Body
For 4xx and 5xx response codes, the response body should contains the error description:
```
HTTP/1.1 400 Internal Server Error
{
    {
        "code": <error code>
        "message": <error description>
    }
}
```
It is also possible to return a list of errors, for example:
```
HTTP/1.1 500 Internal Server Error
{
    errors: [
        {
            "code": <error code>
            "message": <error description>
        },
        ...
    ]
}
```

## Logger
- Logger should define severity level (`verbose, debug, info, warning, and error`).
- Logger should define logger categories. For example, `Github`, `Builder`, etc.
- Logger should support appender types. For example, `Console`, `File`, etc.
_ Logger should should support appender and filters configurations.
# Usage Example:
``` javascript
// logger.json
{
  "appenders": [
    {
      "type": "categoryFilter",
      "exclude": [
        "Builder"
      ],
      "appender": {
        "type": "console"
      }
    }
  ]
}

...

// builder-task.js
const logger = require("logger").getLogger("Builder");
logger.info("Build started. task %s", taskID);
...
logger.warning(...);

```
