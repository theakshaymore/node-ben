import express from "express";

const app = express();

const PORT = 8007;

app.get("/", (req, res) => {
  res.send("root api");
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
