var chai       = require('chai');
var expect     = chai.expect;
var sinonChai  = require('sinon-chai');
var CFError    = require('./index');
var ErrorTypes = CFError.errorTypes;
chai.use(sinonChai);

describe('CFErrors tests', function () {

	describe('constructor', function(){

		it('Creating a new CFError should succeed', function () {
			var error = new CFError(ErrorTypes.Error, "test");
			expect(error).to.exists; // jshint ignore:line
		});

	});

	describe('recognize tests', function(){

		describe('positive - should return true', function(){

			it('should recognize in case there is only 1 CFError in the chain', function(){
				var error = new CFError({
					type: ErrorTypes.Error,
					message: "my error",
					recognized: true
				});
				expect(error.isRecognized()).to.equal(true);
			});
			
			it('should recognize in case a previous error deRecognized and the recent one recognized', function(){
				var error = new CFError({
					type: ErrorTypes.Error,
					message: "my error",
					recognized: false
				});
				var error2 = new CFError({
					type: ErrorTypes.Inherit,
					cause: error,
					message: "extended error",
					recognized: true
				});
				expect(error2.isRecognized()).to.equal(true);
			});

			it('should recognize in case previous error recognized and the recent one did not do anything', function(){
				var error = new CFError({
					type: ErrorTypes.Error,
					message: "my error",
					recognized: true
				});
				var error2 = new CFError({
					type: ErrorTypes.Inherit,
					cause: error,
					message: "extended error"
				});
				expect(error2.isRecognized()).to.equal(true);
			});

		});

		describe('negative', function(){

			it('should not recognize in case there is only 1 CFError in the chain and recognize function was not called', function(){
				var error = new CFError({
					type: ErrorTypes.Error,
					message: "error"
				});
				expect(error.isRecognized()).to.equal(false);
			});

			it('should not recognize in case a higher error have deRecognized after a previous error recognized', function(){
				var error = new CFError({
					type: ErrorTypes.Error,
					message: "error",
					recognized: true
				});
				var error2 = new CFError({
					type: ErrorTypes.Error,
					cause: error,
					message: "extended Error",
					recognized: false
				});
				expect(error2.isRecognized()).to.equal(false);
			});

			it('should not recognize in case recognized was called and then deRecognized was called on the same error', function(){
				var error = new CFError({
					type: ErrorTypes.Error,
					message: "error",
					recognized: false
				});
				expect(error.isRecognized()).to.equal(false);
			});

		});

	});

	describe('using util string output', function(){

		it('should print expected message', function(){
			var error = new CFError(ErrorTypes.Error, "this is: %s my :%d", "string", 2);
			expect(error.message).to.equal("this is: string my :2");
		});

	});

	describe('using EC6 string with params', function(){

		it('should print expected message', function(){
			var s = "string";
			var d = 2;
			var error = new CFError({
				type: ErrorTypes.Error,
				message: `this is: ${s} my :${d}`
			});
			expect(error.message).to.equal("this is: string my :2");
		});

	});

});