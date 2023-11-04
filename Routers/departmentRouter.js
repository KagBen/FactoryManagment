const express = require("express");
require("dotenv").config();
const depBLL = require("../BLL/departmentBLL");
const verifyToken = require("../CostumeMw/jwtVerify");
const canDoAction = require("../CostumeMw/allowedAction");

const router = express.Router();

router.use(verifyToken);
router.use(canDoAction);

router.get("/", async (req, res) => {
  try {
    console.log(req.user);
    const result = await depBLL.getDepartmentsWithManagers();
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const depData = req.body.depData;
    const result = await depBLL.addDepartments(depData);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const depData = req.body.depData;
    const depId = req.params.id;
    const result = await depBLL.updateDepartments(depId, depData);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const depId = req.params.id;
    const result = await depBLL.deleteDep(depId);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

module.exports = router;
