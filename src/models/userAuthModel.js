const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },

  },

  { collection: "user", versionKey: false }
);

const User = mongoose.model("user", userAuthSchema);

module.exports = User;
