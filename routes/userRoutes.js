const express = require("express");
const {
  registerAUser,
} = require("../controllers/userCtrl");
const userRouter = express.Router();

userRouter.post("/register", registerAUser);

module.exports = userRouter