"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost, } = require("../controllers/posts");
const zod_1 = require("zod");
const validate = require("../middleware/validate");
const createPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Title is required",
        })
            .min(3)
            .max(30),
    }),
});
router.route("/").get(getPosts).post(validate(createPostSchema), createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);
module.exports = router;
