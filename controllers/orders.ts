import { Request, Response } from "express"
const Order = require("../models/Order")
const asyncWrapper = require("../middleware/async-wrapper")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const getOrders = asyncWrapper(async (req: Request, res: Response) => {
  // @ts-ignore
  const { email } = req.params
  const orders = await Order.find({ userEmail: email })
  res.status(200).json({ success: true, orders: orders })
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
  const { userEmail, products, price, status } = req.body
  const order = await Order.create({
    userEmail,
    products,
    price,
    status
  })
  res.status(201).json({ success: true, order: order })
})

const createIntent = asyncWrapper(async (req: Request, res: Response) => {
  const { order_id } = req.params
  const order = await Order.findOne({ _id: order_id })
  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      // @ts-ignore
      amount: (order.price * 100).toFixed(0),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true
      }
    })
    order.intent_id = paymentIntent.id
    order.save()
    res.status(201).json({
      success: true,
      order: order,
      clientSecret: paymentIntent.client_secret
    })
  }
})

const confirmOrder = asyncWrapper(async (req: Request, res: Response) => {
  const { intent_id } = req.params
  console.log(intent_id)
  const order = await Order.findOne({ intent_id: intent_id })
  order.isConfirmed = true
  order.save()
  res.status(201).json({ success: true, order: order })
})

module.exports = { getOrders, createOrder, createIntent, confirmOrder }
