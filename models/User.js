const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  profileURL: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
