const { default: slugify } = require("slugify");
const TutotrialCategory = require("../models/tutoCategory.js");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongoDB.js");

const postTutorialCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
      console.log(req.body.slug);
    }
    const postTutCat = await TutotrialCategory.create(req.body);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Created Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllTutCategories = asyncHandler(async (req, res) => {
  try {
    const alltutcat = await TutotrialCategory.find();
    res.status(200).json({
      status: true,
      message: "Tutorials Category Fetched",
      alltutcat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getATutCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findTutCat = await TutotrialCategory.findById(id);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Found!",
      findTutCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteATutCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteTutCat = await TutotrialCategory.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Deleted!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateATutCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateTutCat = await TutotrialCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Tutorial Category Updated!",
      updateTutCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postTutorialCategory,
  getAllTutCategories,
  getATutCat,
  deleteATutCat,
  updateATutCat
};