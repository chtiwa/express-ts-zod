import { Request, Response } from "express"

const Order = require("../models/Order")
const asyncWrapper = require("../middleware/async-wrapper")

const getOrders = asyncWrapper(async (req: Request, res: Response) => {
  // @ts-ignore
  const { isAdmin, email } = req.user
  if (isAdmin) {
    const orders = await Order.find()
    res.status(200).json({ success: true, orders: orders })
  } else {
    const orders = await Order.find({ userEmail: email })
    res.status(200).json({ success: true, orders: orders })
  }
})

const populateOrders = asyncWrapper(async (req: Request, res: Response) => {
  // populate the products path which contains a product refrence
  const orders = await Order.find().populate({
    path: "products",
    populate: {
      path: "product"
    }
  })

  res.status(200).json({ success: true, orders: orders })
})

const createOrder = asyncWrapper(async (req: Request, res: Response) => {
  const { userEmail, products, price } = req.body
  const order = await Order.create({
    userEmail: userEmail,
    products: products,
    price: price
  })
  res.status(201).json({ success: true, order: order })
})

const confirmOrder = asyncWrapper(async (req: Request, res: Response) => {
  const { intent_id } = req.body
  const order = await Order.findOne({ intent_id: intent_id })
  order.isConfirmed = true
  order.save()
  res.status(201).json({ success: true, order: order })
})

module.exports = { getOrders, createOrder, confirmOrder }
