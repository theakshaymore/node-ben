import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./utils/db.js";

// custom imports
import userRoute from "./routes/user.route.js";
import { isAuthenticated } from "./middlewares/auth.middleware.js";

const app = express();

// constant variables
const PORT = 7800;
const MONGO_URL = "mongodb://127.0.0.1:27017/everblog";

// DB connect
await connectToDB(MONGO_URL)
  .then(() => {
    console.log(`DB CONNECTED SUCCESSFULLY...!`);
  })
  .catch((err) => {
    console.log(`ERROR CONNECTING DB...!`, err);
  });

// server-side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/api/", isAuthenticated("token"), (req, res) => {
  res
    .json({
      user: req.user,
    })
    .send("Welcome to homepage");
});

app.use("/api/user", userRoute);

// running
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}.....`);
});
