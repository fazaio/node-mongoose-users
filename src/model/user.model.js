const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    fullname: String,
  },
  {
    timestamps: true,
  }
);

mongoose.set("strictQuery", false);
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
