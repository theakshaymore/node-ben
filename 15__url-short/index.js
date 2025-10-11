const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");

const urlRoutes = require("./routes/url.routes.js");
const staticRoutes = require("./routes/static.routes.js");
const { connectToMongoDB } = require("./db.js");
const Url = require("./models/url.model.js");

const PORT = 5001;
const MONGO_URL = "mongodb://127.0.0.1:27017/url-shortner";

const app = express();

app.use(
  cors({
    origin: "*", // allow all origins (use specific domains in production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectToMongoDB(MONGO_URL)
  .then(() => {
    console.log("MONGODB CONNECTED...");
  })
  .catch(() => {
    console.log("ERROR CONNECTING MONGODB!!");
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/getall", staticRoutes);

app.use("/url", urlRoutes);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const response = await Url.findOneAndUpdate(
    { urlShortId: shortId },
    { $push: { urlHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  res.redirect(response.urlTarget);
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING AT PORT ${PORT}....`);
});
