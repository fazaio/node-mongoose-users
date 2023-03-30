require("dotenv").config();
const express = require("express");
const cors = require("cors");
const users = require("./src/router/users");
const auth = require("./src/router/auth");
const DB = require("./src/configs/db");
const paginate = require("express-paginate");

const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(paginate.middleware(10, 50));

app.get("/", (req, res) => {
  res.send(
    "Visit: https://github.com/fazaio/node-mongoose-users <br> API Documentation"
  );
});

app.use("/auth", auth);
app.use("/users", users); // user router

app.listen(3000, async () => {
  await DB.connectToDB();
  console.log(`Example app listening on port 3000`);
});
