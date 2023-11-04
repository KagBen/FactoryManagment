const express = require("express");
const empBLL = require("../BLL/employeeBLL");
const verifyToken = require("../CostumeMw/jwtVerify");
const canDoAction = require("../CostumeMw/allowedAction");

const router = express.Router();

router.use(verifyToken);
router.use(canDoAction);

router.post("/", async (req, res) => {
  try {
    const empData = req.body.empData;
    const result = await empBLL.createEmployees(empData);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await empBLL.getEmployees();
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

router.get("/:depId", async (req, res) => {
  try {
    const { depId } = req.params;
    const result = await empBLL.findEmployeesNotInDep(depId);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const empData = req.body.empData;
    const empId = req.params.id;
    const result = await empBLL.updateEmployee(empId, empData);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const empId = req.params.id;
    const result = await empBLL.deleteEmployee(empId);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

module.exports = router;
