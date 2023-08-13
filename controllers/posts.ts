import { Request, Response } from "express";
const Post = require("../models/Post");
const asyncWrapper = require("../middleware/async-wrapper");

const getPosts = asyncWrapper(async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(200).json({ success: true, posts: posts });
});

const getPost = asyncWrapper(async (req: Request, res: Response) => {
  const post = await Post.findById({ _id: req.params.id });
  res.status(200).json({ success: true, post: post });
});

const createPost = asyncWrapper(async (req: Request, res: Response) => {
  const { title } = req.body;
  const post = await Post.create({ title: title });
  res.status(201).json({ success: true, post: post });
});

const updatePost = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const post = await Post.findByIdAndUpdate(
    { _id: id },
    { title: title },
    { new: true }
  );
  res.status(200).json({ success: true, post: post });
});

const deletePost = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  await Post.findByIdAndDelete({ _id: id });
  res.status(204).json({ success: true });
});

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
