var dotenv = require("dotenv");
dotenv.config();

var jwt = require("jsonwebtoken");
var token = jwt.sign({ id: "test" }, process.env.PRIVATE_KEY);
// token 생성 = jwt 서명을 했다! (페이로드, 나만의 암호키) + SHA256 알고리즘

console.log(token);

var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);

jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
    console.log(decoded.id);
});
