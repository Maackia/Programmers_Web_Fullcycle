var jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// GET + "/jwt" : 토큰 발행
app.get("/jwt", function (req, res) {
    var token = jwt.sign({ foo: "bar" }, process.env.PRIVATE_KEY);

    res.cookie("jwt", token, {
        httpOnly: true,
    });
    res.send("토큰 발행 완료!");
});

// GET + "/jwt/decoded" : 토큰 검증
app.get("/jwt/decoded", function (req, res) {
    let receivedJwt = req.headers["authorization"];
    console.log(receivedJwt);

    var decoded = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);

    res.send(decoded);
});

app.listen(process.env.PORT);
