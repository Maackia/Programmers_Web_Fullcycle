const { StatusCodes } = require("http-status-codes");
const conn = require("../db");

const allBooks = (req, res) => {
    let { category_id, news } = req.query;
    let values = [];

    let sql = `SELECT * FROM books`;
    if (category_id && news) {
        sql += ` WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();`;
        values = [category_id, news];
    } else if (category_id) {
        sql += ` WHERE category_id = ?;`;
        values = category_id;
    } else if (news) {
        sql += ` WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();`;
        values = news;
    }

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
        }
        res.status(StatusCodes.OK).json(results);
    });
};

// 개별 도서 조회(상세 조회)
const bookDetails = (req, res) => {
    let { id } = req.params;

    let sql = `SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ?;`;
    conn.query(sql, id, (err, results) => {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
        }

        if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
        else return res.status(StatusCodes.NOT_FOUND).json({ message: "해당 도서를 찾을 수 없습니다." });
    });
};

module.exports = {
    allBooks,
    bookDetails,
};
