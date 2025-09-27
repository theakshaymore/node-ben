const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request recieved");
  res.end("Hello from http server");
});

const port = 5000;

server.listen(port, () => {
  console.log("Server is running......");
});
