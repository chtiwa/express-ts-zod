"use strict";
// @ts-ignore
const BaseError = require("./base-error");
class BadRequestError extends BaseError {
    constructor(name = "BadRequestError", httpCode = 401, message = "Bad request") {
        super(name, httpCode, message);
    }
}
module.exports = BadRequestError;
