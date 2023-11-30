const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/").post(usersController.createUser);
router.route("/").get(usersController.getAllUser);
router.route("/:userEmail").get(usersController.getUser);
router.route("/updateRole").patch(usersController.updateRole);

module.exports = router;
