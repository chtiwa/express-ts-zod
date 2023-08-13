const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");
import { z } from "zod";
const validate = require("../middleware/validate");

const createPostSchema = z.object({
  body: z.object({
    title: z
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
