const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    originName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    costingPrice: {
      type: Number,
      required: true,
    },
    offerRate: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      validate: {
        validator: (value) =>
          validator.isURL(value, {
            protocols: ["http", "https"],
            require_tld: true,
            require_protocol: true,
          }),

        message: "Invalid image URL",
      },
      required: true,
    },
    ownerInfo: {
      ownerName: {
        type: String,
        required: true,
      },
      ownerImage: {
        type: String,
        validate: {
          validator: (value) =>
            validator.isURL(value, {
              protocols: ["http", "https"],
              require_tld: true,
              require_protocol: true,
            }),
          message: "Invalid image URL",
        },
        required: true,
      },
      ownerEmail: {
        type: String,
        required: true,
      },
    },
    tags: [
      {
        id: {
          type: String,
        },
        text: {
          type: String,
        },
        _id: false,
      },
    ],

    externalLink: {
      type: String,
      required: true,
    },
    upvotes: [
      {
        type: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "active", "reject"],
      default: "pending",
    },
    report: [
      {
        email: {
          type: String,
        },
        reportText: {
          type: String,
        },
        _id: false,
      },
    ],

    review: [
      {
        image: {
          type: String,
          validate: {
            validator: (value) =>
              validator.isURL(value, {
                protocols: ["http", "https"],
                require_tld: true,
                require_protocol: true,
              }),
            message: "Invalid image URL",
          },
        },
        userName: {
          type: String,
          default: "",
        },
        feadback: {
          type: String,
          default: "",
        },
        userImage: {
          type: String,
          default: "",
        },
        rating: {
          type: Number,
          default: 0,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
