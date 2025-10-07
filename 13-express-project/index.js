const express = require("express");
const mongoose = require("mongoose");

const app = express();

// SEC:DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/chai-app1")
  .then(() => {
    console.log("MONGODB CONNECTED SUCCESSFULY ...!");
  })
  .catch((err) => {
    console.log("ERROR IN CONNECTING MONGODB...", err);
  });

// SEC: Schemas

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    jobtitle: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

// SEC: Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SEC: Routes
app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.get("/api/users", (req, res) => {
  res.json(userData);
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
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = userData.find((user) => user.id == id);
    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }
    res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = userData.findIndex((user) => user.id == id);
    if (userIndex === -1) {
      return res.status(404).json({
        msg: "user with id not found",
      });
    }

    userData[userIndex] = { ...userData[userIndex], ...req.body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err) => {
      if (err) {
        return res.status(500).json({
          msg: "error updating user",
        });
      }
      return res.status(200).json({
        msg: "user updated successfully",
      });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = userData.findIndex((user) => user.id == id);
    if (userIndex == -1) {
      return res.status(404).json({
        msg: "user with id not foundd",
      });
    }

    userData.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err) => {
      if (err) {
        return res.status(500).json({
          msg: "error deleting user",
        });
      }
      return res.status(200).json({
        msg: "user deleted successfully",
      });
    });
  });

// SEC: Others
const port = 3000;

app.listen(port, () => {
  console.log(`SERVER IS LISTENING ON PORT ${port}....`);
});
