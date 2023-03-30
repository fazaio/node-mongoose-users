const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ");
    jwt.verify(token[1], "eyJ1c2VybmFtZSI6ImFkbWluIn0", (err) => {
      if (err) return res.status(401).json("Unauthorize!");
      next();
    });
  } catch (e) {
    res.status(400).json("Bad Request!");
  }
};

const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: payload }, "eyJ1c2VybmFtZSI6ImFkbWluIn0", (err, res) => {
      if (err) reject();
      resolve(res);
    });
  });
};

module.exports = { isAuth, generateToken };
