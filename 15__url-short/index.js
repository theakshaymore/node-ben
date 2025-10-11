const express = require("express");

const urlRoutes = require("./routes/url.routes.js");
const { connectToMongoDB } = require("./db.js");

const PORT = 5001;
const MONGO_URL = "mongodb://127.0.0.1:27017/url-shortner";

const app = express();

app.use(express.json());

connectToMongoDB(MONGO_URL)
  .then(() => {
    console.log("MONGODB CONNECTED...");
  })
  .catch(() => {
    console.log("ERROR CONNECTING MONGODB!!");
  });

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`APP IS RUNNING AT PORT ${PORT}....`);
});
