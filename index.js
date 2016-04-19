'use strict';

var WError = require('verror').WError;

class CFError extends WError {
	constructor(errorType, cause, errorMsg) {
		var args = Array.prototype.slice.call(arguments);
		var errorType = args.shift();
		if (errorType) {
			if (typeof errorType === "string" && !CFError.errorTypes[errorType]) {
				throw new WError(CFError.errorTypes.WrongInputError, 'The error type is incorrect');
			}
			else if (typeof errorType !== "string") {
				throw new WError(CFError.errorTypes.WrongInputError, 'The error type is missing');
			}
		}
		else {
			throw new WError(CFError.errorTypes.WrongInputError, 'The error type is missing');
		}
		var str = "";
		var index = 0;
		var count = args.length;

		//TODO replace with super(...args); when moving to node v5+
		//TODO eval is a workaround which is bad because malicious code can be inserted here
		for (; index < count; ++index)
			str += "args[" + index + "]" + (index < count - 1 ? ", " : "");
		eval("super(" + str +")");

		if (errorType === CFError.errorTypes.Inherit){
			if (this.we_cause && this.we_cause.name){
				errorType = this.we_cause.name;
			}
			else {
				errorType = CFError.errorTypes.Error;
			}
		}
		this.name = errorType;
		Object.defineProperty(this, 'stack', {
			get: function() {
				var str = "";
				if (this._stack) {
					str = this._stack;
				}
				else if (this.message) {
					str = (this.hasOwnProperty('name') && this.name ||
					this.constructor.name || this.constructor.prototype.name);
					str += ': ' + this.message;
				}

				if (this.we_cause && this.we_cause.message) {
					str += '\nCaused by ' + this.we_cause.stack;
				}

				return (str);
			},
			set: function(value) {
				if (!this.stackErrorSet){
					this._stack = value.replace("Error", this.name);
				}
				else {
					this._stack = value;
				}
			}
		});

		this.stackErrorSet = false;
		this.stack = new Error(this.message).stack;
		this.stackErrorSet = true;
	}

	getStatusCode() {
		return CFError.errorCodes[this.name];
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
	'ServiceUnavailableError': 'ServiceUnavailableError',
	'WrongInputError': 'WrongInputError',
	'Error': 'Error',
	'Inherit': 'Inherit',
	'DuplicateError': 'DuplicateError',
	'NotImplemented': 'NotImplemented',
	'WrongRepoPermission': 'WrongRepoPermission',
	'FeatureDisabled': 'FeatureDisabled',
	'PaymentError': 'PaymentError'
};

CFError.errorCodes = {
	'UnauthorizedError': 401,
	'ForbiddenError': 403,
	'NotFoundError': 404,
	'RangeError': 400,
	'ValidationError': 400,
	'TypeError': 400,
	'BadRequestError': 400,
	'ServiceUnavailableError': 500,
	'WrongInputError': 400,
	'Error': 400,
	'Inherit': 400
};

module.exports = CFError;