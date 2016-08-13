'use strict';

//Client Error

var BadRequest = {
    name: "BadRequest",
    message: "Bad Request",
    statusCode: 400
};

var Unauthorized = {
    name: "Unauthorized",
    message: "Unauthorized",
    statusCode: 401
};

var PaymentRequired = {
    name: "PaymentRequired",
    message: "Payment Required",
    statusCode: 402
};

var Forbidden = {
    name: "Forbidden",
    message: "Forbidden",
    statusCode: 403
};

var NotFound = {
    name: "NotFound",
    message: "Not Found",
    statusCode: 404
};

var MethodNotAllowed = {
    name: "MethodNotAllowed",
    message: "Method Not Allowed",
    statusCode: 405
};

var NotAcceptable = {
    name: "NotAcceptable",
    message: "Not Acceptable",
    statusCode: 406
};

var ProxyAuthenticationRequired = {
    name: "ProxyAuthenticationRequired",
    message: "Proxy Authentication Required",
    statusCode: 407
};

var RequestTimeout = {
    name: "RequestTimeout",
    message: "Request Timeout",
    statusCode: 408
};

var Conflict = {
    name: "Conflict",
    message: "Conflict",
    statusCode: 409
};

var Gone = {
    name: "Gone",
    message: "Gone",
    statusCode: 410
};

var LengthRequired = {
    name: "LengthRequired",
    message: "Length Required",
    statusCode: 411
};

var PreconditionFailed = {
    name: "PreconditionFailed",
    message: "Precondition Failed",
    statusCode: 412
};

var PayloadTooLarge = {
    name: "PayloadTooLarge",
    message: "Payload Too Large",
    statusCode: 413
};

var URITooLong = {
    name: "URITooLong",
    message: "URI Too Long",
    statusCode: 414
};

var UnsupportedMediaType = {
    name: "UnsupportedMediaType",
    message: "Unsupported Media Type",
    statusCode: 415
};

var RangeNotSatisfiable = {
    name: "RangeNotSatisfiable",
    message: "Range Not Satisfiable",
    statusCode: 416
};

var ExpectationFailed = {
    name: "ExpectationFailed",
    message: "Expectation Failed",
    statusCode: 417
};

var ImATeapot = {
    name: "ImATeapot",
    message: "I'm a teapot",
    statusCode: 418
};

var MisdirectedRequest = {
    name: "MisdirectedRequest",
    message: "Misdirected Request",
    statusCode: 421
};

var UnprocessableEntity = {
    name: "UnprocessableEntity",
    message: "Unprocessable Entity ",
    statusCode: 422
};

var Locked = {
    name: "Locked",
    message: "Locked",
    statusCode: 423
};

var FailedDependency = {
    name: "FailedDependency",
    message: "Failed Dependency",
    statusCode: 424
};

var UpgradeRequired = {
    name: "UpgradeRequired",
    message: "Upgrade Required",
    statusCode: 426
};

var PreconditionRequired = {
    name: "PreconditionRequired",
    message: "Precondition Required",
    statusCode: 428
};

var TooManyRequests = {
    name: "TooManyRequests",
    message: "Too Many Requests",
    statusCode: 429
};

var RequestHeaderFieldsTooLarge = {
    name: "RequestHeaderFieldsTooLarge",
    message: "Request Header Fields Too Large",
    statusCode: 431
};

var UnavailableForLegalReasons = {
    name: "UnavailableForLegalReasons",
    message: "Unavailable For Legal Reasons",
    statusCode: 451
};


//Server Error

var InternalServer = {
    name: "InternalServer",
    message: "Internal Server ",
    statusCode: 500
};

var NotImplemented = {
    name: "NotImplemented",
    message: "Not Implemented",
    statusCode: 501
};

var BadGateway = {
    name: "BadGateway",
    message: "Bad Gateway",
    statusCode: 502
};

var ServiceUnavailable = {
    name: "ServiceUnavailable",
    message: "Service Unavailable",
    statusCode: 503
};

var GatewayTimeout = {
    name: "GatewayTimeout",
    message: "Gateway Timeout",
    statusCode: 504
};

var HTTPVersionNotSupported = {
    name: "HTTPVersionNotSupported",
    message: "HTTP Version Not Supported",
    statusCode: 505
};

var VariantAlsoNegotiates = {
    name: "VariantAlsoNegotiates",
    message: "Variant Also Negotiates",
    statusCode: 506
};

var InsufficientStorage = {
    name: "InsufficientStorage",
    message: "Insufficient Storage",
    statusCode: 507
};

var LoopDetected = {
    name: "LoopDetected",
    message: "Loop Detected",
    statusCode: 508
};

var NotExtended = {
    name: "NotExtended",
    message: "Not Extended",
    statusCode: 510
};

var NetworkAuthenticationRequired = {
    name: "NetworkAuthenticationRequired",
    message: "Network Authentication Required",
    statusCode: 511
};


module.exports = {
    BadRequest: BadRequest,
    Unauthorized: Unauthorized,
    PaymentRequired: PaymentRequired,
    Forbidden: Forbidden,
    NotFound: NotFound,
    MethodNotAllowed: MethodNotAllowed,
    NotAcceptable: NotAcceptable,
    ProxyAuthenticationRequired: ProxyAuthenticationRequired,
    RequestTimeout: RequestTimeout,
    Conflict: Conflict,
    Gone: Gone,
    LengthRequired: LengthRequired,
    PreconditionFailed: PreconditionFailed,
    PayloadTooLarge: PayloadTooLarge,
    URITooLong: URITooLong,
    UnsupportedMediaType: UnsupportedMediaType,
    RangeNotSatisfiable: RangeNotSatisfiable,
    ExpectationFailed: ExpectationFailed,
    ImATeapot: ImATeapot,
    MisdirectedRequest: MisdirectedRequest,
    UnprocessableEntity: UnprocessableEntity,
    Locked: Locked,
    FailedDependency: FailedDependency,
    UpgradeRequired: UpgradeRequired,
    PreconditionRequired: PreconditionRequired,
    TooManyRequests: TooManyRequests,
    RequestHeaderFieldsTooLarge: RequestHeaderFieldsTooLarge,
    UnavailableForLegalReasons: UnavailableForLegalReasons,
    InternalServer: InternalServer,
    NotImplemented: NotImplemented,
    BadGateway: BadGateway,
    ServiceUnavailable: ServiceUnavailable,
    GatewayTimeout: GatewayTimeout,
    HTTPVersionNotSupported: HTTPVersionNotSupported,
    VariantAlsoNegotiates: VariantAlsoNegotiates,
    InsufficientStorage: InsufficientStorage,
    LoopDetected: LoopDetected,
    NotExtended: NotExtended,
    NetworkAuthenticationRequired: NetworkAuthenticationRequired
};