const express = require("express");
const productsController = require("../../controllers/products.controller");

const router = express.Router();

router.route("/create").post(productsController.createProduct);

module.exports = router;
