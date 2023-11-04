const jf = require("jsonfile");

const file = "./data/userActionLog.json";
const getData = async () => {
  const data = await jf.readFile(file);
  return data.actions;
};

const addAction = async (actionObj) => {
  const { actions } = await jf.readFile(file);
  actions.push(actionObj);
  jf.writeFile(file, { actions });
  return "action added successfully";
};

module.exports = { getData, addAction };
