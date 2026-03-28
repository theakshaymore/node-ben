import express from "express";

const app = express();

const PORT = 8001;

app.get("/", (req, res) => {
  res.json({
    message: "route api",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
