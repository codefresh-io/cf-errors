# Codefresh Unified Error Modeling (draft 1)
## CFError
- CFError should be the base class for all error types.
- CFError itself should inherit from VError.
- Each module should define it’s possible thrown errors by inheriting from CFError, optionally adding additional relevant members, for each error type.

# Usage Example:
```javascript
// some http api module defines its thrown error types.
// error types should be inherited from CFError.
class CFHttpError extends CFError {
    constructor(options, errorCode) {
        super(options);

        // define http error code
        this.errorCode = errorCode;
    }
}

// define the Http Unauthorize (401) error
class CFHttpUnauthorizedError extends CFHttpError {
    constructor(options) {
        super(options, 401);
    }
}

// define the Http Forbidden (403) error
class CFHttpErrorForbidden extends CFHttpError {
    constructor(options) {
        super(options, 403);
    }
}

...
```

## Logger
- Logger should define severity level (`verbose, debug, info, warning, and error`).
- Logger should define logger categories. For example, `Github`, `Builder`, etc.
- Logger should support appender types. For example, `Console`, `File`, etc.
_ Logger should should support appender and filters configurations.
# Usage Example:
```
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
