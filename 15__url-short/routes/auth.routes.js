const express = require("express");

const isAuthorized = require("../middleware/authorization.js");

const router = express.Router();

router.get("/me", isAuthorized, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
