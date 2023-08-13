// @ts-ignore
const mongoose = require("mongoose");

const options = {
  useUnifiedTopology: true,
};

const connectDb = (uri: string) => {
  return mongoose
    .connect(uri, options)
    .then(() => console.log("Connected to the database!"))
    .catch((err: any) => console.log(err));
};

module.exports = connectDb;
