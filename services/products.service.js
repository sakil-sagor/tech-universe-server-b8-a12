const Product = require("../models/Product");
// create single product
exports.createProductInDb = async (detials) => {
  const result = await Product.create(detials);
  return result;
};
// get all products
exports.getProductFromDb = async (filters, queries) => {
  const result = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit);
  // .sort(queries.sortBy);
  const totalRoom = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalRoom / queries.limit);
  return { result, totalRoom, pageCount };
};

// get single products
exports.getSingleProductFromDb = async (id) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

// get user products
exports.getUserProductFromDb = async (userEmail) => {
  const result = await Product.find({ "ownerInfo.ownerEmail": `${userEmail}` });
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
  const result = await Product.updateOne(
    { _id: id },
    { $addToSet: { report: { $each: [newreport] } } }
  );
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
// delete product
exports.deleteProductInDb = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};
