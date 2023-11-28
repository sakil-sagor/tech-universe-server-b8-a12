const Product = require("../models/Product");
const {
  createProductInDb,
  getProductFromDb,
  createUpvoteinDb,
  getSingleProductFromDb,
  createReviewInDb,
  findProductCreateFeadback,
  getUserProductFromDb,
  deleteProductInDb,
  makeFeaturedInDb,
  getReportedProductInDb,
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
    let filters = { ...req.query };
    const excludeFields = ["limit", "sort", "page", "fields", "search"];
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
    const allProduct = await getProductFromDb(filters, queries);
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

// get single product

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await getSingleProductFromDb(id);

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
// get user products

exports.getUserProduct = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const singleProduct = await getUserProductFromDb(userEmail);
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
// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.query;
    const allProduct = await deleteProductInDb(productId);
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
// make  product featured
exports.makeFeatured = async (req, res) => {
  try {
    const { productId } = req.query;
    const allProduct = await makeFeaturedInDb(productId);
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
// Reported  product
exports.getReportedProduct = async (req, res) => {
  try {
    const allProduct = await getReportedProductInDb();
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
