'use strict';

class CFError extends Error {
    constructor(options) {
        super();

        if (typeof (options) !== 'object') {
            var args  = Array.prototype.slice.call(arguments);
            options   = {
                type: args.shift()
            };
            var cause = args.shift();
            if (typeof (cause) === 'object') {
                options.cause   = cause;
                options.message = args.shift() || "";
            }
            else {
                options.message = cause || "";
            }
        }

        if (options.type) {
            if (typeof options.type === "string" && !CFError.errorTypes[options.type]) {
                throw new CFError(CFError.errorTypes.WrongInputError, 'The error type is incorrect');
            }
            else if (typeof options.type !== "string") {
                throw new CFError(CFError.errorTypes.WrongInputError, 'The error type must be a string');
            }
        }
        else {
            throw new CFError(CFError.errorTypes.WrongInputError, 'The error type is missing');
        }

        options.message = options.message || "";
        
        if (typeof options.message !== "string") {
            throw new CFError(CFError.errorTypes.WrongInputError, "The message field must be a string");
        }

        this.message = options.message;

        if (options.cause) {
            this.cause = options.cause;
        }

        if (options.hasOwnProperty("recognized")) {
            if (options.recognized) {
                this.recognized = "true";
            }
            else {
                this.recognized = "false";
            }
        }

        if (options.type === CFError.errorTypes.Inherit && this.cause) {
            this.name = this.cause.name;
        }
        else {
            this.name = options.type;
        }

        Error.captureStackTrace(this, CFError);
        var tempStack = this.stack;

        Object.defineProperty(this, 'stack', {
            get: function () {
                var str = this._stack;

                if (this.cause && this.cause.stack) {
                    str += `\nCaused by ${this.cause.stack}`;
                }
                else {
                    str += `\nCaused by ${this.name}: ${this.message}`;
                }

                return (str);
            },
            set: function (value) {
                this._stack = value;
            }
        });
        this.stack = tempStack;
    }

    getStatusCode() {
        return CFError.errorCodes[this.name];
    }

    isRecognized() {
        if (this.recognized === "false") {
            return false;
        }
        else if (this.recognized === "true") {
            return true;
        }
        else if (this.cause instanceof CFError) {
            return this.cause.isRecognized();
        }
        else {
            return false;
        }
    }

    toString() {
        var str = `${this.name}: ${this.message}`;
        if (this.cause)
            str += `; Caused by ${this.cause.toString()}`;
        return (str);
    }
}

CFError.errorTypes = {
    'UnauthorizedError': 'UnauthorizedError',
    'ForbiddenError': 'ForbiddenError',
    'NotFoundError': 'NotFoundError',
    'RangeError': 'RangeError',
    'ValidationError': 'ValidationError',
    'TypeError': 'TypeError',
    'BadRequestError': 'BadRequestError',
    'WrongInputError': 'WrongInputError',
    'Error': 'Error',
    'Inherit': 'Inherit',
    'DuplicateError': 'DuplicateError',
    'NotImplemented': 'NotImplemented',
    'WrongRepoPermission': 'WrongRepoPermission',
    'FeatureDisabled': 'FeatureDisabled',
    'PaymentError': 'PaymentError',
    'ServiceUnavailableError:': 'ServiceUnavailableError',
    'InternalServerError:': 'InternalServerError'
};

CFError.errorCodes = {
    'UnauthorizedError': 401,
    'ForbiddenError': 403,
    'NotFoundError': 404,
    'RangeError': 400,
    'ValidationError': 400,
    'TypeError': 400,
    'BadRequestError': 400,
    'ServiceUnavailableError': 503,
    'InternalServerError': 500,
    'WrongInputError': 400,
    'Error': 400,
    'Inherit': 400
};

module.exports = CFError;