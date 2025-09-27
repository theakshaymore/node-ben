const fs = require("fs");

// console.log(fs);

// fs.writeFileSync("./test.txt", "Hello file");
// console.log("OPERATION DONE");

// Blocking elements
// console.log("1");
// const res = fs.readFileSync("./test.txt", "utf-8");
// console.log(res);

// console.log("2");

// console.log("3");
// console.log("4");

// Non-Blocking elements
console.log("1");
const res = fs.readFile("./test.txt", "utf-8", (err, res) => {
  console.log(res);
});

console.log("2");
// const res2 = fs.readFileSync("./test.txt", "utf-8");
// console.log(res2);

console.log("3");
console.log("4");
