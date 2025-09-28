const express = require("express");
const userData = require("./MOCK_DATA.json");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.get("/api/users", (req, res) => {
  res.json(userData);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);

  return res.json({
    status: "pending",
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
