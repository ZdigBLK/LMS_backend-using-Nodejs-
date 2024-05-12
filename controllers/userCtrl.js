const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");



/* Create A User */

const registerAUser = asyncHandler(async (req, res) => {
  /* Get the email from req.body and find whether a user with this email exists or not */
  const email = req.body.email;

//   res.status(200).json(email)
//   console.log(req.body);

  /* Find the user with this email get from req.body */
  const findUser = await User.findOne({ email: email });

  // res.status(200).json(!findUser)

  if (!findUser) {
    /* create a user */
    const createUser = await User.create(req.body);
    res.status(200).json({
      status: true,
      message: "User Created Successfully!",
      createUser,
    });
  } else {
    throw new Error("User Already Exists!");
  }
});

module.exports = {registerAUser}