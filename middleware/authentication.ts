import { Request, Response, NextFunction } from "express"
const UnauthorizedError = require("../errors/unauthorized-error")

const jwt = require("jsonwebtoken")

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token
    if (!refresh_token) {
      throw new UnauthorizedError()
    }

    const payload = await jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    )
    if (!payload) {
      throw new UnauthorizedError()
    }

    next()
  } catch (error) {
    throw new UnauthorizedError()
  }
}

module.exports = authentication
