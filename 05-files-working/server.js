const http = require("http");

const server = http.createServer((req, res) => {
  //
  res.statusCode = 200;
  res.end("Bye");
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
