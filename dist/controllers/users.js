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
const User = require("../models/User");
const asyncWrapper = require("../middleware/async-wrapper");
const getUser = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email: req.params.email });
    res.status(200).json({
        success: true,
        user: user
    });
}));
const authenticate = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { email } = req.body;
    let user = yield User.findOne({ email: email });
    if (!user) {
        // @ts-ignore
        const { name, image } = req.body;
        user = yield User.create({ email: email, name: name, image: image });
    }
    const refresh_token = user.createRefreshToken();
    res
        .status(200)
        .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
    }) // 30 days
        .json({
        success: true,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        image: user.image
    });
}));
const logout = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(200)
        .cookie("refresh_token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now())
    })
        .json({
        success: true
    });
}));
module.exports = { authenticate, logout, getUser };
