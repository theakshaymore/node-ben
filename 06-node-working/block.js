const fs = require("fs");

// console.log(fs);

// fs.writeFileSync("./test.txt", "Hello file");
// console.log("OPERATION DONE");

// Blocking elements
console.log("1");
const res = fs.readFileSync("./test.txt", "utf-8");
console.log(res);

console.log("2");
const res2 = fs.readFileSync("./test.txt", "utf-8");
console.log(res2);

console.log("3");
const res3 = fs.readFileSync("./test.txt", "utf-8");
console.log(res3);

console.log("4");
const res4 = fs.readFileSync("./test.txt", "utf-8");
console.log(res4);

console.log("5");
const res5 = fs.readFileSync("./test.txt", "utf-8");
console.log(res5);
