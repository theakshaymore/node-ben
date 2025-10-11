const express = require("express");

const urlRoutes = require("./routes/url.routes.js");

const PORT = 5001;
const MONGO_URL = "mongodb://127.0.0.1:27017/url-shortner";

const app = express();

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`APP IS RUNNING AT PORT ${PORT}....`);
});
