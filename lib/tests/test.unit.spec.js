var chai       = require('chai');
var expect     = chai.expect;
var sinonChai  = require('sinon-chai');
var proxyquire = require('proxyquire');
var CFError    = require('../index');
var Errors     = CFError.Errors;
chai.use(sinonChai);

describe('CFErrors tests', function () {

    describe('constructor', function () {

        describe('positive', function () {

            it('should create an error and constructor name should be CFError', function () {

                var err = new CFError(Errors.Error, {
                    message: "my message",
                    recognized: true
                });
                expect(err.constructor.name).to.equal("CFError");

            });

            it('should create an error', function () {

                var error = new CFError(Errors.Error, {
                    recognized: true
                });
                expect(error.message).to.equal("Error");
            });

            it('should create an error', function () {

                var error = new CFError(Errors.Error, {
                    message: "my message",
                    recognized: true
                });
                new CFError(Errors.Http.BadRequest, {
                    message: "bad",
                    cause: error
                });

            });

            it('should create an error derived from a non error object', function () {

                var error = {};
                new CFError(Errors.Http.BadRequest, {
                    message: "bad",
                    cause: error
                });

            });

            it('should create an error with extra', function () {

                new CFError(Errors.Error, {
                    message: "my message",
                    recognized: true,
                    extra: {field: "value"}
                });

            });

            it('should create an error if cause is a string', function () {
                new CFError(Errors.Error, {
                    message: "my message",
                    cause: "my err"
                });
            });

            it('should create an error in case no parameters were passed', function () {
                var error = new CFError();
                expect(error.message).to.equal("Error");
            });

            it('should create an error extended from multiple objects', function(){
                var error = new CFError(Errors.Http.BadRequest, {field: "field"}, {message: "my message"});
                expect(error.toString()).to.equal("BadRequest: my message");
                expect(error.field).to.equal("field");
            });

            it('should create an error extended from multiple objects', function(){
                var error = new CFError(Errors.Http.BadRequest, {field: "field"}, {message: "my message", name: "myError"});
                expect(error.toString()).to.equal("myError: my message");
                expect(error.field).to.equal("field");
            });


        });

        describe('negative', function () {

            it('should fail in case name is missing', function () {
                try {
                    new CFError({
                        message: 'error'
                    });
                }
                catch (e) {
                    return expect(e.toString()).to.equal("Error: The error name is missing");
                }
                throw new Error("should have failed");
            });

            it('should fail in case name is not a string', function () {
                try {
                    new CFError({
                        name: {},
                        message: 'error'
                    });
                }
                catch (e) {
                    return expect(e.toString()).to.equal("Error: The error name must be a string");
                }
                throw new Error("should have failed");
            });

            it('should fail in case an argument which is not the last is not an object', function () {
                try {
                    new CFError("string", {
                        name: {},
                        message: 'error'
                    });
                }
                catch (e) {
                    return expect(e.toString()).to.equal("Error: Passed arguments must be objects");
                }
                throw new Error("should have failed");
            });

            it('should fail in case merging the arguments objects fails', function () {

                var CFErrorProxy = proxyquire('../index', {
                    'lodash': {
                        assignIn: function () {
                            throw new Error("assignIn error");
                        }
                    }
                });
                try {
                    new CFErrorProxy(Errors.Http.BadRequest, {myField: "field"});
                }
                catch (e) {
                    expect(e.toString()).to.equal("Error: Passed arguments can not be merged");
                    return;
                }
                throw new Error("should have failed");

            });

        });

    });

    describe('message field', function () {


        it('should print expected message', function () {
            var s     = "string";
            var d     = 2;
            var error = new CFError({
                name: Errors.Error.name,
                message: 'this is: ' + s  + ' my :' + d
            });
            expect(error.message).to.equal("this is: string my :2");
        });

        it('should print expected message', function () {
            var s     = "string";
            var d     = 2;
            var error = new CFError('this is: ' + s + ' my :' + d);
            expect(error.message).to.equal("this is: string my :2");
        });

    });

    describe('stack field', function () {

        it('should print expected stack', function () {
            var s     = "string";
            var d     = 2;
            var error = new CFError('this is: ' + s + ' my :' + d);
            expect(error.stack).to.contain("Error: this is: string my :2\n");
        });

        it('should print expected stack for extended errorr', function () {
            var s        = "string";
            var d        = 2;
            var previous = new CFError(Errors.Http.BadRequest, "bad bad");
            var error    = new CFError(Errors.Error, {
                message: 'this is: ' + s + ' my :' + d,
                cause: previous
            });
            expect(error.stack).to.contain("Error: this is: string my :2\n");
            expect(error.stack).to.contain("BadRequest: bad bad\n");
        });

        it('should print expected stack for extended error', function () {
            var s        = "string";
            var d        = 2;
            var previous = new CFError(Errors.Http.BadRequest, "bad bad");
            var error    = new CFError(Errors.Error, {
                message: 'this is: ' + s + ' my :' + d,
                cause: previous,
                extra: {field: "valie"}
            });
            expect(error.stack).to.contain("Error: this is: string my :2\n");
            expect(error.stack).to.contain("BadRequest: bad bad\n");
        });

    });

    describe('recognized', function () {

        describe('positive - should return true', function () {

            it('should recognize in case there is only 1 CFError in the chain', function () {
                var error = new CFError({
                    name: Errors.Error.name,
                    message: "my error",
                    recognized: true
                });
                expect(error.recognized).to.equal(true);
            });

            it('should recognize in case a previous error deRecognized and the recent one recognized', function () {
                var error  = new CFError({
                    name: Errors.Error.name,
                    message: "my error",
                    recognized: false
                });
                var error2 = new CFError({
                    name: Errors.Inherit.name,
                    cause: error,
                    message: "extended error",
                    recognized: true
                });
                expect(error2.recognized).to.equal(true);
            });

            it('should recognize in case previous error recognized and the recent one did not do anything', function () {
                var error  = new CFError({
                    name: Errors.Error.name,
                    message: "my error",
                    recognized: true
                });
                var error2 = new CFError({
                    name: Errors.Inherit.name,
                    cause: error,
                    message: "extended error"
                });
                expect(error2.recognized).to.equal(true);
            });

            it('should not call handle correctly case when base error is not CFError', function () {
                var error  = new Error("base error");
                var error2 = new CFError({
                    name: Errors.Inherit.name,
                    cause: error,
                    message: "extended error"
                });
                expect(error2.recognized).to.equal(false);
            });

            it('should not call handle correctly case when base error is not CFError', function () {
                var error  = new Error("base error");
                var error2 = new CFError({
                    name: Errors.Inherit.name,
                    cause: error,
                    message: "extended error",
                    recognized: true
                });
                expect(error2.recognized).to.equal(true);
            });

        });

        describe('negative', function () {

            it('should not recognize in case there is only 1 CFError in the chain and recognize function was not called', function () {
                var error = new CFError({
                    name: Errors.Error.name,
                    message: "error"
                });
                expect(error.recognized).to.equal(false);
            });

            it('should not recognize in case a higher error have deRecognized after a previous error recognized', function () {
                var error  = new CFError({
                    name: Errors.Error.name,
                    message: "error",
                    recognized: true
                });
                var error2 = new CFError({
                    name: Errors.Error.name,
                    cause: error,
                    message: "extended Error",
                    recognized: false
                });
                expect(error2.recognized).to.equal(false);
            });

            it('should not recognize in case recognized was called and then deRecognized was called on the same error', function () {
                var error = new CFError({
                    name: Errors.Error.name,
                    message: "error",
                    recognized: false
                });
                expect(error.recognized).to.equal(false);
            });

        });

    });

    describe('toString', function () {

        it('should print expected message for default type', function () {
            var s     = "string";
            var d     = 2;
            var error = new CFError({
                name: Errors.Error.name,
                message: 'this is: ' + s + ' my :' + d
            });
            expect(error.toString()).to.equal("Error: this is: string my :2");
        });

        it('should print expected message for chosen type', function () {
            var s     = "string";
            var d     = 2;
            var error = new CFError({
                name: Errors.Http.BadRequest.name,
                message: 'this is: ' + s + ' my :' + d
            });
            expect(error.toString()).to.equal("BadRequest: this is: string my :2");
        });

        it('should print expected message for derived error of type Error', function () {
            var s     = "string";
            var d     = 2;
            var error = new CFError(Errors.Http.BadRequest, {
                cause: new Error("previous error"),
                message: 'this is: ' + s + ' my :' + d
            });
            expect(error.toString()).to.equal("BadRequest: this is: string my :2; caused by Error: previous error");
        });

        it('should print expected message for derived error of type CFError', function () {
            var s        = "string";
            var d        = 2;
            var previous = new CFError(Errors.Http.BadRequest, {
                message: "bad"
            });
            var error    = new CFError({
                name: Errors.Http.Forbidden.name,
                cause: previous,
                message: 'this is: ' + s + ' my :' + d
            });
            expect(error.toString()).to.equal("Forbidden: this is: string my :2; caused by BadRequest: bad");
        });

        it('should print expected message for derived error of type CFError', function () {
            var s        = "string";
            var d        = 2;
            var previous = new CFError(Errors.Http.BadRequest, {
                message: "bad"
            });
            var error    = new CFError(Errors.Http.Forbidden, {
                cause: previous,
                message: 'this is: ' + s + ' my :' + d,
                extra: {field: "value"}
            });
            expect(error.toString()).to.equal("Forbidden: this is: string my :2; caused by BadRequest: bad");
        });

    });

});