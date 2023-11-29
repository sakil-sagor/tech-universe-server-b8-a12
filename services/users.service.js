const User = require("../models/User");

// create single User
exports.createUserInDb = async (detials) => {
  const result = await User.create(detials);
  return result;
};
exports.findUserInDb = async (userEmail) => {
  const result = await User.findOne({ email: userEmail });
  return result;
};
