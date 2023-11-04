const usersWS = require("../DAL/usersWS");
const usersActionFile = require("../DAL/usersActionLogJSON");
const userDb = require("../Models/userModel");
const dateFunc = require("../Utils/dateFunc");

const userActionsLeftToday = async (id, NumOfActions) => {
  const actionsUsers = await usersActionFile.getData();

  const userActionsToday = actionsUsers.filter(
    (userFile) =>
      id.toString() === userFile.id && userFile.date == dateFunc.getDateToday()
  );
  if (userActionsToday) {
    _leftActionsToday =
      userActionsToday.length != 0
        ? userActionsToday.reduce(
            (min, action) => Math.min(min, action.actionAllowed),
            Infinity
          )
        : NumOfActions;
    return _leftActionsToday;
  } else {
    return NumOfActions;
  }
};
const addInitialUsers = async () => {
  const usersData = [
    { FullName: "Leanne Graham", NumOfActions: 10, role: "admin" },
    { FullName: "Ervin Howell", NumOfActions: 10, role: "user" },
    { FullName: "Clementine Bauch", NumOfActions: 7, role: "user" },
    { FullName: "Patricia Lebsack", NumOfActions: 10, role: "user" },
    { FullName: "Chelsey Dietrich", NumOfActions: 6, role: "user" },
    { FullName: "Mrs. Dennis Schulist", NumOfActions: 10, role: "user" },
    { FullName: "Kurtis Weissnat", NumOfActions: 4, role: "user" },
    { FullName: "Nicholas Runolfsdottir V", NumOfActions: 10, role: "user" },
    { FullName: "Glenna Reichert", NumOfActions: 10, role: "user" },
    { FullName: "Clementina DuBuque", NumOfActions: 10, role: "user" },
    // Add more users as needed
  ];

  try {
    await userDb.insertMany(usersData);
    console.log("Initial users added to the database.");
  } catch (error) {
    console.error("Error adding initial users:", error);
  }
};

const getAllUsers = async () => {
  const usersAggregatedData = [];
  const usersDbData = await userDb.find({});
  usersDbData.map(async (user) => {
    usersAggregatedData.push({
      userId: user._id,
      FullName: user.FullName,
      maxActions: user.NumOfActions,
      role:user.role,
    });
  });
  return usersAggregatedData;
};

const addUserAction = async (id, maxActionsAllowed) => {
  const _leftActionsToday = userActionsLeftToday(id);

  const res = await usersActionFile.addAction({
    id: id,
    maxActions: maxActionsAllowed,
    actionAllowed: _leftActionsToday - 1,
  });
  return res;
};

const checkUserExistWS = async (username, email) => {
  const { data } = await usersWS.getData(
    `https://jsonplaceholder.typicode.com/users?username=${username}&email=${email}`
  );

  if (data.length == 0) return null;
  else return data[0].name;
};

const loginUser = async (username, email) => {
  const _UserExistName = await checkUserExistWS(username, email);
  if (_UserExistName != null) {
    const allUsers = await getAllUsers();
    const user = allUsers.find((user) => user.FullName == _UserExistName);
    _leftActionsToday = await userActionsLeftToday(
      user.userId,
      user.maxActions
    );

    user.leftActionsToday = _leftActionsToday;

    if (user.leftActionsToday == 0) {
      throw new Error(
        `user ${username} reached the maximum allowed actions today`
      );
    } else {
      return user;
    }
  } else {
    throw new Error(
      "user not found in the ws \n " +
        "username:" +
        username +
        " \nemail:" +
        email
    );
  }
};

module.exports = { loginUser, addUserAction, getAllUsers, addInitialUsers };
