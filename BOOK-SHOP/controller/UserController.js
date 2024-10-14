const { StatusCodes } = require("http-status-codes");
const conn = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();

const join = (req, res) => {
    const { email, password } = req.body;

    // 비밀번호 암호화
    const salt = crypto.randomBytes(10).toString("base64");
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");

    let sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;
    let values = [email, hashPassword, salt];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "잘못된 요청입니다." });
        }
        return res.status(StatusCodes.CREATED).json({ message: "회원가입이 완료되었습니다." });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, (err, results) => {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
        }
        const loginUser = results[0];
        const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, "sha512").toString("base64");

        if (loginUser && loginUser.password == hashPassword) {
            const token = jwt.sign(
                {
                    email: loginUser.email,
                },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: "5m",
                    issuer: "maackia",
                }
            );
            res.cookie("token", token, {
                httpOnly: true,
            });
            console.log(token);

            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
        }
    });
};

const requestPasswordReset = (req, res) => {
    const { email } = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, (err, results) => {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
        }
        // 이메일로 유저가 있는지 확인
        const user = results[0];
        if (user) {
            return res.status(StatusCodes.OK).json({
                email: email,
            });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
    });
};

const passwordReset = (req, res) => {
    const { email, password } = req.body;

    const salt = crypto.randomBytes(10).toString("base64");
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");

    let sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    let values = [hashPassword, salt, email];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
        }

        if (results.affectedRows == 0) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        } else {
            return res.status(StatusCodes.OK).json(results);
        }
    });
};

module.exports = { join, login, passwordReset, requestPasswordReset };
