const Product = require("../models/Product");

exports.createProduct = async (detials) => {
  const result = await Product.create(detials);
  return result;
};
