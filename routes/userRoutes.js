const express = require("express");
const {
  registerAUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser
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

/* All DELETE Routes */
userRouter.delete("/:id", authMiddleware, deleteUser);




module.exports = userRouter