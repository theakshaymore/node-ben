const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hellow Expresss !");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.listen(5000, () => {
  console.log("Server is running....");
});
