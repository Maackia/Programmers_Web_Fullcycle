const express = require("express");
const router = express.Router();
const conn = require("../db");

router.use(express.json());

router
    .route("/")
    // 채널 전체 조회
    .get((req, res) => {
        let { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "사용자 ID가 필요합니다." });
        }

        let sql = `SELECT * FROM channels WHERE user_id = ?`;

        conn.query(sql, [userId], function (err, results) {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }

            if (results && results.length > 0) {
                return res.status(200).json(results);
            } else {
                return noChannel(res);
            }
        });
    })

    // 채널 개별 생성
    .post((req, res) => {
        if (req.body.name) {
            let { name, userId } = req.body;

            let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
            let values = [name, userId];

            conn.query(sql, values, function (err, results) {
                if (err) {
                    console.error("데이터베이스 쿼리 오류:", err);
                    return res.status(500).json({
                        message: "서버 오류가 발생했습니다.",
                    });
                }
                console.log(`INSERT INTO channels (name, user_id) VALUES (${name}, ${userId})`);
                res.status(201).json(`${name} 채널이 생성되었습니다.`);
            });
        } else {
            res.status(400).json({
                message: "입력 값을 다시 확인해주세요.",
            });
        }
    });

router
    .route("/:id")
    //채널 개별 조회
    .get((req, res) => {
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
    .put((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        let channel = db.get(id);

        if (channel) {
            let oldTitle = channel.channelTitle;
            let newTitle = req.body.channelTitle;

            channel.channelTitle = newTitle;
            db.set(id, channel);

            res.status(201).json({
                message: `${oldTitle} 채널명이 ${newTitle}로 변경되었습니다.`,
            });
        } else {
            noChannel(res);
        }
    })

    // 채널 개별 삭제
    .delete((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        let channel = db.get(id);
        if (channel) {
            db.delete(id);
            res.status(200).json({
                message: `${channel.channelTitle}이 정상적으로 삭제되었습니다.`,
            });
        } else {
            noChannel(res);
        }
    });

function noChannel(res) {
    return res.status(404).json({
        message: "채널 정보를 찾을 수 없습니다.",
    });
}

module.exports = router;
