const express = require("express");
const router = express.Router();

router.use(express.json());

let db = new Map();
let id = 1;

router
    .route("/channels")
    // 채널 전체 조회
    .get((req, res) => {
        if (db.size) {
            let channles = [];

            db.forEach(function (value) {
                channles.push(value);
            });

            res.status(200).json(channles);
        } else {
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다.",
            });
        }
    })

    // 채널 개별 생성
    .post((req, res) => {
        if (req.body.channelTitle) {
            db.set(id++, req.body);

            res.status(201).json({
                message: `${db.get(id - 1).channelTitle} 채널 개설이 완료되었습니다.`,
            });
        } else {
            res.status(400).json({
                message: "요청 값을 다시 한 번 확인해주세요.",
            });
        }

        console.log(db);
    });

router
    .route("/channels/:id")
    //채널 개별 조회
    .get((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        let channel = db.get(id);
        console.log(channel);
        if (channel) {
            res.status(200).json(channel);
        } else {
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다.",
            });
        }
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
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다.",
            });
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
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다.",
            });
        }
    });

module.exports = router;
