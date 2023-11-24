const Product = require("../models/Product");

exports.createProductInDb = async (detials) => {
  const result = await Product.create(detials);
  return result;
};
