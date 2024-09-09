const express = require("express");
const app = express();

app.get("/:id", function (req, res) {
    let { id } = req.params;
    id = parseInt(id);

    if (db.get(id) == undefined) {
        res.json({
            message: "없는 상품입니다.",
        });
    } else {
        res.json({
            id: id,
            productName: db.get(id),
        });
    }
});

let db = new Map();
db.set(1, "NoteBook");
db.set(2, "Cup");
db.set(3, "Chair");

app.listen(3000);