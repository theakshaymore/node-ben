import express from "express";
import { addCourse } from "./utils/course";
import { sendEmail } from "./utils/email";

const app = express();

const PORT = 8007;

app.get("/", (req, res) => {
  return res.json({ status: "success", message: "Hello from Express Server" });
});

app.get("/test", (req, res) => {
  return res.json({ status: "success", message: "Hello from tests route" });
});

app.post("/add-course", async (req, res) => {
  // add course
  await addCourse();
  // send email

  await sendEmail({
    from: "akshay@gmail.com",
    to: "student@gmail.com",
    subject: "Course purchase",
    body: "aknsakhsasnsnajsajsbahbajsbshj",
  });
  // send response
  return res
    .status(200)
    .json({ status: "success", message: "course added aptly!" });
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
