import { Request, Response } from "express"
const Product = require("../models/Product")
const asyncWrapper = require("../middleware/async-wrapper")

const getProducts = asyncWrapper(async (req: Request, res: Response) => {
  const products = await Product.find()
  res.status(200).json({ success: true, products: products })
})

const getProduct = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findById({ _id: id })
  res.status(200).json({ success: true, product: product })
})

const createProduct = asyncWrapper(async (req: Request, res: Response) => {
  const { title, image, options, description, category, price } = req.body
  const product = await Product.create({
    title,
    price,
    image,
    description,
    options,
    category
  })
  res.status(201).json({ success: true, product: product })
})

const deleteProduct = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params
  await Product.findByIdAndDelete({ _id: id })
  res.status(204).json({ success: true })
})

module.exports = { getProducts, getProduct, createProduct, deleteProduct }
