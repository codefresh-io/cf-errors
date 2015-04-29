var WError 	  	= require('verror').WError;
var util 		= require('util');

var errorTypes = {
	'UnauthorizedError': 'UnauthorizedError',
	'ForbiddenError': 'ForbiddenError',
	'RangeError': 'RangeError',
	'TypeError': 'TypeError',
	'BadRequestError': 'BadRequestError',
	'ServiceUnavailableError': 'ServiceUnavailableError',
	'WrongInputError': 'WrongInputError',
	'Error': 'Error',
	'WError': 'WError'
};

var CFError = function(errorType, cause, message) {
	if (errorType) {
		if (typeof errorType === "string" && !errorTypes[errorType]){
			throw new WError(errorTypes.WrongInput, 'The error type is incorrect');
		}
		else if (typeof errorType !== "string") {
			throw new WError(errorTypes.WrongInput, 'The error type is missing');
		}
	}
	else {
		throw new WError(errorTypes.WrongInput, 'The error type is missing');
	}

	WError.call(this, cause, message);
	this.name = errorType;
};

util.inherits(CFError, WError);


module.exports = CFError;
module.exports.errorTypes = errorTypes;








