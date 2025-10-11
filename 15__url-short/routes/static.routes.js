const express = require("express");
const { handleGetAllUrls } = require("../controllers/url.controllers");

const router = express.Router();

router.post("/", handleGetAllUrls);

module.exports = router;
