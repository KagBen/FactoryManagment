const express = require("express");
const shiftBLL = require("../BLL/shiftBLL");
const verifyToken = require("../CostumeMw/jwtVerify");
const canDoAction = require("../CostumeMw/allowedAction");

const router = express.Router();

router.use(verifyToken);
router.use(canDoAction);

router.get("/", async (req, res) => {
  try {
    const result = await shiftBLL.getShift();
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const shiftData = req.body.shiftData;
    const result = await shiftBLL.addShift(shiftData);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const shiftData = req.body.shiftData;
    const shiftId = req.params.id;
    const result = await shiftBLL.updateShift(shiftId, shiftData);
    res.send(result);
  } catch (err) {
    res.status(501).send(err);
  }
});

module.exports = router;
