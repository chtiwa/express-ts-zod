"use strict";
class BaseError extends Error {
    constructor(name, statusCode, messsage) {
        super(messsage);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
