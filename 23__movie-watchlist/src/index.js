import express from "express";

const app = express();

const PORT = 4009;

app.listen(PORT, () => {
  console.log(`Server is runningg at port ${PORT}`);
});
