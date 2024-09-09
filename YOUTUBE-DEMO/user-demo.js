const express = require("express");
const app = express();

app.listen(8080);
app.use(express.json());

let db = new Map();
let id = 1;

app.get("/", (req, res) => {
    res.send("Main Page of Youtube-Demo Project.");
});

// Login
app.post("/login", (req, res) => {});

// Register
app.post("/register", (req, res) => {
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

// User Info, Delete
app.route("/user/:id")
    .get((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        const user = db.get(id);
        if (user == undefined) {
            res.status(404).json({
                message: "User not found",
            });
        } else {
            res.status(200).json({
                userId: user.userId,
                name: user.name,
            });
        }
    })
    .delete((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        const user = db.get(id);

        if (user == undefined) {
            res.status(404).json({
                message: "User not found",
            });
        } else {
            db.delete(id);

            res.status(200).json({
                message: `${user.name}님의 탈퇴 처리가 완료되었습니다.`,
            });
        }
    });
