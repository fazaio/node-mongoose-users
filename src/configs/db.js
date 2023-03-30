const mongoose = require("mongoose");

const url = "mongodb+srv://aux:mongo123@cluster0.jo8pywx.mongodb.net/impstudio";

module.exports = {
  connectToDB: async () => {
    try {
      await mongoose.connect(url);
      console.log("connected!");
    } catch (err) {
      console.log("Err", err);
    }
  },
};
