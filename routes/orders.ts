// @ts-ignore
const express = require("express")
// @ts-ignore
const router = express.Router()
const {
  getOrders,
  createOrder,
  confirmOrder,
  createIntent
} = require("../controllers/orders")

// create an order with the intent_id
router.route("/create-order").post(createOrder)
router.route("/create-intent/:order_id").post(createIntent)
// confirms the order with the intent id
router.route("/cofirm-order/:intent_id").patch(confirmOrder)
router.route("/:email").get(getOrders)

module.exports = router
