const {
  createUserInDb,
  findUserInDb,
  getAllUserFormDb,
  updateRoleinDb,
} = require("../services/users.service");

// create up vote
exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

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

exports.getAllUser = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    // separate sort and make fit for data query
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    // load specific property and value ( fields)
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    // pagination
    if (req.query.page) {
      const { page = 1, limit = 3 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = limit;
    }
    const result = await getAllUserFormDb(filters, queries);
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
exports.updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const result = await updateRoleinDb(userId, role);
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
