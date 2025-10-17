const express = require("express");
const {
  handleSignupUser,
  handleLoginUser,
  handleMe,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", handleSignupUser);

router.post("/login", handleLoginUser);

// REMOVE-LATER:
router.get("/me", handleMe);

router.post("/_ping", (req, res) => res.json({ ok: true }));

module.exports = router;
