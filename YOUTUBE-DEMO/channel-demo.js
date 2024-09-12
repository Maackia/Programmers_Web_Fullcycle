const express = require("express");
const app = express();

app.listen(8080);
app.use(express.json());

let db = new Map();
let id = 1;

// 채널 전체 조회
app.get();

// 채널 개별 생성
app.post();

//채널 개별 조회
app.get();

// 채널 개별 수정
app.put();

// 채널 개별 삭제
app.delete();
