// @ts-ignore
const mongoose = require("mongoose")

// populate the product
const Product = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
})

const OrderSchema = new mongoose.Schema(
  {
    products: [Product],
    price: { type: Number },
    status: { type: String, default: "Pending" },
    userEmail: { type: String },
    intent_id: { type: String, unique: true },
    isConfirmed: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)
