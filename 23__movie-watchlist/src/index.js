import express from "express";

// routes imports
import movieRoutes from "./routes/movies.route.js";

const app = express();

const PORT = 8001;

app.get("/", (req, res) => {
  res.json({
    message: "route api",
  });
});

app.use("/movie", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
