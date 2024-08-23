const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf8");

const mariadb = require("./database/connect/mariadb");

function main(response) {
    console.log("main");

    mariadb.query("SELECT * FROM product", function (err, rows) {
        console.log(rows);
    });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(main_view);
    response.end();
}

function maincss(response) {
    fs.readFile("./main.css", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/css" });
        response.write(data);
        response.end();
    });
}

function redRacket(response) {
    fs.readFile("./img/redRacket.png", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}
function blueRacket(response) {
    fs.readFile("./img/blueRacket.png", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}
function blackRacket(response) {
    fs.readFile("./img/blackRacket.png", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}

let handle = {}; // key: value
handle["/"] = main;

/* image directory */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blackRacket.png"] = blackRacket;
handle["/img/blueRacket.png"] = blueRacket;

/* css file */
handle["/main.css"] = maincss;

exports.handle = handle;
