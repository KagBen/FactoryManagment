const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    Date: Date,
    StartHour: Number,
    EndHour: Number,
  },
  { versionKey: false }
);

const Shift = mongoose.model("Shift", shiftSchema, "Shifts");

module.exports = Shift;
