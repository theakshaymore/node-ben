const express = require("express");
const {
  handleSignupUser,
  handleLoginUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", handleSignupUser);

router.post("/login", handleLoginUser);

module.exports = router;
