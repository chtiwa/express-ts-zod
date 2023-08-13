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
const Post = require("../models/Post");
const asyncWrapper = require("../middleware/async-wrapper");
const getPosts = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post.find();
    res.status(200).json({ success: true, posts: posts });
}));
const getPost = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findById({ _id: req.params.id });
    res.status(200).json({ success: true, post: post });
}));
const createPost = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const post = yield Post.create({ title: title });
    res.status(201).json({ success: true, post: post });
}));
const updatePost = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title } = req.body;
    const post = yield Post.findByIdAndUpdate({ _id: id }, { title: title }, { new: true });
    res.status(200).json({ success: true, post: post });
}));
const deletePost = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Post.findByIdAndDelete({ _id: id });
    res.status(204).json({ success: true });
}));
module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
