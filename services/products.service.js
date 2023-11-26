const Product = require("../models/Product");
// create single product
exports.createProductInDb = async (detials) => {
  const result = await Product.create(detials);
  return result;
};
// get all products
exports.getProductFromDb = async () => {
  const result = await Product.find({});
  return result;
};
// get all products
exports.getSingleProductFromDb = async (id) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

// upvote a product
exports.createUpvoteinDb = async (productId, userEmail) => {
  const result = await Product.updateOne(
    { productId: productId },
    { $addToSet: { upvotes: { $each: [userEmail] } } }
  );
  return result;
};

// create report

exports.createReviewInDb = async (id, newreport) => {
  console.log(id, newreport);
  const result = await Product.updateOne(
    { _id: id },
    { $addToSet: { report: { $each: [newreport] } } }
  );
  console.log(result);
  return result;
};
// create review

exports.findProductCreateFeadback = async (id, feadback) => {
  const result = await Product.updateOne(
    { _id: id },
    { $push: { review: feadback } }
  );
  return result;
};
