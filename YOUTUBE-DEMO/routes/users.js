const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const router = express.Router();
const conn = require("../db");
const { body, param, validationResult } = require("express-validator");

router.use(express.json());

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
};

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
router.post(
    "/login",
    [
        body("email").notEmpty().isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
        body("password").notEmpty().withMessage("비밀번호가 필요합니다."),
        validate,
    ],
    (req, res) => {
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
    }
);

// Register
// TODO: 중복 회원 가입 방지
router.post(
    "/register",
    [
        body("email").notEmpty().isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
        body("name").notEmpty().withMessage("이름이 필요합니다."),
        body("password").notEmpty().withMessage("비밀번호가 필요합니다."),
        body("contact").notEmpty().withMessage("연락처가 필요합니다."),
        validate,
    ],
    (req, res) => {
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
    }
);

// User Info, Delete
router
    .route("/users")
    .get([body("email").notEmpty().withMessage("이메일이 필요합니다."), validate], (req, res) => {
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
    .delete([body("email").notEmpty().withMessage("이메일이 필요합니다."), validate], (req, res) => {
        let { email } = req.body;
        let sql = `DELETE FROM users WHERE email = ?`;

        conn.query(sql, [email], function (err, results) {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }

            if (results.affectedRows > 0) {
                res.status(200).json({
                    message: "사용자가 정상적으로 삭제되었습니다.",
                });
            } else {
                res.status(404).json({
                    message: "사용자를 찾을 수 없습니다.",
                });
            }
        });
    });

module.exports = router;
