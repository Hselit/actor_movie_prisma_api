import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("<br><h2><center>Welcome to Movie Actor API<center></h2>");
});

export default router;
