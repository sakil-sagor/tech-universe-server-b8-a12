const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/").post(usersController.createUser);

module.exports = router;
