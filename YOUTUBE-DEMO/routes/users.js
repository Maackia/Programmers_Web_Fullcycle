const express = require("express");
const router = express.Router();

router.use(express.json());

let db = new Map();
let id = 1;

function isEmpty(obj) {
    if (obj.constructor === Object) {
        if (Object.keys(obj).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}

router.get("/", (req, res) => {
    res.send("Main Page of Youtube-Demo Project.");
});

// Login
router.post("/login", (req, res) => {
    const { userId, password } = req.body;
    let loginUser = {};

    db.forEach((user, id) => {
        // a: value, b: key, c: Map
        if (user.userId === userId) {
            loginUser = user;
        }
    });

    if (isEmpty(loginUser) != true) {
        console.log("userId Found");

        // Checking Password
        if (loginUser.password === password) {
            res.status(200).json({
                message: `${loginUser.name}님 로그인 되었습니다.`,
            });
        } else {
            res.status(400).json({
                message: "비밀번호가 틀렸습니다.",
            });
        }
    } else {
        res.status(404).json({
            message: "가입된 회원 정보를 찾을 수 없습니다.",
        });
    }
});

// Register
// TODO: 중복 회원 가입 방지
router.post("/register", (req, res) => {
    console.log(req.body);

    const { userId } = req.body;

    if (userId) {
        db.set(userId, req.body);

        res.status(201).json({
            message: `${db.get(userId).name}님 환영합니다.`,
        });
    } else {
        res.status(400).json({
            message: "입력 값을 다시 확인해주세요.",
        });
    }
});

// User Info, Delete
router
    .route("/users")
    .get((req, res) => {
        let { userId } = req.body;
        const user = db.get(userId);

        if (user) {
            res.status(200).json({
                userId: user.userId,
                name: user.name,
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    })
    .delete((req, res) => {
        let { userId } = req.body;
        const user = db.get(userId);

        if (user) {
            db.delete(userId);

            res.status(200).json({
                message: `${user.name}님의 탈퇴 처리가 완료되었습니다.`,
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    });

module.exports = router;
