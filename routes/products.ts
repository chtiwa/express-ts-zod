// @ts-ignore
const express = require("express")
// @ts-ignore
const router = express.Router()
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct
} = require("../controllers/products")
const authentication = require("../middleware/authentication")

router.route("/").get(getProducts).post(createProduct)
router.route("/:id").get(getProduct).delete(authentication, deleteProduct)

module.exports = router
