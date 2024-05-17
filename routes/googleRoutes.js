const googleRouter = require("express").Router();
const passport = require("passport");
const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

googleRouter.get(
  "/login/success",
  expressAsyncHandler(async (req, res) => {})
);

googleRouter.get(
  "/login/failed",
  expressAsyncHandler(async (req, res) => {
    res.status(401).json({ status: false, message: "login failed" });
  })
);

googleRouter.get(
  "/google",
  passport.authenticate("google", ["profile", "email"])
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

googleRouter.get(
  "/logout",
  expressAsyncHandler(async (req, res) => {
    req.logOut();
    res.redirect("/");
  })
);
module.exports = googleRouter;