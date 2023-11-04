const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FullName: String,
    NumOfActions: Number,
    role: String,
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
