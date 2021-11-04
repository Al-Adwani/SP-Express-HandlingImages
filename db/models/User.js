const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
    firstName: String,
    lastName: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
