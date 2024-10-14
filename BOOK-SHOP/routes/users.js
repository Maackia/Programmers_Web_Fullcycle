const express = require("express");
const router = express.Router();
const conn = require("../db");

const { join, login, passwordReset, requestPasswordReset } = require("../controller/UserController");

router.use(express.json());

// join
router.post("/join", join);

// login
router.post("/login", login);
// reset password request
router.post("/reset", requestPasswordReset);
// reset password
router.put("/reset", passwordReset);

module.exports = router;
