const express = require("express");
const {
  handleShortIdGenerator,
  deleteAllUrls,
  handleAnalytics,
} = require("../controllers/url.controllers.js");

const router = express.Router();

router.get("/", handleShortIdGenerator);

router.get("/analytics/:shortid", handleAnalytics);

// router.get("/:shortId", handleShortIdRedirect);

router.delete("/", deleteAllUrls);

module.exports = router;
