const express = require("express");
const connectToMongo = require("./db");
const userRouter = require("./routes/user.route");

const MONGO_URL = "mongodb://127.0.0.1:27017/chai-app1";
const PORT = 3000;

const app = express();

// SECTION: DB Connection
connectToMongo(MONGO_URL)
  .then(() => {
    console.log("MONGODB CONNECTED SUCCESSFULY ...!");
  })
  .catch((err) => {
    console.log("ERROR IN CONNECTING MONGODB...", err);
  });

// SECTION: Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SECTION: Routes
app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.use("/api/users", userRouter);

// SECTION: Others

app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT}....`);
});
