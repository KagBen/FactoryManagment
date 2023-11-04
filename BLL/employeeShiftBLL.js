const empShift = require("../Models/empShiftModel");
const shifts = require("../Models/shiftModel");
const employees = require("../Models/employeeModel");

const addEmpShift = async (empShiftObj) => {
  const newEmpShift = new empShift(empShiftObj);
  await newEmpShift.save();
  return "Shift Connected to Employee";
};

const deleteEmpShift = async (empShiftId) => {
  await empShift.findByIdAndDelete(empShiftId);
  return "Shift Deleted";
};
const getAllEmployeesInShift = async () => {
  try {
    // Fetch all shifts
    const allShifts = await shifts.find();

    // Create an object to store the result
    const shiftsInfo = [];

    // Loop through each shift
    for (const shift of allShifts) {
      // Perform a $lookup aggregation to get employee information for each shift
      const employeesInShift = await empShift.aggregate([
        {
          $match: {
            ShiftId: shift._id, // Match employees for the current shift
          },
        },
        {
          $lookup: {
            from: "Employees",
            localField: "EmployeeId",
            foreignField: "_id",
            as: "employeeInfo",
          },
        },
      ]);

      // Create an array to store employee information for the current shift
      const employeesInfo = employeesInShift.map((employeeShift) => ({
        empShiftId: employeeShift._id, // Store the empShiftId
        employeeInfo: employeeShift.employeeInfo[0], // Store the employee info
      }));

      // Push the result for the current shift to the shiftsInfo array
       // Push the result for the current shift to the shiftsInfo array, including shift details
       shiftsInfo.push({
        shiftInfo: shift, // Store shift details
        employeesInfo: employeesInfo,
      });
    }

    return shiftsInfo;
  } catch (err) {
    throw err;
  }
};

const getEmpShift = async()=>{
  return await empShift.find();
}
const getAllShiftsOfEmployee = async () => {
  try {
    // Fetch all employees
    const allEmployees = await employees.find();

    // Perform a $lookup aggregation to get shift information for each employee
    const shiftsOfEmployee = await empShift.aggregate([
      {
        $lookup: {
          from: "Shifts",
          localField: "ShiftId",
          foreignField: "_id",
          as: "shiftsInfo",
        },
      },
      {
        $group: {
          _id: "$EmployeeId",
          empShiftIds: { $push: "$_id" }, // Collect empShift _id values
          shiftsInfo: { $push: "$shiftsInfo" }, // Group shifts into an array per employee
        },
      },
    ]);

    // Combine the results to include all employees, even those without shifts
    const employeesShiftsInfo = allEmployees.map((employee) => {
      const matchingEmployeeShifts = shiftsOfEmployee.find((shifts) =>
        shifts._id.equals(employee._id)
      );
      if (matchingEmployeeShifts) {
        return {
          _id: employee._id,
          empShiftIds: matchingEmployeeShifts.empShiftIds, // Include empShift _id values
          shiftsInfo: matchingEmployeeShifts.shiftsInfo,
        };
      } else {
        return {
          _id: employee._id,
          empShiftIds: [], // No empShifts found for this employee
          shiftsInfo: [],
        };
      }
    });

    return employeesShiftsInfo;
  } catch (err) {
    throw err;
  }
};



//useless ! 
const FindShiftByEmpShiftId = async (empId, ShiftId) => {
  try {
    // Use the EmployeeShift model to find the employee shift record
    const empShiftRecord = await empShift.findOne({
      EmployeeId: empId,
      ShiftId: ShiftId,
    });

    if (!empShiftRecord) {
      throw new Error("Employee shift not found");
    }

    return empShiftRecord._id; // Return the empShiftId
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEmployeesInShift,
  getAllShiftsOfEmployee,
  FindShiftByEmpShiftId,
  deleteEmpShift,
  addEmpShift,
  getEmpShift,
};
