'use strict';

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

var CFError = function () {
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
        throw new Error('The error name is missing');
    }

    for (var prop in options) {
        this[prop] = options[prop];
    }

    if (this.name === Errors.Inherit.name && this.cause && this.cause.hasOwnProperty("name")) {
        this.name = this.cause.name;
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


    var tempRecognized = this.recognized;
    Object.defineProperty(this, 'recognized', {
        get: function () {
            if (this._recognized === true) {
                return true;
            }
            else if (this._recognized === false) {
                return false;
            }

            if (this.cause && this.cause.hasOwnProperty("recognized")) {
                return this.cause.recognized;
            }
            else {
                return false;
            }
        },
        set: function (value) {
            this._recognized = value;
        }
    });
    this.recognized = tempRecognized;

};

util.inherits(CFError, Error);

CFError.prototype.toString = function () {
    var str = this.name + ': ' + this.message;
    if (this.cause)
        str += '; caused by ' + this.cause.toString();
    return (str);
};


CFError.Errors = Errors;

module.exports = CFError;