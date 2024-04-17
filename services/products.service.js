const Product = require("../models/Product");
// create single product
exports.createProductInDb = async (detials) => {
  const result = await Product.create(detials);

  return result;
};
// get all products
exports.getProductFromDb = async (filters, queries) => {
  const result = await Product.aggregate([
    {
      $match: {
        "tags.text": filters, // Match the text property
      },
    },

    {
      $skip: queries.skip, // Skip documents based on pagination
    },
    {
      $limit: parseInt(queries.limit), // Limit the number of documents returned
    },
  ]);
  const totalRoom = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalRoom / queries.limit);

  return { result, totalRoom, pageCount };
};

exports.getProductWitoutSearchFromDb = async (queries) => {
  const result = await Product.find({}).skip(queries.skip).limit(queries.limit);

  const totalRoom = await Product.countDocuments({});
  const pageCount = Math.ceil(totalRoom / queries.limit);

  return { result, totalRoom, pageCount };
};

// get single products
exports.getSingleProductFromDb = async (id) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
// get featured products
exports.getFeaturedInDb = async () => {
  const result = await Product.find({ featured: true }).sort({ createdAt: -1 });

  return result;
};
// get treading products
exports.getTreadingProductFromDb = async () => {
  const result = await Product.aggregate([
    {
      $addFields: {
        upvotesCount: { $size: "$upvotes" },
      },
    },
    {
      $sort: { upvotesCount: -1 },
    },
    {
      $limit: 6,
    },
  ]);
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
// make  product featured
exports.makeFeaturedInDb = async (productId) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: { featured: true } }
  );
  return result;
};
// update products
exports.putUpdateProductinDb = async (productId, details) => {
  const result = await Product.updateOne({ _id: productId }, { $set: details });
  return result;
};

// all product for review page
exports.getProductsForReviewfromDb = async (filters, queries) => {
  const result = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort({ status: 1 });
  const totalResult = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalResult / queries.limit);
  return { result, totalResult, pageCount };
};

// Reported  product
exports.getReportedProductInDb = async () => {
  const result = await Product.aggregate([
    {
      $project: {
        productName: 1,
        productId: 1,
        reportLength: { $size: "$report" },
      },
    },
    {
      $match: {
        reportLength: { $gt: 0 },
      },
    },
  ]);
  return result;
};

// make Active Status
exports.makeActiveStatusinDb = async (productId) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: { status: "active" } }
  );

  return result;
};

// make Reject Status
exports.makeRejectStatusinDb = async (productId) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: { status: "reject" } }
  );

  return result;
};
