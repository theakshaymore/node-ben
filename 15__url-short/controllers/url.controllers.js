const { nanoid } = require("nanoid/non-secure");
const Url = require("../models/url.model");

async function handleShortIdGenerator(req, res) {
  try {
    const urlId = nanoid(8);
    const { targetUrl } = req.body;

    if (!targetUrl) return res.status(400).json({ msg: "target url required" });

    const response = await Url.create({
      urlShortId: urlId,
      urlTarget: targetUrl,
    });

    // http://localhost:5001/url/mqXoZVuSxdoSztK6J72gi

    const shortUrl = `${req.protocol}://${req.get("host")}/url/${urlId}`;

    return res.status(200).json({
      msg: "sort url id generated aptly",
      shortUrl,
      data: response,
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

// async function handleShortIdRedirect(req, res) {
//   try {
//     const shortUrlId = req.params.shortId;
//     const response = await Url.findOneAndDelete(
//       { shortUrlId },
//       { urlHistory: { $push: { timestamp: Date.now() } } }
//     );

//     // res.status(200).json({
//     //   msg: "analytics updated aptly",
//     //   hits: response,
//     // })

//     res.redirect();
//   } catch (error) {
//     console.log("ERROR: ", error);

//     res.status(404).json({
//       err: "err hiting url",
//     });
//   }
// }

async function handleAnalytics(req, res) {
  const shortId = req.params.shortid;

  const response = await Url.findOne({ urlShortId: shortId });

  res.status(200).json({
    hits: response.urlHistory.length,
  });
}

module.exports = {
  handleShortIdGenerator,
  deleteAllUrls,
  handleAnalytics,
};
