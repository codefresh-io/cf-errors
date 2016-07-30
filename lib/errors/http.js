'use strict';

//Client Error

var BadRequestError = {
    name: "BadRequestError",
    message: "Bad Request",
    statusCode: 400
};

var UnauthorizedError = {
    name: "UnauthorizedError",
    message: "Unauthorized",
    statusCode: 401
};

var PaymentRequiredError = {
    name: "PaymentRequiredError",
    message: "Payment Required",
    statusCode: 402
};

var ForbiddenError = {
    name: "ForbiddenError",
    message: "Forbidden",
    statusCode: 403
};

var NotFoundError = {
    name: "NotFoundError",
    message: "Not Found",
    statusCode: 404
};

var MethodNotAllowedError = {
    name: "MethodNotAllowedError",
    message: "Method Not Allowed",
    statusCode: 405
};

var NotAcceptableError = {
    name: "NotAcceptableError",
    message: "Not Acceptable",
    statusCode: 406
};

var ProxyAuthenticationRequiredError = {
    name: "ProxyAuthenticationRequiredError",
    message: "Proxy Authentication Required",
    statusCode: 407
};

var RequestTimeoutError = {
    name: "RequestTimeoutError",
    message: "Request Timeout",
    statusCode: 408
};

var ConflictError = {
    name: "ConflictError",
    message: "Conflict",
    statusCode: 409
};

var GoneError = {
    name: "GoneError",
    message: "Gone",
    statusCode: 410
};

var LengthRequiredError = {
    name: "LengthRequiredError",
    message: "Length Required",
    statusCode: 411
};

var PreconditionFailedError = {
    name: "PreconditionFailedError",
    message: "Precondition Failed",
    statusCode: 412
};

var PayloadTooLargeError = {
    name: "PayloadTooLargeError",
    message: "Payload Too Large",
    statusCode: 413
};

var URITooLongError = {
    name: "URITooLongError",
    message: "URI Too Long",
    statusCode: 414
};

var UnsupportedMediaTypeError = {
    name: "UnsupportedMediaTypeError",
    message: "Unsupported Media Type",
    statusCode: 415
};

var RangeNotSatisfiableError = {
    name: "RangeNotSatisfiableError",
    message: "Range Not Satisfiable",
    statusCode: 416
};

var ExpectationFailedError = {
    name: "ExpectationFailedError",
    message: "Expectation Failed",
    statusCode: 417
};

var ImATeapotError = {
    name: "ImATeapotError",
    message: "I'm a teapot",
    statusCode: 418
};

var MisdirectedRequestError = {
    name: "MisdirectedRequestError",
    message: "Misdirected Request",
    statusCode: 421
};

var UnprocessableEntityError = {
    name: "UnprocessableEntityError",
    message: "Unprocessable Entity ",
    statusCode: 422
};

var LockedError = {
    name: "LockedError",
    message: "Locked",
    statusCode: 423
};

var FailedDependencyError = {
    name: "FailedDependencyError",
    message: "Failed Dependency",
    statusCode: 424
};

var UpgradeRequiredError = {
    name: "UpgradeRequiredError",
    message: "Upgrade Required",
    statusCode: 426
};

var PreconditionRequiredError = {
    name: "PreconditionRequiredError",
    message: "Precondition Required",
    statusCode: 428
};

var TooManyRequestsError = {
    name: "TooManyRequestsError",
    message: "Too Many Requests",
    statusCode: 429
};

var RequestHeaderFieldsTooLargeError = {
    name: "RequestHeaderFieldsTooLargeError",
    message: "Request Header Fields Too Large",
    statusCode: 431
};

var UnavailableForLegalReasonsError = {
    name: "UnavailableForLegalReasonsError",
    message: "Unavailable For Legal Reasons",
    statusCode: 451
};


//Server Error

var InternalServerError = {
    name: "InternalServerError",
    message: "Internal Server Error",
    statusCode: 500
};

var NotImplementedError = {
    name: "NotImplementedError",
    message: "Not Implemented",
    statusCode: 501
};

var BadGatewayError = {
    name: "BadGatewayError",
    message: "Bad Gateway",
    statusCode: 502
};

var ServiceUnavailableError = {
    name: "ServiceUnavailableError",
    message: "Service Unavailable",
    statusCode: 503
};

var GatewayTimeoutError = {
    name: "GatewayTimeoutError",
    message: "Gateway Timeout",
    statusCode: 504
};

var HTTPVersionNotSupportedError = {
    name: "HTTPVersionNotSupportedError",
    message: "HTTP Version Not Supported",
    statusCode: 505
};

var VariantAlsoNegotiatesError = {
    name: "VariantAlsoNegotiatesError",
    message: "Variant Also Negotiates",
    statusCode: 506
};

var InsufficientStorageError = {
    name: "InsufficientStorageError",
    message: "Insufficient Storage",
    statusCode: 507
};

var LoopDetectedError = {
    name: "LoopDetectedError",
    message: "Loop Detected",
    statusCode: 508
};

var NotExtendedError = {
    name: "NotExtendedError",
    message: "Not Extended",
    statusCode: 510
};

var NetworkAuthenticationRequiredError = {
    name: "NetworkAuthenticationRequiredError",
    message: "Network Authentication Required",
    statusCode: 511
};


module.exports = [
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    NotAcceptableError,
    ProxyAuthenticationRequiredError,
    RequestTimeoutError,
    ConflictError,
    GoneError,
    LengthRequiredError,
    PreconditionFailedError,
    PayloadTooLargeError,
    URITooLongError,
    UnsupportedMediaTypeError,
    RangeNotSatisfiableError,
    ExpectationFailedError,
    ImATeapotError,
    MisdirectedRequestError,
    UnprocessableEntityError,
    LockedError,
    FailedDependencyError,
    UpgradeRequiredError,
    PreconditionRequiredError,
    TooManyRequestsError,
    RequestHeaderFieldsTooLargeError,
    UnavailableForLegalReasonsError,
    InternalServerError,
    NotImplementedError,
    BadGatewayError,
    ServiceUnavailableError,
    GatewayTimeoutError,
    HTTPVersionNotSupportedError,
    VariantAlsoNegotiatesError,
    InsufficientStorageError,
    LoopDetectedError,
    NotExtendedError,
    NetworkAuthenticationRequiredError
];