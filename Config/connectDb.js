const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbPath =
  process.env.MONGODB_PATH || "mongodb://localhost:27017/factoryMangmentDbA";

const connectDb = () => {
  mongoose
    .connect(mongoDbPath)
    .then(() =>
      console.log("Connected to MongoDB server running on port " + mongoDbPath)
    )
    .catch((err) =>
      console.log("Failed to connect to MongoDB server dut to : " + err)
    );
};

module.exports = connectDb;
