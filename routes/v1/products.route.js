const express = require("express");
const productsController = require("../../controllers/products.controller");

const router = express.Router();

router.route("/create").post(productsController.createProduct);
// get all product
router.route("/all").get(productsController.getAllProduct);
// get all product
router.route("/treading").get(productsController.gettreadingProduct);
// featured products
router.route("/featuredProducts").get(productsController.getFeaturedProducts);
// get user product
router.route("/all/:userEmail").get(productsController.getUserProduct);
// get all reported content
router.route("/reportedcontent").get(productsController.getReportedProduct);
// make up vote
router.route("/upvote").put(productsController.creatUpVote);

router.route("/:id").get(productsController.getSingleProduct);
router.route("/:id/report").put(productsController.createProductReport);
router.route("/:id/review").put(productsController.createProductReview);
router
  .route("/update")
  .delete(productsController.deleteProduct)
  .patch(productsController.makeFeatured);

module.exports = router;
