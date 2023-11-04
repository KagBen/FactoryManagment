const mongoose = require("mongoose");

const empSchema = new mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    StartWorkYear: Number,
    DepId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // department id is foreign key
    // from departments stored as string where the employees are working
  },
  { versionKey: false }
);

const Employee = mongoose.model("Employee", empSchema, "Employees");

module.exports = Employee;
