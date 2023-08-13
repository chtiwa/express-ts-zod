"use strict";
class BadRequestError extends BaseError {
    constructor(name = "BadRequestError", httpCode = 401, message = "Bad request") {
        super(name, httpCode, message);
    }
}
