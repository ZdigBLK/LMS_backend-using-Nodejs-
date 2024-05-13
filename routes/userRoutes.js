const express = require("express");
const {
  registerAUser,
  loginUser,
  getAllUser,
  updateUser
} = require("../controllers/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();


/* All POST Routes */
userRouter.post("/register", registerAUser);
userRouter.post("/login", loginUser);

/* All GET Routes */
userRouter.get("/users", getAllUser);

/* All PUT Routes */
userRouter.put("/update-profile", authMiddleware, updateUser);



module.exports = userRouter