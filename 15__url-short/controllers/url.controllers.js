const { nanoid } = require("nanoid");

async function handleShortIdGenerator(req, res) {
  const urlId = nanoid();
  return res.json({
    urlId,
  });
}

module.exports = { handleShortIdGenerator };
