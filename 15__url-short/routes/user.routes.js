const express = require("express");
const {
  handleSignupUser,
  handleLoginUser,
} = require("../controllers/user.controller");
const { isAuthenticated, isAdmin } = require("../middleware/authorization");

const router = express.Router();

router.post("/signup", handleSignupUser);

router.post("/login", handleLoginUser);

router.get("/whoami", isAuthenticated, isAdmin, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
