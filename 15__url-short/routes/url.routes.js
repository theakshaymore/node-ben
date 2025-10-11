const express = require("express");
const { handleShortIdGenerator } = require("../controllers/url.controllers.js");

const router = express.Router();

router.get("/", handleShortIdGenerator);

module.exports = router;
