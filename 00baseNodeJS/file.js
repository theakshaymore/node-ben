const { error } = require("console");
const fs = require("fs");

// fs.writeFileSync("./test.txt", "hey there");

// fs.writeFile("./test.txt", "hey there async", (err) => {});

// const res = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(res);

// fs.readFile("./contacts.txt", "utf-8", (err, res) => {
//   if (err) {
//     console.log("ERROR: ", err);
//   } else {
//     console.log(res);
//   }
// });

fs.appendFileSync("./test.txt", `\nNew text`);
