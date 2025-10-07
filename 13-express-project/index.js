const express = require("express");
const { default: connectToMongo } = require("./db");

const MONGO_URL = "mongodb://127.0.0.1:27017/chai-app1";

const app = express();

// SECTION: DB Connection
connectToMongo(MONGO_URL)
  .then(() => {
    console.log("MONGODB CONNECTED SUCCESSFULY ...!");
  })
  .catch((err) => {
    console.log("ERROR IN CONNECTING MONGODB...", err);
  });

// SECTION: Schemas

// SECTION: Middleware
app.use(express.urlencoded({ extended: false }));
// IMP:
app.use(express.json());

// SECTION: Routes
app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.get("/api/users", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ msg: "Users fetched successful", user });
  } catch (err) {
    res.status(400).json({
      err: "Not able to fetch users",
    });
  }
});

app.post("/api/users", async (req, res) => {
  const { firstname, lastname, email, jobtitle, gender } = req.body;
  //   userData.push({ ...body, id: userData.length + 1 });
  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      jobtitle,
      gender,
    });
    res.status(201).json({
      msg: "User created successfully",
      userid: user._id,
    });
  } catch (err) {
    res.status(400).json({
      err: "Error creating user",
    });
  }
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    try {
      const userid = req.params.id;
      const user = await User.findById(userid);
      res.status(200).json({
        msg: "Fetched used successfully",
        user,
      });
    } catch (err) {
      res.status(400).json({
        msg: "Error getching user",
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const userid = req.params.id;
      const { firstname, lastname, email, jobtitle, gender } = req.body;
      const user = await User.findOneAndUpdate(
        { _id: userid },
        { firstname, lastname, email, jobtitle, gender },
        { new: true }
      );
      !user
        ? res.status(400).json({
            msg: "no user found with id",
          })
        : res.status(200).json({
            msg: "user updated aptly",
            user,
          });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err: "error in user updation",
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const user_id = req.params.id;
      const user = await User.findOneAndDelete({ _id: user_id });
      !user
        ? res.status(400).json({
            msg: "user not found with id",
          })
        : res.status(200).json({
            msg: "user deleted aptly",
            user,
          });
    } catch (err) {
      res.status(400).json({
        msg: "error deleted user",
      });
    }
  });

// SECTION: Others
const port = 3000;

app.listen(port, () => {
  console.log(`SERVER IS LISTENING ON PORT ${port}....`);
});
