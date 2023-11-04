const express = require("express");
const jwt = require("jsonwebtoken");
const userBll = require("../BLL/usersBLL");
require("dotenv").config();
const axios = require("axios");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const userData = req.body.loginData;
    const user = await userBll.loginUser(userData.username, userData.email);
    const userId = user.userId;
    const ACCESS_SECRET_TOKEN = process.env.JWT_ACCESS_SECRET_TOKEN;

    const accessToken = jwt.sign(
      {
        userId: userId,
        email: userData.email,
        maxActions: user.maxActions,
        role: user.role,
      },
      ACCESS_SECRET_TOKEN
    );
    req.session.userId = user.userId;
    req.session.userLeftActionToday = user.leftActionsToday;
    req.session.userMaxActions = user.maxActions;

    res.send({ accessToken, user });
  } catch (err) {
    const response = await axios.get(
      `http://localhost:${process.env.SERVER_PORT}/auth/logout?redirect=true&msg=${err.message}`
    );
    return res.status(500).send(response.data);
  }
});


router.get("/", async (req, res) => {
  try {
    const token = req.headers["jwt-access-token"];
    if(!token) {
      res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    jwt.verify(token, process.env.JWT_ACCESS_SECRET_TOKEN , async(err,user)=>{
      console.log(user)
      if(err)
      {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
      else{
        if(user.role === "admin")
        {
          const resp = await userBll.getAllUsers();
          res.send(resp)
        }
        else{
          res.status(403).json({ message:"user not have permission to this request" });
        }
      }
    }
    )
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/logout", async (req, res) => {
  const isRedirected = req.query.redirect === "true";
  if (isRedirected) {
    req.session.destroy();
    res.send({
      message: `${req.query.msg} \r\n  session is destroyed`,
      redirect: `http://localhost:${process.env.SERVER_PORT}/loginPage.html`,
    });
  } else {
    console.log(req.session.userId, req.session);
    req.session.destroy();
    res.send("logout SUCCESSFUL");
  }
});

module.exports = router;
