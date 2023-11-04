const express = require("express");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const shiftRouter = require("./Routers/shiftRouter");
const departmentRouter = require("./Routers/departmentRouter");
const employeeRouter = require("./Routers/employeeRouter");
const empShiftRouter = require("./Routers/empShiftsRouter");
const authRouter = require("./Routers/auth");
const connectDb = require("./Config/connectDb");
const path = require('path');
const userBll = require("./BLL/usersBLL")

connectDb();
const app = express();

userBll.addInitialUsers();

//mw
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    //cookie: { maxAge: 1000 * 20 }, // time remaining in milliseconds - not required -but means that if didn’t do anything in 1000ms*20 = 20s  destroy the session
  })
);
app.use(express.static('Views'));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));


app.use("/auth", authRouter);
app.use("/shift", shiftRouter);
app.use("/department", departmentRouter);
app.use("/employee", employeeRouter);
app.use("/empShifts", empShiftRouter);





app.listen(process.env.SERVER_PORT, () => {
  console.log("app listening on port " + process.env.SERVER_PORT);
});
