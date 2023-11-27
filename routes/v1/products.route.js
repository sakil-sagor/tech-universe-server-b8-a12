const express = require("express");
const productsController = require("../../controllers/products.controller");

const router = express.Router();

router.route("/create").post(productsController.createProduct);

router.route("/all").get(productsController.getAllProduct);
// get user product
router.route("/all/:userEmail").get(productsController.getUserProduct);

router.route("/upvote").put(productsController.creatUpVote);
router.route("/:id").get(productsController.getSingleProduct);
router.route("/:id/report").put(productsController.createProductReport);
router.route("/:id/review").put(productsController.createProductReview);
router.route("/delteProduct").delete(productsController.deleteProduct);

module.exports = router;
