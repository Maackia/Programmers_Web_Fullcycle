const express = require("express");
const router = express.Router();
const conn = require("../db");
const { body, param, validationResult } = require("express-validator");

router.use(express.json());

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router
    .route("/")
    // 채널 전체 조회
    .get([body("userId").notEmpty().isInt().withMessage("사용자 ID가 필요합니다."), validate], (req, res, next) => {
        const { userId } = req.body;
        let sql = `SELECT * FROM channels WHERE user_id = ?`;

        conn.query(sql, [userId], function (err, results) {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }

            if (results && results.length > 0) {
                console.log(
                    `SEARCH CHANNELS: Channel_id: ${results[0].id}, Channel_name: ${results[0].name}, User_id: ${results[0].user_id}`
                );
                return res.status(200).json(results);
            } else {
                return noChannel(res);
            }
        });
    })

    // 채널 개별 생성
    .post(
        [
            body("userId").notEmpty().isInt().withMessage("사용자 ID가 필요합니다."),
            body("name").notEmpty().isString().withMessage("채널명이 필요합니다."),
        ],
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, userId } = req.body;

            const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
            const values = [name, userId];

            conn.query(sql, values, function (err, results) {
                if (err) {
                    console.error("데이터베이스 쿼리 오류:", err);
                    return res.status(500).json({
                        message: "서버 오류가 발생했습니다.",
                    });
                }
                console.log(`CREATE CHANNEL: Channel ${name}, User ${userId}`);
                res.status(201).json({ message: `${name} 채널이 생성되었습니다.` });
            });
        }
    );

router
    .route("/:id")
    //채널 개별 조회
    .get([param("id").notEmpty().withMessage("채널 ID가 필요합니다.")], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { id } = req.params;
        id = parseInt(id);
        let sql = `SELECT * FROM channels WHERE id = ?`;

        conn.query(sql, [id], function (err, results) {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }

            if (results && results.length > 0) {
                res.status(200).json(results);
            } else {
                noChannel(res);
            }
        });
    })

    // 채널 개별 수정
    .put(
        [
            param("id").notEmpty().withMessage("채널 ID가 필요합니다."),
            body("name").notEmpty().isString().withMessage("채널명이 필요합니다."),
        ],
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name } = req.body;
            let { id } = req.params;
            id = parseInt(id);

            let sql = `UPDATE channels SET name = ? WHERE id = ?`;
            let values = [name, id];

            conn.query(sql, values, function (err, results) {
                if (err) {
                    console.error("데이터베이스 쿼리 오류:", err);
                    return res.status(500).json({
                        message: "서버 오류가 발생했습니다.",
                    });
                }

                if (results.affectedRows > 0) {
                    res.status(200).json({
                        message: `채널명이 ${name}로 변경되었습니다.`,
                    });
                } else {
                    noChannel(res);
                }
            });
        }
    )

    // 채널 개별 삭제
    .delete([param("id").notEmpty().withMessage("채널 ID가 필요합니다.")], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { id } = req.params;
        id = parseInt(id);

        let sql = `DELETE FROM channels WHERE id = ?`;
        let values = [id];

        conn.query(sql, values, function (err, results) {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }

            if (results.affectedRows > 0) {
                res.status(200).json({
                    message: `채널이 정상적으로 삭제되었습니다.`,
                });
            } else {
                noChannel(res);
            }
        });
    });

function noChannel(res) {
    return res.status(404).json({
        message: "채널 정보를 찾을 수 없습니다.",
    });
}

module.exports = router;
