const { StatusCodes } = require("http-status-codes");
const conn = require("../db");

const allCategory = (req, res) => {
    let sql = `SELECT * FROM category`;
    conn.query(sql, (err, results) => {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = { allCategory };
