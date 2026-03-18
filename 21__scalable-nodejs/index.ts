import express from "express";
import { Queue } from "bullmq";
import { addCourse } from "./utils/course.ts";

const app = express();

const PORT = 8007;

const emailQueue = new Queue("email-queue", {
  connection: {
    host: "valkey-4dc0338-akshay-9189.f.aivencloud.com",
    port: 28503,
    username: "default",
    password: "AVNS_eWWQfcK8zJSWam9VKTo",
    tls: {},
  },
});

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

  await emailQueue.add(`${Date.now()}`, {
    from: "akshay@gmail.com",
    to: "student@gmail.com",
    subject: "Course purchase",
    body: "Dear Student, You have been enrolled to Twitter Clone Course",
  });
  // send response
  return res
    .status(200)
    .json({ status: "success", message: "course added aptly!" });
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
