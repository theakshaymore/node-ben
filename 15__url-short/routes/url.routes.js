const express = require("express");
const {
  handleShortIdGenerator,
  deleteAllUrls,
  handleShortIdRedirect,
} = require("../controllers/url.controllers.js");

const router = express.Router();

router.get("/", handleShortIdGenerator);

// router.get("/:shortId", handleShortIdRedirect);

router.delete("/", deleteAllUrls);

module.exports = router;
