const express = require("express");
const multer = require("multer");

const app = express();

const PORT = 9000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("homepage");
});

app.post("/upload", upload.single("uploadImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Server is running......");
});
