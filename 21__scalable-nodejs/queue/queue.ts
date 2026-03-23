import { Queue, Worker } from "bullmq";
import { sendEmail } from "../utils/email.ts";

const connection = {
  host: "valkey-4dc0338-akshay-9189.f.aivencloud.com",
  port: 28503,
  username: "default",
  password: "AVNS_eWWQfcK8zJSWam9VKTo",
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
