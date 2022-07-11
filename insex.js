const fs = require("fs");

//const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
//console.log(textIn);

//const textOut = `This text came from insex.js.\nCreated on ${Date.now()}`
//fs.writeFileSync("./txt/myFile.txt", textOut);
//console.log("File ready!")

//ASYNC
// fs.readFile("./txt/myFile.txt", "utf-8", (err, data) => {
//     console.log(data);
// });
// console.log("Reading file...");
fs.readFile("./txt/start.txt", "utf-8", (error, data) => {
    try {
        console.log(data);
    } catch (error) {
        console.error(error);
    }
});
