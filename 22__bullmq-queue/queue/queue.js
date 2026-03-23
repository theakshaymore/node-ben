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
      host: "",
      port: 222,
      username: "",
      password: "",
      tls: {},
    },
    limiter: {
      max: 50,
      duration: 1 * 1000,
    },
  },
);

export default emailWorker;
