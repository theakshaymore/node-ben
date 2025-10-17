const express = require("express");
const {
  handleSignupUser,
  handleLoginUser,
  handleMe,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", handleSignupUser);

router.post("/login", handleLoginUser);

// TODO:
router.get("/me", handleMe);

module.exports = router;
