"use strict";
class BaseError extends Error {
    constructor(name, httpCode, messsage) {
        super(messsage);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        Error.captureStackTrace(this);
    }
}
