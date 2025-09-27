const fs = require("fs");

// console.log(fs);

// fs.writeFileSync("./test.txt", "Hello file");

const res = fs.readFileSync("./test.txt", "utf-8");
console.log(res);

// console.log("OPERATION DONE");
