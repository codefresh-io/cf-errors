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

module.exports = {
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    RangeError
};
