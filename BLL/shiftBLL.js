const Shift = require("../Models/shiftModel");

function areHoursValid(StartHour, EndHour) {
  // Check if both hours are numbers and within the valid range (0-23)
  if (
    typeof StartHour === "number" &&
    typeof EndHour === "number" &&
    StartHour >= 0 &&
    StartHour <= 23 &&
    EndHour >= 0 &&
    EndHour <= 23
  ) {
    // Check if EndHour is greater than or equal to StartHour
    return EndHour >= StartHour || (EndHour === 0 && StartHour > 0);
  }

  // If any of the conditions fail, the hours are not valid
  return false;
}

const addShift = async (shiftObj) => {
    console.log(shiftObj)
  const _areHoursValid = areHoursValid(shiftObj.StartHour, shiftObj.EndHour);
  if (_areHoursValid) {
    const newShift = new Shift(shiftObj);
    await newShift.save();
    return "Shift added successfully";
  } else {
    throw new Error("Shift hours not valid ...");
  }
};

const getShift = async () => {
return Shift.find();
}

const updateShift = async (shiftId, updateFields) => {
  //shiftid in router rec in params and body rec in body
  //when updatig if update hours assu,e that put them right //
  try {
    const updateShift = await Shift.findOneAndUpdate(
      { _id: shiftId },
      { $set: updateFields }, // Specify the fields to update
      { new: true } // Return the updated document}
    );
    if (!updateShift) {
      throw new Error("Shift not found");
    }

    return updateShift;
  } catch (err) {
    throw err;
  }
};



module.exports = { updateShift, addShift,getShift };
