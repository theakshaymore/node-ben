const express = require("express");
const {
  handleShortIdGenerator,
  deleteAllUrls,
  handleAnalytics,
} = require("../controllers/url.controllers.js");
const { isAuthenticated } = require("../middleware/authorization.js");

const router = express.Router();

router.post("/", isAuthenticated, handleShortIdGenerator);

router.get("/analytics/:shortid", isAuthenticated, handleAnalytics);

// router.get("/:shortId", handleShortIdRedirect);

router.delete("/", isAuthenticated, deleteAllUrls);

// REMOVE-LATER:
router.get("/", isAuthenticated, (req, res) => {
  res.json({
    msg: "you're in /url get route",
  });
});

module.exports = router;
