'use strict';

var Error = {
    name: "Error"
};

var Inherit = {
    name: "Inherit"
};

var BadRequestError = {
    name: "BadRequestError",
    message: "my message",
    statusCode: 400
};

var UnauthorizedError = {
    name: "UnauthorizedError",
    statusCode: 401
};

var ForbiddenError = {
    name: "ForbiddenError",
    statusCode: 403
};

var NotFoundError = {
    name: "NotFoundError",
    statusCode: 404
};

var MethodNotAllowedError = {
    name: "MethodNotAllowedError",
    statusCode: 405
};

var NotAcceptableError = {
    name: "NotAcceptableError",
    statusCode: 406
};

var ProxyAuthenticationRequiredError = {
    name: "ProxyAuthenticationRequiredError",
    statusCode: 407
};

var RequestTimeoutError = {
    name: "RequestTimeoutError",
    statusCode: 408
};

var ConflictError = {
    name: "ConflictError",
    statusCode: 409
};

var GoneError = {
    name: "GoneError",
    statusCode: 410
};

var LengthRequiredError = {
    name: "LengthRequiredError",
    statusCode: 411
};

var PreconditionFailedError = {
    name: "PreconditionFailedError",
    statusCode: 412
};

var InternalServerError = {
    name: "InternalServerError",
    statusCode: 500
};

module.exports = [
    Error,
    Inherit,
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
    InternalServerError
];

