const mongoose = require("mongoose");

const UserReg = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserRegistration = mongoose.model("Users", UserReg);
module.exports = UserRegistration;
