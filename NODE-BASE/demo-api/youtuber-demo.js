const express = require("express");
const app = express();

const db = new Map();
let id = 1;
let msg = "테스트 메세지입니다.";

let youtuber1 = {
    channelTitle: "youtuber1",
    subscribers: "153만명",
    videoCount: 536,
};

let youtuber2 = {
    channelTitle: "youtuber2",
    subscribers: "227만명",
    videoCount: 6637,
};

let youtuber3 = {
    channelTitle: "youtuber3",
    subscribers: "58만명",
    videoCount: 726,
};

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

app.get("/youtubers", (req, res) => {
    // res.json(Array.from(db.values()));

    if (db.size >= 1) {
        var youtubers = {};
        db.forEach(function (value, key) {
            youtubers[key] = value;
        });

        res.json(youtubers);
    } else {
        res.status(404).json({
            message: "등록된 유튜버가 존재하지 않습니다.",
        });
    }
});
app.get("/youtuber/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);

    if (youtuber === undefined) {
        res.json({ message: "해당 유튜버 정보를 찾을 수 없습니다." });
    } else {
        res.json(youtuber);
    }
});

app.use(express.json());
app.post("/register", (req, res) => {
    const channelTitle = req.body.channelTitle;
    if (channelTitle) {
        db.set(id++, req.body);

        res.status(201).json({ message: `'${db.get(id - 1).channelTitle}'님의 새 유튜브 채널 개설이 완료되었습니다.` });
    } else {
        res.status(400).json({
            message: "Invalid channelTitle",
        });
    }
});

app.delete("/youtuber/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let youtuber = db.get(id);
    if (youtuber == undefined) {
        res.status(404).json(`'${id}'은(는) 존재하지 않는 유튜브 채널입니다.`);
    } else {
        const name = youtuber.channelTitle;
        db.delete(id);

        res.status(200).json({ message: `'${name}' 채널이 삭제되었습니다.` });
    }
});

app.delete("/youtubers", (req, res) => {
    if (db.size >= 1) {
        db.clear();
        httpStatus = 200;
        msg = "등록된 모든 유튜버 정보를 삭제하였습니다.";
    } else {
        httpStatus = 404;
        msg = "등록된 유튜버 정보가 존재하지 않습니다.";
    }

    res.status(httpStatus).json({ message: msg });
});

app.put("/youtuber/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let youtuber = db.get(id);
    if (youtuber == undefined) {
        httpStatus = 404;
        msg = `'${id}'은(는) 존재하지 않는 유튜브 채널입니다.`;
    } else {
        httpStatus = 200;
        let newTitle = req.body.channelTitle;
        const name = youtuber.channelTitle;
        youtuber.channelTitle = newTitle;
        db.set(id, youtuber);
        msg = `'${name}'님의 채널명이 '${newTitle}'로 변경되었습니다. `;
    }

    res.status(httpStatus).json({
        message: msg,
    });
});

app.listen(8080);
