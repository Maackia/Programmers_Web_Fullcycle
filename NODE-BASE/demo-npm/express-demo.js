const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.get("/", function (req, res) {
    res.send("Hello Express!");
});

app.get("/products/:n", function (req, res) {
    let number = parseInt(req.params.n);
    console.log(req.params.n, number);
    res.json({
        title: req.params.n + "번째 상품, " + "Node.js를 공부해보자",
        price: 20000,
        desc: "Node.js를 공부하자 with DevCourse",
    });
});

app.get("/hello", function (req, res) {
    res.send({
        say: "안녕하세요",
    });
});

// ITSUB 채널 주소, https://www.youtube.com/@ITSUB
// 침착맨 채널 주소, https://www.youtube.com/@ChimChakMan_Official
// app.get("/:nickname", function (req, res) {
//     const params = req.params;

//     res.json({
//         channel: params.nickname,
//     });
// });

// 영상 주소, https://www.youtube.com/watch?v=KeDfIW6Tge4
// 타임스탬프 주소, https://www.youtube.com/watch?v=yymkAmQkHlQ&t=131s
app.get("/watch", function (req, res) {
    const query = req.query;
    res.json({
        video: query.v,
        timestamp: query.t,
    });
});

app.listen(process.env.PORT);
