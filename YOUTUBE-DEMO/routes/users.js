const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const router = express.Router();

const conn = require("../db");

// conn.query("SELECT * FROM `users`", function (err, results, fields) {
//     res.status(200).json(results);
// });

router.use(express.json());

function isEmpty(obj) {
    if (obj.constructor === Object) {
        if (Object.keys(obj).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}

router.get("/", (req, res) => {
    res.send("Main Page of Youtube-Demo Project.");
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, [email], function (err, results) {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            return res.status(500).json({ message: "서버 오류가 발생했습니다." });
        }

        const loginUser = results[0];

        if (!loginUser) {
            return res.status(404).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
        }

        if (loginUser.password !== password) {
            return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
        }

        res.status(200).json({
            message: `${loginUser.name}님 로그인 되었습니다.`,
        });
    });
});

// Register
// TODO: 중복 회원 가입 방지
router.post("/register", (req, res) => {
    console.log(req.body);
    const { email, name, password, contact } = req.body;

    if (email) {
        let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
        let values = [email, name, password, contact];

        conn.query(sql, values, function (err, results) {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }
            res.status(201).json(results);
        });
    } else {
        res.status(400).json({
            message: "입력 값을 다시 확인해주세요.",
        });
    }
});

// User Info, Delete
router
    .route("/users")
    .get((req, res) => {
        let { email } = req.body;
        let sql = `SELECT * FROM users WHERE email = ?`;

        conn.query(sql, [email], function (err, results) {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }

            if (results && results.length > 0) {
                res.status(200).json(results);
            } else {
                res.status(404).json({
                    message: "사용자를 찾을 수 없습니다.",
                });
            }
        });
    })
    .delete((req, res) => {
        let { email } = req.body;
        let sql = `DELETE FROM users WHERE email = ?`;

        conn.query(sql, [email], function (err, results) {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }
            res.status(200).json(results);
        });
    });

module.exports = router;
