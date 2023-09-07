"use strict";
// @ts-ignore
const BaseError = require("./base-error");
class UnauthorizedError extends BaseError {
    constructor(name = "UnauthorizedError", httpCode = 401, message = "Unauthorized") {
        super(name, httpCode, message);
    }
}
module.exports = UnauthorizedError;
