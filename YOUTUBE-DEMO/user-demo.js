const express = require("express");
const app = express();

app.listen(8080);
app.use(express.json());

let db = new Map();
let id = 1;

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Login
app.post("/login", (req, res) => {});

// Join
app.post("/join", (req, res) => {
    console.log(req.body);

    if (req.body.userId != undefined) {
        db.set(id++, req.body);

        const name = db.get(id - 1).name;

        res.status(201).json({
            message: `${name}님 환영합니다.`,
        });
    } else {
        res.status(400).json({
            message: "입력 값을 다시 확인해주세요.",
        });
    }
});

// User Info
app.get("/users/:id", (req, res) => {});

// Delete User
app.delete("/users/:id", (req, res) => {});
