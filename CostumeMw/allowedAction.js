require("dotenv").config();
const logActionFile = require("../DAL/usersActionLogJSON");
const { getDateToday } = require("../Utils/dateFunc");
const axios = require("axios");

const canDoAction = async (req, res, next) => {
  if (req.method === "GET") {
    next();
  } else {
    const uId = req.session.userId;
    const leftActions = req.session.userLeftActionToday;
    const maxAction = req.session.userMaxActions;
    if (leftActions == 0) {
      const err = { message: "not have enough actions allowed today" };

      const response = await axios.get(
        `http://localhost:${process.env.SERVER_PORT}/auth/logout?redirect=true&msg=${err.message}`
      );
      return res.status(500).send(response.data);
    } else {
      req.session.userLeftActionToday = leftActions - 1;

      await logActionFile.addAction({
        id: uId,
        date: getDateToday(),
        maxActions: maxAction,
        actionAllowed: req.session.userLeftActionToday,
      });

      next();
    }
  }
};

module.exports = canDoAction;
