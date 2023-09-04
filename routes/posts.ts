import { createPostSchema } from "../utils/schemas"
const express = require("express")
const router = express.Router()
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/posts")
const validate = require("../middleware/validate")

router.route("/").get(getPosts).post(validate(createPostSchema), createPost)
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost)

module.exports = router
