const express = require("express");
const {
  handleShortIdGenerator,
  deleteAllUrls,
} = require("../controllers/url.controllers.js");

const router = express.Router();

router.get("/", handleShortIdGenerator);

router.delete("/", deleteAllUrls);

module.exports = router;
