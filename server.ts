import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 5000

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!")
})

app.use("/api/v1/products", productsRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/orders", ordersRoutes)

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI)
    app.listen(port, () =>
      console.log(`The server is listening on port : ${port}`)
    )
  } catch (error) {
    console.log(error)
  }
}
start()
