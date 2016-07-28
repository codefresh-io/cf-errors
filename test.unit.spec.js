var chai       = require('chai');
var expect     = chai.expect;
var sinonChai  = require('sinon-chai');
var CFError    = require('./index');
var ErrorTypes = CFError.errorTypes;
chai.use(sinonChai);

describe('CFErrors tests', function () {

    describe('constructor', function () {

        describe('object constructor', function () {

            describe('positive', function () {

                it('should create an error', function(){

                    new CFError({
                        type: ErrorTypes.Error,
                        message: "my message",
                        recognized: true,
                    });

                });

                it('should create an error', function(){

                    var error = new CFError({
                        type: ErrorTypes.Error,
                        recognized: true
                    });
                    expect(error.message).to.equal("");
                });

                it('should create an error', function(){

                    var error = new CFError({
                        type: ErrorTypes.Error,
                        message: "my message",
                        recognized: true
                    });
                    new CFError({
                        type: ErrorTypes.BadRequestError,
                        message: "bad",
                        cause: error
                    });

                });

                it('should create an error derived from a non error object', function(){

                    var error = {};
                    new CFError({
                        type: ErrorTypes.BadRequestError,
                        message: "bad",
                        cause: error
                    });

                });

            });

            describe('negative', function () {

                it('should fail in case the type provided is not valid', function () {
                    try {
                        new CFError({
                            type: "non-existing-type",
                            message: `error`
                        });
                    }
                    catch (e) {
                        expect(e.toString()).to.equal("WrongInputError: The error type is incorrect");
                    }
                });

                it('should fail in case type is missing', function () {
                    try {
                        new CFError({
                            message: `error`
                        });
                    }
                    catch (e) {
                        expect(e.toString()).to.equal("WrongInputError: The error type is missing");
                    }
                });

                it('should fail in case type is not a string', function () {
                    try {
                        new CFError({
                            type: {},
                            message: `error`
                        });
                    }
                    catch (e) {
                        expect(e.toString()).to.equal("WrongInputError: The error type must be a string");
                    }
                });

                it('should fail in case the message is not a string', function () {
                    try {
                        new CFError({
                            type: ErrorTypes.Error,
                            message: {}
                        });
                    }
                    catch (e) {
                        expect(e.toString()).to.equal("WrongInputError: The message field must be a string");
                    }
                });

            });

        });

        describe('args constructor', function () {

            describe('positive', function () {

                it('should create an error', function(){

                    new CFError(ErrorTypes.Error, "my message");

                });

                it('should create an error', function(){

                    var error = new CFError({
                        type: ErrorTypes.Error,
                        recognized: true
                    });
                    expect(error.message).to.equal("");
                });

                it('should create an error', function(){

                    var error = new CFError(ErrorTypes.Error, "my message");
                    new CFError(ErrorTypes.BadRequestError, error, "bad");
                });

                it('should create an error derived from a non error object', function(){

                    var error = {};
                    new CFError(ErrorTypes.BadRequestError, error, "bad");

                });

                it('should create an error derived from a non error object', function(){

                    var error = {};
                    new CFError(ErrorTypes.BadRequestError);

                });
            });

            describe('negative', function () {

                it('should fail in case the type provided is not valid', function () {
                    try {
                        new CFError("non-existing-type", `error`);
                    }
                    catch (e) {
                        expect(e.toString()).to.equal("WrongInputError: The error type is incorrect");
                    }
                });

                it('should fail in case the message is not a string', function () {
                    try {
                        new CFError(ErrorTypes.Error, {});
                    }
                    catch (e) {
                        expect(e.toString()).to.equal("WrongInputError: The message field must be a string");
                    }
                });

            });

        });

    });

    describe('message field', function () {

        describe('object constructor', function () {

            it('should print expected message', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError({
                    type: ErrorTypes.Error,
                    message: `this is: ${s} my :${d}`
                });
                expect(error.message).to.equal("this is: string my :2");
            });
        });

        describe('args constructor', function () {
            it('should print expected message', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError(ErrorTypes.Error, `this is: ${s} my :${d}`);
                expect(error.message).to.equal("this is: string my :2");
            });
        });

    });

    describe('stack field', function () {

        describe('object constructor', function () {

            it('should print expected stack', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError({
                    type: ErrorTypes.Error,
                    message: `this is: ${s} my :${d}`
                });
                expect(error.stack).to.contain("Error: this is: string my :2\n");
            });

            it('should print expected stack for extended error', function () {
                var s        = "string";
                var d        = 2;
                var previous = new CFError({
                    type: ErrorTypes.BadRequestError,
                    message: "bad bad"
                });
                var error    = new CFError({
                    type: ErrorTypes.Error,
                    message: `this is: ${s} my :${d}`,
                    cause: previous
                });
                expect(error.stack).to.contain("Error: this is: string my :2\n");
                expect(error.stack).to.contain("BadRequestError: bad bad\n");
            });

        });

        describe('args constructor', function () {

            it('should print expected stack', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError(ErrorTypes.Error, `this is: ${s} my :${d}`);
                expect(error.stack).to.contain("Error: this is: string my :2\n");
            });

            it('should print expected stack for extended error', function () {
                var s        = "string";
                var d        = 2;
                var previous = new CFError(ErrorTypes.BadRequestError, "bad bad");
                var error    = new CFError(ErrorTypes.Error, previous, `this is: ${s} my :${d}`);
                expect(error.stack).to.contain("Error: this is: string my :2\n");
                expect(error.stack).to.contain("BadRequestError: bad bad\n");
            });
        });

    });

    describe('isRecognize', function () {

        describe('positive - should return true', function () {

            it('should recognize in case there is only 1 CFError in the chain', function () {
                var error = new CFError({
                    type: ErrorTypes.Error,
                    message: "my error",
                    recognized: true
                });
                expect(error.isRecognized()).to.equal(true);
            });

            it('should recognize in case a previous error deRecognized and the recent one recognized', function () {
                var error  = new CFError({
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

            it('should recognize in case previous error recognized and the recent one did not do anything', function () {
                var error  = new CFError({
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

            it('should not call handle correctly case when base error is not CFError', function () {
                var error  = new Error("base error");
                var error2 = new CFError({
                    type: ErrorTypes.Inherit,
                    cause: error,
                    message: "extended error"
                });
                expect(error2.isRecognized()).to.equal(false);
            });

            it('should not call handle correctly case when base error is not CFError', function () {
                var error  = new Error("base error");
                var error2 = new CFError({
                    type: ErrorTypes.Inherit,
                    cause: error,
                    message: "extended error",
                    recognized: true
                });
                expect(error2.isRecognized()).to.equal(true);
            });

        });

        describe('negative', function () {

            it('should not recognize in case there is only 1 CFError in the chain and recognize function was not called', function () {
                var error = new CFError({
                    type: ErrorTypes.Error,
                    message: "error"
                });
                expect(error.isRecognized()).to.equal(false);
            });

            it('should not recognize in case a higher error have deRecognized after a previous error recognized', function () {
                var error  = new CFError({
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

            it('should not recognize in case recognized was called and then deRecognized was called on the same error', function () {
                var error = new CFError({
                    type: ErrorTypes.Error,
                    message: "error",
                    recognized: false
                });
                expect(error.isRecognized()).to.equal(false);
            });

        });

    });

    describe('getStatusCode', function () {

        describe('object constructor', function () {

            it('should return expected status code', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError({
                    type: ErrorTypes.Error,
                    message: `this is: ${s} my :${d}`
                });
                expect(error.getStatusCode()).to.equal(400);
            });

            it('should return expected status code', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError({
                    type: ErrorTypes.NotFoundError,
                    message: `this is: ${s} my :${d}`
                });
                expect(error.getStatusCode()).to.equal(404);
            });

            it('should return expected status code for inherited error', function () {
                var s        = "string";
                var d        = 2;
                var previous = new CFError({
                    type: ErrorTypes.NotFoundError,
                    message: "not found"
                });
                var error    = new CFError({
                    type: ErrorTypes.Inherit,
                    message: `this is: ${s} my :${d}`,
                    cause: previous
                });
                expect(error.getStatusCode()).to.equal(404);
            });
        });

        describe('args constructor', function () {

            it('should return expected status code', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError(ErrorTypes.Error, `this is: ${s} my :${d}`);
                expect(error.getStatusCode()).to.equal(400);
            });

            it('should return expected status code', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError(ErrorTypes.NotFoundError, `this is: ${s} my :${d}`);
                expect(error.getStatusCode()).to.equal(404);
            });

            it('should return expected status code for inherited error', function () {
                var s        = "string";
                var d        = 2;
                var previous = new CFError(ErrorTypes.NotFoundError, "not found");
                var error    = new CFError(ErrorTypes.Inherit, previous, `this is: ${s} my :${d}`);
                expect(error.getStatusCode()).to.equal(404);
            });
        });

    });

    describe('toString', function () {

        describe('object constructor', function () {
            it('should print expected message for default type', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError({
                    type: ErrorTypes.Error,
                    message: `this is: ${s} my :${d}`
                });
                expect(error.toString()).to.equal("Error: this is: string my :2");
            });

            it('should print expected message for chosen type', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError({
                    type: ErrorTypes.BadRequestError,
                    message: `this is: ${s} my :${d}`
                });
                expect(error.toString()).to.equal("BadRequestError: this is: string my :2");
            });

            it('should print expected message for derived error of type Error', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError({
                    type: ErrorTypes.BadRequestError,
                    cause: new Error("previous error"),
                    message: `this is: ${s} my :${d}`
                });
                expect(error.toString()).to.equal("BadRequestError: this is: string my :2; Caused by Error: previous error");
            });

            it('should print expected message for derived error of type CFError', function () {
                var s        = "string";
                var d        = 2;
                var previous = new CFError({
                    type: ErrorTypes.BadRequestError,
                    message: "bad"
                });
                var error    = new CFError({
                    type: ErrorTypes.ForbiddenError,
                    cause: previous,
                    message: `this is: ${s} my :${d}`
                });
                expect(error.toString()).to.equal("ForbiddenError: this is: string my :2; Caused by BadRequestError: bad");
            });
        });

        describe('args constructor', function () {
            it('should print expected message for default type', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError(ErrorTypes.Error, `this is: ${s} my :${d}`);
                expect(error.toString()).to.equal("Error: this is: string my :2");
            });

            it('should print expected message for chosen type', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError(ErrorTypes.BadRequestError, `this is: ${s} my :${d}`);
                expect(error.toString()).to.equal("BadRequestError: this is: string my :2");
            });

            it('should print expected message for derived error of type Error', function () {
                var s     = "string";
                var d     = 2;
                var error = new CFError(ErrorTypes.BadRequestError, new Error("previous error"), `this is: ${s} my :${d}`);
                expect(error.toString()).to.equal("BadRequestError: this is: string my :2; Caused by Error: previous error");
            });

            it('should print expected message for derived error of type CFError', function () {
                var s        = "string";
                var d        = 2;
                var previous = new CFError(ErrorTypes.BadRequestError, "bad");
                var error    = new CFError(ErrorTypes.ForbiddenError, previous, `this is: ${s} my :${d}`);
                expect(error.toString()).to.equal("ForbiddenError: this is: string my :2; Caused by BadRequestError: bad");
            });
        });


    });

});