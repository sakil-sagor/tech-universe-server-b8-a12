const Product = require("../models/Product");
const {
  createProductInDb,
  getProductFromDb,
  createUpvoteinDb,
  getSingleProductFromDb,
  createReviewInDb,
  findProductCreateFeadback,
} = require("../services/products.service");

// create product
exports.createProduct = async (req, res) => {
  try {
    // make the unique product id
    const getLastProd = await Product.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    const id = getLastProd?.productId;
    let productId;
    if (id) {
      productId = parseInt(id) + 1;
    } else {
      productId = 1001;
    }

    const productDetails = { ...req.body, productId };
    const createdRoom = await createProductInDb(productDetails);
    res.status(200).json({
      status: "success",
      message: "Successfully  created product",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't create product",
      error: error.message,
    });
  }
};

// get all product

exports.getAllProduct = async (req, res) => {
  try {
    const allProduct = await getProductFromDb();
    res.status(200).json({
      status: "success",
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the Products",
    });
  }
};

// get all product

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await getSingleProductFromDb(id);
    console.log("object");
    res.status(200).json({
      status: "success",
      data: singleProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the Products",
    });
  }
};

// create up vote
exports.creatUpVote = async (req, res) => {
  try {
    const { productId, userEmail } = req.body;

    const allProduct = await createUpvoteinDb(productId, userEmail);
    res.status(200).json({
      status: "success",
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the Products",
    });
  }
};
// create report
exports.createProductReport = async (req, res) => {
  try {
    const { id } = req.params;

    const allProduct = await createReviewInDb(id, req.body);
    res.status(200).json({
      status: "success",
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the Products",
    });
  }
};
// create review
exports.createProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const allProduct = await findProductCreateFeadback(id, req.body);
    res.status(200).json({
      status: "success",
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the Products",
    });
  }
};
