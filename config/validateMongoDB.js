const mongoose = require("mongoose");
const validateMongodbId = (id) => {
  console.log("validateMongodbId ('****************** From validateMongoDB.js ******************')");

  const isvalid = mongoose.Types.ObjectId.isValid(id);
  if (!isvalid) throw new Error("This Id is not valid or not found.");
};
module.exports = validateMongodbId;