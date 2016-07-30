'use strict';

var EvalError = {
    name: "EvalError",
    message: "Eval Error"
};

var SyntaxError = {
    name: "SyntaxError",
    message: "Syntax Error"
};

var RangeError = {
    name: "RangeError",
    message: "Range Error"
};

var ReferenceError = {
    name: "ReferenceError",
    message: "Reference Error"
};

var TypeError = {
    name: "TypeError",
    message: "Type Error"
};

var URIError = {
    name: "URIError",
    message: "URI Error"
};

module.exports = [
    EvalError,
    SyntaxError,
    RangeError,
    ReferenceError,
    TypeError,
    URIError
];