import { config } from "dotenv";
import express from "express";
import { prisma, connectDB, disconnectDB } from "./config/db.js";

// routes imports
import movieRoutes from "./routes/movies.route.js";

config();
connectDB();

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
