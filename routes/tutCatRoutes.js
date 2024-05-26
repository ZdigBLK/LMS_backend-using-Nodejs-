const { postTutorialCategory, getAllTutCategories, getATutCat, updateATutCat, deleteATutCat } = require("../controllers/tutCatCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const tutCatRouter = require("express").Router();

tutCatRouter.post("/post", authMiddleware ,postTutorialCategory)
tutCatRouter.get("/", getAllTutCategories)
tutCatRouter.get("/:id", authMiddleware, getATutCat)
tutCatRouter.put("/:id", authMiddleware, updateATutCat)
tutCatRouter.delete("/:id", authMiddleware, deleteATutCat)


module.exports = {tutCatRouter}