const Product = require("../models/Product");
const { createProductInDb } = require("../services/products.service");

exports.createProduct = async (req, res) => {
  try {
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
    console.log(productDetails);
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
