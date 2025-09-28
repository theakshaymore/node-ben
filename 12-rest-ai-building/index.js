const express = require("express");
const userData = require("./MOCK_DATA.json");

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to root");
});

app.get("/api/users", (req, res) => {
  res.json(userData);
});

app.get("/api/users/1", (req, res) => {
  res.send("users 1 api route");
});

const port = 5000;

app.listen(port, () => {
  console.log(`SERVER IS LISTENING ON PORT ${port}....`);
});
