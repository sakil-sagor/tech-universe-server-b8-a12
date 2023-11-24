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
    upvotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
    report: [
      {
        email: {
          type: String,
        },
        reportText: {
          type: String,
        },
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
        name: {
          type: String,
          default: "",
        },
        description: {
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
