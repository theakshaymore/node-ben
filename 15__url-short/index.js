const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");

const urlRoutes = require("./routes/url.routes.js");
const staticRoutes = require("./routes/static.routes.js");
const userRoutes = require("./routes/user.routes.js");
const { connectToMongoDB } = require("./db.js");
const Url = require("./models/url.model.js");
const { isAuthenticated } = require("./middleware/authorization.js");

// SECTION:: Constant variables
const PORT = 5002;
const MONGO_URL = "mongodb://127.0.0.1:27017/url-shortner";

const app = express();

// SECTION:: middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// SECTION: DB connection
connectToMongoDB(MONGO_URL)
  .then(() => {
    console.log("MONGODB CONNECTED...");
  })
  .catch(() => {
    console.log("ERROR CONNECTING MONGODB!!");
  });

// SECTION: server side rendering
// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

// SECTION: routes
// app.get("/", (req, res) => {
//   res.redirect("/api/url");
// });

// app.get("/api/getall", staticRoutes);

app.use("/api/url", urlRoutes);

// app.get("/api/url/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;

//   const response = await Url.findOneAndUpdate(
//     { urlShortId: shortId },
//     { $push: { urlHistory: { timestamp: Date.now() } } },
//     { new: true }
//   );

//   res.redirect(response.urlTarget);
// });

app.use("/api/auth", userRoutes);

// SECTION: start the server
app.listen(PORT, () => {
  console.log(`APP IS RUNNING AT PORT ${PORT}....`);
});
