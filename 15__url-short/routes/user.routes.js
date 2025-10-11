const express = require("express");
const {
  handleAddUser,
  handleLoginUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", handleAddUser);

router.post("/login", handleLoginUser);

module.exports = router;
