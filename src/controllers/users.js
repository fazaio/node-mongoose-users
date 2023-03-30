const DB = require("../configs/db");
const USERS = require("../model/user.model");
const middleware = require("../configs/middleware");

const LOGIN_USER = async (req, res) => {
  try {
    let data = {};
    data.username = req.body.username;
    data.password = req.body.password;

    // await DB.connectToDB();
    let result = await USERS.findOne(data);

    if (result) {
      let token = await middleware.generateToken(result);
      res.send(token);
    } else {
      res.send("username/password is failed!");
    }
  } catch (e) {
    res.status(401).send("failed login!");
  }
};

const READS_USERS = async (req, res) => {
  try {
    const page = {
      page: req.query.page,
      limit: req.query.limit,
    };

    let results = await USERS.find().skip(page.page).limit(page.limit);

    res.send(results);
  } catch (e) {
    console.log(e);
    res.status(400).send("Bad Request");
  }
};

const CREATES_USERS = async (req, res) => {
  try {
    // await DB.connectToDB();
    let isExist = await USERS.findOne({ username: req.body.username });

    if (isExist) throw "User Already Exist";

    const users = new USERS({
      username: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname,
    });

    let result = await users.save();

    res.send(result);
  } catch (e) {
    if (e == "User Already Exist") res.status(409).send("User Already Exist");
    else res.status(400).send("Bad Request");
  }
};

const UPDATE_USERS = async (req, res) => {
  try {
    // await DB.connectToDB();
    if (!req.body) throw new Error("Data update is required!");

    const id = req.params.id;

    let result = await USERS.findByIdAndUpdate(id, req.body);

    res.send(result);
  } catch (e) {
    let err = e ? e : "Bad Request";
    res.status(400).send(err);
  }
};

const DELETE_USERS = async (req, res) => {
  try {
    // await DB.connectToDB();
    if (!req.body) throw new Error(false);

    const id = req.params.id;

    let result = await USERS.findByIdAndDelete(id);

    res.send(result);
  } catch (e) {
    let err = e ? e : "Bad Request";
    res.status(400).send(err);
  }
};

module.exports = {
  READS_USERS,
  CREATES_USERS,
  UPDATE_USERS,
  DELETE_USERS,
  LOGIN_USER,
};
