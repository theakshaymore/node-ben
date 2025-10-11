const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    urlShortId: {
      type: String,
      required: true,
      unique: true,
    },

    urlTarget: {
      type: String,
      required: true,
    },

    urlHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const Url = mongoose.model("url", urlSchema);

module.exports = Url;
