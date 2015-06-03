var WError 	  	= require('verror').WError;
var util 		= require('util');

var errorTypes = {
	'UnauthorizedError': 'UnauthorizedError',
	'ForbiddenError': 'ForbiddenError',
	'NotFoundError': 'NotFoundError',
	'RangeError': 'RangeError',
	'TypeError': 'TypeError',
	'BadRequestError': 'BadRequestError',
	'ServiceUnavailableError': 'ServiceUnavailableError',
	'WrongInputError': 'WrongInputError',
	'Error': 'Error',
	'WError': 'WError'
};

var errorCodes = {
	'UnauthorizedError': 401,
	'ForbiddenError': 403,
	'NotFoundError': 404,
	'RangeError': 400,
	'TypeError': 400,
	'BadRequestError': 400,
	'ServiceUnavailableError': 500,
	'WrongInputError': 400,
	'Error': 400,
	'WError': 400
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

CFError.prototype.getStatusCode = function(){
	return errorCodes[this.name];
};


module.exports = CFError;
module.exports.errorTypes = errorTypes;








