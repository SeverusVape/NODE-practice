"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

const slugify = require("slugify");

// ! SERVER
function replaceTemplate(temp, product) {
    let output = temp.replace(/{% PRODUCTNAME %}/g, product.productName);
    output = output.replace(/{% IMAGE %}/g, product.image);
    output = output.replace(/{% ORIGIN %}/g, product.from);
    output = output.replace(/{% NUTRIENTS %}/g, product.nutrients);
    output = output.replace(/{% QUANTITY %}/g, product.quantity);
    output = output.replace(/{% PRICE %}/g, product.price);
    output = output.replace(/{% DESCRIPTION %}/g, product.description);
    output = output.replace(/{% ID %}/g, product.id);
    if (!product.organic)
        output = output.replace(/{% NOT_ORGANIC %}/g, "not-organic");

    return output;
}

const overviewTmpl = fs.readFileSync(
    `${__dirname}/pages/overview.html`,
    "utf-8"
);
const productTmpl = fs.readFileSync(`${__dirname}/pages/product.html`, "utf-8");
const cartTmpl = fs.readFileSync(
    `${__dirname}/pages/template-cart.html`,
    "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
const slugs = dataObject.map((el) =>
    slugify(el.productName, { lower: true, replacement: "-", trim: true })
);
console.log(slugs);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    try {
        if (pathname === "/" || pathname === "/overview") {
            res.writeHead(200, { "Content-type": "text/html" });

            const cardsHTML = dataObject
                .map((el) => replaceTemplate(cartTmpl, el))
                .join("");
            const output = overviewTmpl.replace(
                "{% PRODUCTS_CARDS %}",
                cardsHTML
            );
            res.end(output);
        } else if (pathname === "/product") {
            res.writeHead(200, { "Content-type": "text/html" });
            const product = dataObject[query.id];
            const output = replaceTemplate(productTmpl, product);
            res.end(output);
        } else if (pathname === "/api") {
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
