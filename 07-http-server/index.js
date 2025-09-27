const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const log = `${Date.now()}: Req received\n`;
  fs.appendFile("logs.txt", log, (err, data) => {
    res.end("Hello from http server");
  });
});

const port = 5000;

server.listen(port, () => {
  console.log("Server is running......");
});
