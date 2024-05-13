const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../config/validateMongoDB");
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

/* Login User */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  /* check if user exists or not */
  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.status(200).json({
      status: true,
      message: "Logged In Successfully!",
      token: generateToken(findUser?._id),
      role: findUser?.roles,
      username: findUser?.firstname + " " + findUser?.lastname,
      user_image: findUser?.user_image,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

/* Get A User */

const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getProfile = await User.findById(id);
    res.status(200).json({ status: true, message: "User Found", getProfile });
  } catch (error) {
    throw new Error(error);
  }
});

/* Get All User */

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({
      status: true,
      message: "All Users Fetched Successfully",
      allUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Update A user profile */

const updateUser = asyncHandler(async (req, res) => {
  // console.log("updateUser ('****************** From userCtrl.js ******************')");
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res
      .status(200)
      .json({ status: true, message: "Profile Updated Successfully!", user });
  } catch (error) {
    throw new Error(error);
  }
});

/* delete a user */

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "User Deleted Successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

/* Block A User */

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isblocked: true },
      // The { new: true } option ensures that the updated user document is returned
      // By setting { new: true }, you're instructing MongoDB to return the modified document rather than
      // the original one. This means that after the update operation is completed, the block variable in your 
      // code will contain the updated user document.
      { new: true } 
    );
    res
      .status(200)
      .json({ status: true, message: "User Blocked Successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

/* Unblock A User */

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isblocked: false },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "User UnBlocked Successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

/* Update a User */

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  try {
    const user = await User.findById(_id);
    if (user && (await user.isPasswordMatched(password))) {
      throw new Error("Please provide a new password instead of old one.");
    } else {
      user.password = password;
      await user.save();
      res
        .status(200)
        .json({ status: true, message: "Password updated Successfully" });
    }
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {
  registerAUser, 
  loginUser, 
  getAllUser, 
  updateUser, 
  deleteUser, 
  getAUser,
  blockUser,
  unblockUser,
  updatePassword
}