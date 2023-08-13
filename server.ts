import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const connectDb = require("./db/connect");
const postsRoutes = require("./routes/posts");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("This is quite nice actually");
});

app.use("/api/v1/posts", postsRoutes);

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`The server is listening on port : ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
