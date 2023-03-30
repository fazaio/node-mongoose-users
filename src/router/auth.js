const router = require("express").Router();
const users = require("../controllers/users");

router.post("/signup", users.CREATES_USERS);
router.post("/login", users.LOGIN_USER);

module.exports = router;
