const DB = require("../configs/db");
const USERS = require("../model/user.model");
const { faker } = require("@faker-js/faker");

const total = process.argv[2] ? process.argv[2] : 5;

const SEED_USERS = async () => {
  try {
    await DB.connectToDB();

    for (let index = 0; index < total; index++) {
      const obj_user = {
        username: faker.helpers.unique(faker.internet.userName),
        password: faker.helpers.unique(faker.internet.password),
        fullname: faker.helpers.unique(faker.name.fullName),
      };
      const users = new USERS(obj_user);
      let result = await users.save();
      console.log(result);
    }

    process.exit();
  } catch (e) {
    console.log(e);
  }
};

SEED_USERS();
