"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

// ! SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    try {
        if (pathName === "/") {
            res.end("THIS IS _MAIN PAGE_ PAGE");
        } else if (pathName === "/overview") {
            res.end("THIS IS _OVERVIEW_ PAGE");
        } else if (pathName === "/product") {
            res.end("THIS IS _PRODUCT_ PAGE");
        } else if (pathName === "/api") {
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(data);
        } else {
            res.end("PAGE NOT FOUND 404...");
        }
    } catch (err) {
        console.log(err);
    }
});
server.listen(8000, "127.0.0.1", () => {
    console.log("listening port: 8000...");
});
