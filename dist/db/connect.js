"use strict";
// @ts-ignore
const mongoose = require("mongoose");
const options = {
    useUnifiedTopology: true,
};
const connectDb = (uri) => {
    return mongoose
        .connect(uri, options)
        .then(() => console.log("Connected to the database!"))
        .catch((err) => console.log(err));
};
module.exports = connectDb;
