// @ts-ignore
import { Request, Response } from "express"
const BaseError = require("../errors/base-error")

const errorHandler = (err: any, req: Request, res: Response) => {
  console.log("error-handler.ts ===> ", err)
  if (err instanceof BaseError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message })
  }
  let error = { ...err }
  if (err.name === "CastError") {
    error = new BaseError("Ressource not found", 404)
  } else if (err.name === "Validation error") {
    const message = Object.values(err.errors)
      // @ts-ignore
      .map((err) => err.message)
      .join("")
    error = new BaseError(message, 400)
  } else if (err.code === 11000) {
    error = new BaseError("Duplicate field was entered", 400)
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error!"
  })
}

module.exports = errorHandler
