let str = [1, 2, 2, 3, 4, 5, 5, 5];

// let res = new Set(str);

str = [...new Set(str)];

console.log(str);
