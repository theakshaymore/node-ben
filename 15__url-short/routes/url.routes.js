const express = require("express");
const {
  handleShortIdGenerator,
  deleteAllUrls,
  handleAnalytics,
  handleGetAllUrls,
} = require("../controllers/url.controllers.js");
const { isAuthenticated, isAdmin } = require("../middleware/authorization.js");

const router = express.Router();

router.post("/", isAuthenticated, handleShortIdGenerator);

router.get("/analytics/:shortid", isAuthenticated, handleAnalytics);

// router.get("/:shortId", handleShortIdRedirect);

router.delete("/", isAuthenticated, deleteAllUrls);

// TODO:
router.get("/", isAuthenticated, (req, res) => {
  res.json({
    msg: "you're in /url get route",
  });
});

// TODO:
router.get("/admin", isAuthenticated, isAdmin, handleGetAllUrls);

module.exports = router;
