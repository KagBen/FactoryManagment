const Department = require("../Models/departmentModel"); // Import your Department model
const Employee = require("../Models/employeeModel"); // Import your Employee model
const empShiftBll = require("./employeeShiftBLL");
const { ObjectId } = require("mongodb"); // Import ObjectId from MongoDB
const departmentBll = require("./departmentBLL");

const deleteEmployee = async (empId) => {
  try {
    // Check if the employee is a manager
    const isManager = await checkIfEmployeeIsManager(empId);

    if (isManager) {
      // Update the department as the employee is a manager
      const _updatedDepartments = await Department.findOneAndUpdate(
        { _id: isManager },
        {
          $set: {
            Manager: null,
          },
        }, // Specify the fields to update
        { new: true } // Return the updated document}
      );
    }

    // Get all employee shifts
    const employeeShifts = await empShiftBll.getAllShiftsOfEmployee();

    // Find the employee's related shifts
    const relatedShifts = employeeShifts.filter(
      (empShift) => empShift._id == empId
    );
   

    
if (relatedShifts[0].length !== 0) {
      // Delete related.empShiftIds
       relatedShifts[0].empShiftIds.map(async(empShiftId) =>{
        await empShiftBll.deleteEmpShift(empShiftId);
       });
    }

    // Delete the employee
    await Employee.findByIdAndDelete(empId);

    return "Employee Deleted and all related data deleted";
  } catch (err) {
    throw err;
  }
};

const getEmployeeDep = async () => {
  try {
    const employeesDep = await Employee.aggregate([
      {
        $lookup: {
          from: "Departments",
          localField: "DepId",
          foreignField: "_id",
          as: "departmentInfo",
        },
      },
    ]);
    return employeesDep;
  } catch (error) {
    throw new Error(error);
  }
};
const getEmployees = async () => {
  try {
    // Get all employees with departments
    const employeesDep = await getEmployeeDep();

    // Get all employee shifts
    const employeeShift = await empShiftBll.getAllShiftsOfEmployee();

    // Create an object to store employee information with shifts
    const empShiftDep = employeesDep.map((empDep) => {
      const empShift = employeeShift.find(
        (empShift) => empShift._id.toString() === empDep._id.toString()
      );

      // Include all employees' departments, even if there are no shifts
      return {
        ...empDep,
        employeeShift: empShift ? empShift.shiftsInfo : [],
      };
    });

    // empShiftDep now contains all employees, including those without shifts
    return empShiftDep;
  } catch (error) {
    console.error("Error in getEmployees:", error);
    throw new Error("Failed to retrieve employee information");
  }
};



const checkIfEmployeeIsManager = async (empId) => {
  const empObjectId = new ObjectId(empId); // Convert empId to ObjectId

  const depByManager = await Department.find({ Manager: empObjectId });

  if (depByManager.length > 0) {
    return depByManager[0]._id;
  } else {
    return null;
  }
};

const updateEmployee = async (empId, updateFields) => {
  try {
    if (updateFields.hasOwnProperty("DepId")) {
      // Check if the employee is a manager
      const _isManager = await checkIfEmployeeIsManager(empId);
      if (_isManager) {
        // Update the department as the employee is a manager
        const _updatedDepartments = await Department.findOneAndUpdate(
          { _id: _isManager },
          {
            $set: {
              Manager: null,
            },
          }, // Specify the fields to update
          { new: true } // Return the updated document}
        );

        if (!_updatedDepartments) {
          throw new Error("Department not found");
        }
      }
    }

    const updateEmployee = await Employee.findOneAndUpdate(
      { _id: empId },
      { $set: updateFields }, // Specify the fields to update
      { new: true } // Return the updated document
    );
    if (!updateEmployee) {
      throw new Error("Employee not found");
    }

    return updateEmployee;
  } catch (err) {
    throw err;
  }
};

const createEmployees = async (employeeData) => {
  const newEmp = new Employee(employeeData);
  await newEmp.save();
  return "employee created successfully";
};

const findEmployeesNotInDep = async (depId) => {
  try {
    const employees = await getEmployeeDep();

    // Filter out employees who are not in the specified department
    const employeesNotInDep = employees.filter((employee) => {
      if (employee.departmentInfo.length === 0) {
        // Employee has no department assigned
        return true;
      }
      return !employee.departmentInfo[0]._id.equals(depId);
    });

    return employeesNotInDep;
  } catch (error) {
    throw new Error(error);
  }
};
const findEmployeesInDep = async (depId) => {
  try {
    const employees = await getEmployeeDep();

    // Filter out employees who are not in the specified department
    const employeesInDep = employees.filter((employee) => {
      if (employee.departmentInfo.length === 0) {
        // Employee has no department assigned
        return false;
      }
      return employee.departmentInfo[0]._id.equals(depId);
    });
    return employeesInDep;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  deleteEmployee,
  getEmployeeDep,
  findEmployeesNotInDep,
  createEmployees,
  updateEmployee,
  getEmployees,
  findEmployeesInDep,
};
