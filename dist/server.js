"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
const express_1 = __importDefault(require("express"))
const dotenv_1 = __importDefault(require("dotenv"))
dotenv_1.default.config()
const app = (0, express_1.default)()
const connectDb = require("./db/connect")
const productsRoutes = require("./routes/products")
const usersRoutes = require("./routes/users")
const ordersRoutes = require("./routes/orders")
const cors = require("cors")
const cookieParser = require("cookie-parser")
app.use(cookieParser())
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.PORTFOLIO_URL],
    credentials: true
  })
)
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: true }))
const port = process.env.PORT || 5000
app.get("/", (req, res) => {
  res.send("Hello world!")
})
app.use("/api/v1/products", productsRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/orders", ordersRoutes)
const start = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield connectDb(process.env.MONGODB_URI)
      app.listen(port, () =>
        console.log(`The server is listening on port : ${port}`)
      )
    } catch (error) {
      console.log(error)
    }
  })
start()
