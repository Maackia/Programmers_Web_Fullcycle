const mariadb = require("mysql");

const connection = mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Tennis",
});

module.exports = connection;
