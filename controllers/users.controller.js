const { createUserInDb, findUserInDb } = require("../services/users.service");

// create up vote
exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    console.log(name, email, role);
    const existingUser = await findUserInDb(email);
    if (!existingUser) {
      const result = await createUserInDb(req.body);
      res.status(200).json({
        status: "success",
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get theUsers",
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const result = await findUserInDb(userEmail);
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
