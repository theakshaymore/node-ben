const express = require("express");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.get("/data", async (req, res) => {
  try {
    const response = await fetch("https://akshaymore.com/rest.json");
    const data = await response.json();
    //     console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ err: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT}....`);
});
