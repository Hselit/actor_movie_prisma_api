import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Welcome to Movie Actor WebPage");
});

export default router;
