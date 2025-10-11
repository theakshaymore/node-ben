const { nanoid } = require("nanoid");
const Url = require("../models/url.model");

async function handleShortIdGenerator(req, res) {
  try {
    const urlId = nanoid();

    const { targetUrl } = req.body;
    if (!targetUrl) return res.status(400).json({ msg: "target url required" });

    const response = await Url.create({
      urlShortId: urlId,
      urlTarget: targetUrl,
      urlHistory: { $push: { timestamp: Date.now() } },
    });

    return res.status(200).json({
      msg: "sort url id generated aptly",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      err: "not able to generate short url id",
    });
  }
}

async function deleteAllUrls(req, res) {
  try {
    await Url.deleteMany({});
    return res.status(200).json({
      msg: "all data deleted",
    });
  } catch (error) {
    res.status(400).json({
      err: "not able to delete all data",
    });
  }
}
module.exports = { handleShortIdGenerator, deleteAllUrls };
