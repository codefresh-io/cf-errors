"use strict";
const CFError = require("./base-error.js");

class CFHttpError extends CFError {
    constructor(options, httpErrorCode) {
        super(options);
        this.httpErrorCode = httpErrorCode;
    }
}

class UnauthorizedError extends CFHttpError {
    constructor(options) {
        super(options, 401);
    }
}

class ForbiddenError extends CFHttpError {
    constructor(options) {
        super(options, 403);
    }
}

class NotFoundError extends CFHttpError {
    constructor(options) {
        super(options, 404);
    }
}

class RangeError extends CFHttpError {
    constructor(options) {
        super(options, 400);
    }
}

class ValidationError extends CFHttpError {
    constructor(options) {
        super(options, 400);
    }
}

class TypeError extends CFHttpError {
    constructor(options) {
        super(options, 400);
    }
}

class BadRequestError extends CFHttpError {
    constructor(options) {
        super(options, 400);
    }
}

class ServiceUnavailableError extends CFHttpError {
    constructor(options) {
        super(options, 500);
    }
}

class WrongInputError extends CFHttpError {
    constructor(options) {
        super(options, 400);
    }
}

class Error extends CFHttpError {
    constructor(options) {
        super(options, 400);
    }
}

class Inherit extends CFHttpError {
    constructor(options) {
        super(options, 400);
    }
}
module.exports = {
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    RangeError,
    ValidationError,
    TypeError,
    BadRequestError,
    ServiceUnavailableError,
    WrongInputError,
    Error,
    Inherit
};
