const mongoose = require("mongoose");

const depSchema = new mongoose.Schema(
  {
    Name: String,
    Manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Reference the Employee model
    }, // Manger is foreign key from employee stored as string
  },
  { versionKey: false }
);

const Department = mongoose.model("Department", depSchema, "Departments");

module.exports = Department;
