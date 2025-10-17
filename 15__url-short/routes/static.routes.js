const express = require("express");
const { handleGetAllUrls } = require("../controllers/url.controllers");

const router = express.Router();

router.get("/", handleGetAllUrls);

module.exports = router;
