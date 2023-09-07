import { Request, Response } from "express"

const User = require("../models/User")
const asyncWrapper = require("../middleware/async-wrapper")

const getUser = asyncWrapper(async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.params.email })
  res.status(200).json({
    success: true,
    user: user
  })
})

const authenticate = asyncWrapper(async (req: Request, res: Response) => {
  // @ts-ignore
  const { email } = req.body
  let user = await User.findOne({ email: email })

  if (!user) {
    // @ts-ignore
    const { name, image } = req.body
    user = await User.create({ email: email, name: name, image: image })
  }

  const refresh_token = user.createRefreshToken()

  res
    .status(200)
    .cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
    }) // 30 days
    .json({
      success: true,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image
    })
})

const logout = asyncWrapper(async (req: Request, res: Response) => {
  res
    .status(200)
    .cookie("refresh_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now())
    })
    .json({
      success: true
    })
})

module.exports = { authenticate, logout, getUser }
