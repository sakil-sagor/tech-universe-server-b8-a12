const { createUserInDb, findUserInDb } = require("../services/users.service");

// create up vote
exports.createUser = async (req, res) => {
  try {
    const result = await createUserInDb(req.body);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the Products",
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { userEmail } = req.params;
    console.log(userEmail);
    const result = await findUserInDb(userEmail);
    console.log(result);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the Products",
    });
  }
};
