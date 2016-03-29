# Codefresh Unified Error Modeling (draft 1)
## CFError
- CFError should be the base class for all error types.
- Each module should define it’s possible thrown errors by inheriting from CFError (and optionally, add additional relevant members) for each error type. For example,

### example

```javascript
// Some HTTP module defines its error types by inheriting from CFError
class CFHttpError extends CFError {
    constructor(options, httpErrorCode) {
        super(options);
        this.httpErrorCode = httpErrorCode;
    }
}


```

## Error Propagation
Using promises

## Logging
Separate logger categories for each purpose
Route logger output based on category/severity
Global error handler
