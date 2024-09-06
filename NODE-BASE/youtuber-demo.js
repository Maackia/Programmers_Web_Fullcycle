const express = require("express");
const app = express();

const db = new Map();
let id = 1;

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
    res.json(Array.from(db.values()));
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
    console.log(req.body);

    db.set(id++, req.body);

    res.json({ message: `'${db.get(id - 1).channelTitle}'님의 새 유튜브 채널 개설이 완료되었습니다.` });
});

app.listen(8080);
