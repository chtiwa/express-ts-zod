// @ts-ignore
const BaseError = require("./base-error")

class APIError extends BaseError {
  constructor(
    name = "APIError",
    httpCode = 500,
    message = "internal server error"
  ) {
    super(name, httpCode, message)
  }
}

module.exports = APIError
