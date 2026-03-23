import { Queue, Worker } from "bullmq";
import { sendEmail } from "../utils/email.ts";

const connection = {
  host: "",
  port: 28503,
  username: "",
  password: "",
  tls: {},
};

export const emailQueue = new Queue("email-queue", { connection });

new Worker(
  "email-queue",
  async (job) => {
    console.log("job received...", job.id);
    await sendEmail(job.data);
  },
  { connection, limiter: { max: 50, duration: 1000 } },
);

// git check
