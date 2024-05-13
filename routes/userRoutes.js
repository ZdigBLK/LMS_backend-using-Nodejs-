const express = require("express");
const {
  registerAUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
  getAUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword
} = require("../controllers/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();


/* All POST Routes */
userRouter.post("/register", registerAUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordToken);

/* All GET Routes */
userRouter.get("/users", getAllUser);
userRouter.get("/:id", authMiddleware, getAUser);

/* All PUT Routes */
userRouter.put("/update-profile", authMiddleware, updateUser);
userRouter.put("/block/:id", authMiddleware, blockUser);
userRouter.put("/unblock/:id", authMiddleware, unblockUser);
userRouter.put("/update-password", authMiddleware, updatePassword);
userRouter.put("/reset-password/:token", authMiddleware, resetPassword);

/* All DELETE Routes */
userRouter.delete("/:id", authMiddleware, deleteUser);




module.exports = userRouter