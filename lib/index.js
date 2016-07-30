'use strict';

const defaultErrors = require('./errors/defaults');
const httpErrors = require('./errors/http');
const nodeErrors = require('./errors/node');

var errorTypes = {};
var errors = {};

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
            if (typeof options.type === "string" && !errorTypes[options.type]) {
                throw new CFError(errorTypes.Error, 'The error type is incorrect');
            }
            else if (typeof options.type !== "string") {
                throw new CFError(errorTypes.Error, 'The error type must be a string');
            }
        }
        else {
            throw new CFError(errorTypes.Error, 'The error type is missing');
        }

        var currentError = errors[options.type];
        for (var prop in currentError){
            this[prop] = currentError[prop];
        }


        if (options.message){
            this.message = options.message;
        }

        if (options.cause) {
            this.cause = options.cause;
        }

        if (options.extra) {
            this.extra = options.extra;
        }

        if (options.hasOwnProperty("recognized")) {
            if (options.recognized) {
                this.recognized = "true";
            }
            else {
                this.recognized = "false";
            }
        }

        if (options.type === errorTypes.Inherit && this.cause) {
            this.name = this.cause.name;
        }
        else if (options.type === errorTypes.Inherit) {
            throw new CFError(errorTypes.Error, 'Inherit error type is only usuable when extending an error');
        }
        else {
            this.name = options.type;
        }

        Error.captureStackTrace(this, CFError);
        var tempStack = this.stack;

        Object.defineProperty(this, 'stack', {
            get: function () {
                var str = this._stack;

                if (this.extra){
                    str += `\nExtra: ${JSON.stringify(this.extra)}`;
                }

                if (this.cause && this.cause.stack) {
                    str += `\nCaused by ${this.cause.stack}`;
                }

                return (str);
            },
            set: function (value) {
                this._stack = value;
            }
        });
        this.stack = tempStack;
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
        if (this.extra){
            str += `. extra: ${JSON.stringify(this.extra)}`;
        }
        if (this.cause)
            str += `; caused by ${this.cause.toString()}`;
        return (str);
    }

    static loadErrors(errorsToLoad) {
        errorsToLoad.forEach((error) => {
            if (!error.name){
                throw new CFError(errorTypes.Error, `error is missing 'name' field`);
            }
            errorTypes[error.name] = error.name;
            errors[error.name] = error;
            errors[error.name].message = error.message || "";
        });
    }
}

CFError.loadErrors(defaultErrors);
CFError.loadErrors(httpErrors);
CFError.loadErrors(nodeErrors);
CFError.errorTypes = errorTypes;


module.exports = CFError;