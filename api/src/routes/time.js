const express = require("express");
const router = express.Router();

/* GET Systems current Epoch time as request is processed. */
router.get("/time", function (req, res, next) {
  const currentTime = Math.round(new Date().getTime() / 1000);
  res.send({ time: currentTime });
});

module.exports = router;
