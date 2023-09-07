// @ts-ignore
const express = require("express")
// @ts-ignore
const router = express.Router()
const {
  getOrders,
  createOrder,
  confirmOrder
} = require("../controllers/orders")

// create an order with the intent_id
router.route("/").get(getOrders)
router.route("/create-order").post(createOrder)
// confirms the order with the intent id
router.route("/cofirm-order").post(confirmOrder)

module.exports = router
