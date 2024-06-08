const mongoose = require("mongoose");

// a model for the user registration
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

// export the final model
const UserRegistration = mongoose.model("Users", UserReg);
module.exports = UserRegistration;
