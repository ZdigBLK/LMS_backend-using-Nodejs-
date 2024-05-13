const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


const authMiddleware = asyncHandler(async (req, res, next) => {
  // console.log("authMiddleware ('****************** From authMiddleware.js ******************')");
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorised, Please Login Again");
    }
  } else {
    throw new Error("There is no token attached to the header...");
  }
});

const isInstructor = asyncHandler(async (req, res, next) => {
    const {email} = req.user;
    const isInstructor = await User.findOne({ email: email})
    if(isInstructor.roles !== "instructor") {
        throw new Error("Sorry, YOU ARE ............ NOT THE FATHER (instructor)")
    } else {
        next()
    }
})

module.exports = { authMiddleware, isInstructor };