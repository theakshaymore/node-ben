import { Worker } from "bullmq";

async function sendEmail(payload) {
  const { from, to, subject, body } = payload;
  return new Promise((resolve, reject) => {
    console.log(`Sendingg Email to ${to}....`);
    setTimeout(() => resolve(1), 2 * 1000);
  });
}

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const data = job.data;
    console.log("job recieved...", job.id);

    await sendEmail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      body: data.body,
    });
  },
  {
    connection: {
      host: "valkey-4dc0338-akshay-9189.f.aivencloud.com",
      port: 28503,
      username: "default",
      password: "AVNS_eWWQfcK8zJSWam9VKTo",
    },
    limiter: {
      max: 50,
      duration: 1 * 1000,
    },
  },
);

export default emailWorker;
