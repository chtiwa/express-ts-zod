"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnauthorizedError = require("../errors/unauthorized-error");
const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) {
            throw new UnauthorizedError();
        }
        const payload = yield jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
        if (!payload) {
            throw new UnauthorizedError();
        }
        // @ts-ignore
        req.user = payload;
        next();
    }
    catch (error) {
        throw new UnauthorizedError();
    }
});
module.exports = authentication;
