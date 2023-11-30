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

// all user
exports.getAllUserFormDb = async (filters, queries) => {
  const result = await User.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort({ _id: 1 });
  const totalResult = await User.countDocuments(filters);
  const pageCount = Math.ceil(totalResult / queries.limit);
  return { result, totalResult, pageCount };
};

// update roel
exports.updateRoleinDb = async (userId, role) => {
  const result = await User.updateOne(
    { _id: userId },
    { $set: { role: role } }
  );
  return result;
};
