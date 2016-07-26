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

	describe('recognize tests', function(){

		describe('positive - should return true', function(){

			it('should recognize in case there is only 1 CFError in the chain', function(){
				var error = new CFError(ErrorTypes.Error, "my error");
				error.recognize();
				expect(error.isRecognized()).to.equal(true);
			});

			it('should recognize in case recognize was called and then deRecognized and then recognized again on the same error', function(){
				var error = new CFError(ErrorTypes.Error, "my error");
				error.recognize();
				error.deRecognize();
				error.recognize();
				expect(error.isRecognized()).to.equal(true);
			});

			it('should recognize in case a previous error deRecognized and the recent one recognized', function(){
				var error = new CFError(ErrorTypes.Error, "my error");
				error.deRecognize();
				var error2 = new CFError(ErrorTypes.Inherit, error, "extend error");
				error2.recognize();
				expect(error2.isRecognized()).to.equal(true);
			});

			it('should recognize in case previous error recognized and the recent one did not do anything', function(){
				var error = new CFError(ErrorTypes.Error, "my error");
				error.recognize();
				var error2 = new CFError(ErrorTypes.Inherit, error, "extend error");
				expect(error2.isRecognized()).to.equal(true);
			});

		});

		describe('negative', function(){

			it('should not recognize in case there is only 1 CFError in the chain and recognize function was not called', function(){
				var error = new CFError(ErrorTypes.Error, "my error");
				expect(error.isRecognized()).to.equal(false);
			});

			it('should not recognize in case a higher error have deRecognized after a previous error recognized', function(){
				var error = new CFError(ErrorTypes.Error, "my error");
				error.recognize();
				var error2 = new CFError(ErrorTypes.Error, error, "extended error");
				error2.deRecognize();
				expect(error2.isRecognized()).to.equal(false);
			});

			it('should not recognize in case recognized was called and then deRecognized was called on the same error', function(){
				var error = new CFError(ErrorTypes.Error, "my error");
				error.recognize();
				error.deRecognize();
				expect(error.isRecognized()).to.equal(false);
			});

			it('should not recognize in case recognized was called and then deRecognized was called on the same error', function(){
				var error = new CFError(ErrorTypes.Error, "my error");
				error.recognize();
				error.deRecognize();
				error.recognize();
				error.deRecognize();
				expect(error.isRecognized()).to.equal(false);
			});

		});

	});

});