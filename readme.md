# Codefresh Unified Error Modeling (draft 1)
## CFError
- CFError should be the base class for all error types.
- Each module should define it’s possible thrown errors by inheriting from CFError (and optionally, add additional relevant members) for each error type. For example,

### example

```javascript
// Some HTTP module defines its thrown error types.
// Error types should be inherited from CFError.
class CFHttpError extends CFError {
    constructor(options, errorCode) {
        super(options);

        // define http error code
        this.errorCode = errorCode;
    }
}

// Define HTTP Forbidden (403) error
class CFHttpErrorForbidden extends CFHttpError {
    constructor(options) {
        super(options, 403);
    }
}
```

## Error Propagation
Using promises

## Logging
Separate logger categories for each purpose
Route logger output based on category/severity
Global error handler
