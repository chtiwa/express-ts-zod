// @ts-ignore
const express: Express = require("express")
// @ts-ignore
const router = express.Router()
const { authenticate, logout } = require("../controllers/users")

router.route("/auth").post(authenticate)
router.route("/logout").post(logout)

module.exports = router
