const express = require("express");
const fs = require("fs");

const userData = require("./MOCK_DATA.json");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.get("/api/users", (req, res) => {
  res.json(userData);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  //   const user = {
  //     id: userData.length + 1,
  //     first_name,
  //     last_name,
  //     email,
  //     gender,
  //     job_title,
  //   };

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
    const id = req.params.id;
    const user = userData.find((user) => user.id == id);
    res.json(user);
  })
  .patch((req, res) => {
    return res.json({
      status: "pending",
    });
  })
  .delete((req, res) => {
    return res.json({
      status: "pending",
    });
  });

const port = 5000;

app.listen(port, () => {
  console.log(`SERVER IS LISTENING ON PORT ${port}....`);
});
