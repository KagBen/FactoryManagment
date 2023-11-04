const Department = require("../Models/departmentModel"); // Import your Department model
const Employee = require("../Models/employeeModel"); // Import your Employee model
// Your BLL function to get department data with manager's name
const employeeBll = require("./employeeBLL");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const getDepartmentsWithManagers = async () => {
  try{
  const departments = await Department.aggregate([
    {
      $lookup: {
        from: "Employees", // The collection to perform the lookup on
        localField: "_id", // The field in the current collection (Department)
        foreignField: "DepId", // The field in the "Employees" collection
        as: "EmployeesInfo", // The alias for the output field
      },
    },
    {
      $lookup: {
        from: "Employees", // The collection to perform the lookup on
        localField: "Manager", // The field in the current collection (Department)
        foreignField: "_id", // The field in the "Employees" collection
        as: "managerInfo", // The alias for the output field
      },
    },
  ]);

  return departments;
} catch (err) {
  throw err;
}
};

const addDepartments = async (depObj) => {
  try{
  const newDepartments = new Department(depObj);
  await newDepartments.save();
  return "new Department created successfully";
  }
  catch(err){
    throw new err();
  }
};

const updateDepartments = async (depId, updateFields) => {
  try {
    if (updateFields.hasOwnProperty("Manager")) {
      await employeeBll.updateEmployee(
        updateFields.Manager,
        { DepId: depId },
        true
      );
    }
    const _updatedDepartments = await Department.findOneAndUpdate(
      { _id: depId },
      { $set: updateFields }, // Specify the fields to update
      { new: true } // Return the updated document}
    );
    if (!_updatedDepartments) {
      throw new Error("Department not found");
    }

    return _updatedDepartments;
  } catch (err) {
    throw new err();
  }
};

const deleteDep = async (depId) => {
  try {
    const allEmpInDep = await employeeBll.findEmployeesInDep(depId);
    console.log(allEmpInDep);
    // Update each employee to remove their association with the department
    for (const empInDep of allEmpInDep) {
      await employeeBll.updateEmployee(empInDep._id, { DepId: null });
    }

    // Now that all employees are updated, delete the department
    await Department.findByIdAndDelete(depId);

    return "Department deleted, and all associated employees were updated.";
  } catch (error) {
    throw new err(error);
  }
};

module.exports = {
  getDepartmentsWithManagers,
  addDepartments,
  updateDepartments,
  deleteDep,
};
