var chai       = require('chai');
var expect     = chai.expect;
var sinonChai  = require('sinon-chai');
var CFError    = require('./index');
var ErrorTypes = CFError.errorTypes;
chai.use(sinonChai);

describe('CFErrors tests', function () {

	it('Creating a new CFError should succeed', function () {
		var error = new CFError(ErrorTypes.Error, "test");
		expect(error).to.exists; // jshint ignore:line
	});

});