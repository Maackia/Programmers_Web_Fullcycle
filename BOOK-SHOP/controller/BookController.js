const { StatusCodes } = require("http-status-codes");
const conn = require("../db");

const allBooks = (req, res) => {
    let { category_id } = req.query;

    if (category_id) {
        // 카테고리별 도서 목록
        let sql = `SELECT * FROM books WHERE category_id = ?`;
        conn.query(sql, category_id, (err, results) => {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
            }

            if (results.length) return res.status(StatusCodes.OK).json(results);
            else return res.status(StatusCodes.NOT_FOUND).json({ message: "해당 도서를 찾을 수 없습니다." });
        });
    } else {
        // 전체 도서 목록
        let sql = `SELECT * FROM books`;
        conn.query(sql, (err, results) => {
            if (err) {
                console.error("데이터베이스 쿼리 오류:", err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
            }
            res.status(StatusCodes.OK).json(results);
        });
    }
};

const bookDetails = (req, res) => {
    let { id } = req.params;

    let sql = `SELECT * FROM books WHERE id = ?`;
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
