'use strict';

//TODO support if no name provided default Error

var _             = require('lodash');
var util          = require('util');
var defaultErrors = require('./errors/defaults');
var httpErrors    = require('./errors/http');
var nodeErrors    = require('./errors/node');

var Errors = {
    Error: defaultErrors.Error,
    Inherit: defaultErrors.Inherit,
    Http: httpErrors,
    Node: nodeErrors
};

var CFError = function CFError() {
    Error.call(this);

    var args = Array.prototype.slice.call(arguments);

    if (!args.length) {
        args = [Errors.Error];
    }
    if (args.length === 1 && typeof args[0] === 'string') {
        args = [Errors.Error, {message: args[0]}];
    }
    if (typeof args[args.length - 1] === 'string') {
        args[args.length - 1] = {message: args[args.length - 1]};
    }

    args.forEach(function (arg) {
        if (typeof arg !== 'object') {
            throw new Error('Passed arguments must be objects');
        }
    });

    var options = {};

    try {
        args.forEach(function (arg) {
            _.assignIn(options, arg);
        });
    }
    catch (e) {
        throw new Error('Passed arguments can not be merged');
    }


    if (options.name && typeof options.name !== "string") {
        throw new Error('The error name must be a string');
    }
    else if (!options.name) {
        this.name = Errors.Error.name;
    }

    for (var prop in options) {
        this[prop] = options[prop];
    }

    if (this.name === Errors.Inherit.name) {
        if (this.cause && this.cause.name){
            this.name = this.cause.name;
        }
        else {
            this.name = Errors.Error.name;
        }
    }

    Error.captureStackTrace(this, CFError);
    var tempStack = this.stack;

    Object.defineProperty(this, 'stack', {
        get: function () {
            var str = this._stack;

            if (this.cause && this.cause.hasOwnProperty("stack")) {
                str += '\nCaused by ' + this.cause.stack;
            }

            return (str);
        },
        set: function (value) {
            this._stack = value;
        }
    });
    this.stack = tempStack;
};

util.inherits(CFError, Error);

CFError.prototype.toString = function () {
    var str = this.name + ': ' + this.message;
    if (this.cause)
        str += '; caused by ' + this.cause.toString();
    return (str);
};

CFError.prototype.getFirstValue = function (field) {
    if (this.hasOwnProperty(field.toString())){
        return this[field];
    }
    else if (this.cause && this.cause instanceof CFError){
        return this.cause.getFirstValue(field);
    }
    else if (this.cause) {
        return this.cause[field];
    }
    else {
        return undefined;
    }
};


CFError.Errors = Errors;

module.exports = CFError;