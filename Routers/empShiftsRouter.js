const express = require("express");
const empShiftBLL = require("../BLL/employeeShiftBLL")
const verifyToken = require("../CostumeMw/jwtVerify");
const canDoAction = require("../CostumeMw/allowedAction");

const router = express.Router();

router.use(verifyToken);
router.use(canDoAction);

router.post("/", async (req, res) => {
    try {
      const empShiftData = req.body.empShiftData;
      const result = await empShiftBLL.addEmpShift(empShiftData);
      res.send(result);
    } catch (err) {
      res.status(501).send(err);
    }
  });
  
  
  router.get("/:fetchWay", async (req, res) => {
    try {
      const { fetchWay } = req.params;
      if (!empShiftBLL[fetchWay]) {
        // Check if the function with the provided name exists
        res.status(404).send(`Function '${fetchWay}' not found.`);
        return;
      }
  
      const result = await empShiftBLL[fetchWay]();
      res.send(result);
    } catch (err) {
      res.status(501).send(err);
    }
  });
  
  //delete by employeeShiftId
  router.delete("/:id", async (req, res) => {
    try {
      const empShiftId = req.params.id;
      const result = await empShiftBLL.deleteEmpShift(empShiftId);
      res.send(result);
    } catch (err) {
      res.status(501).send(err);
    }
  });

 

  module.exports = router;