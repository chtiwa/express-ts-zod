// @ts-ignore
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    image: { type: String }
  },
  { timestamps: true }
)

UserSchema.methods.createRefreshToken = function () {
  const refresh_token = jwt.sign(
    {
      name: this.name,
      userId: this._id,
      isAdmin: this.isAdmin,
      email: this.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
  )
  return refresh_token
}

module.exports = mongoose.model("User", UserSchema)
