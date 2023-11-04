const mongoose = require("mongoose");

const empshiSchema = new mongoose.Schema(
  {
    // EmployeeId  and ShiftIs are a foreign key from employee  and shift stored as string is connection between employee and shift
    EmployeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Reference the Employee model
    },
    ShiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift", // Reference the Employee model
    },
  },
  { versionKey: false }
);

const EmpShift = mongoose.model(
  "EmployeeShift",
  empshiSchema,
  "EmployeeShifts"
);

module.exports = EmpShift;
