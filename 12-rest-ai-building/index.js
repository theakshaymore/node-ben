const express = require("express");
const fs = require("fs");

const userData = require("./MOCK_DATA.json");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.get("/api/users", (req, res) => {
  res.json(userData);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  userData.push({ ...body, id: userData.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err, data) => {
    if (err) {
      return res.json({
        status: "error in adding user",
      });
    }
    return res.json({
      status: "user added successfully",
    });
  });
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
        msg: "user with id not found",
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

const port = 5000;

app.listen(port, () => {
  console.log(`SERVER IS LISTENING ON PORT ${port}....`);
});
