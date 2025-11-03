const express = require("express");
const path = require("path");

const app = express();

const PORT = 7000;

// server-side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}.....`);
});
