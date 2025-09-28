let obj = {
  name: "akshay",
  data: { a: 1 },
};

// let obj2 = obj;
let obj2 = { ...obj };

obj2.name = "more";
obj2.data.a = 5;

console.log(obj.name);
console.log(obj2.name);

console.log(obj.data.a);
console.log(obj2.data.a);
