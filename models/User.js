const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
