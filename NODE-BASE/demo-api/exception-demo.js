const express = require("express");
const app = express();
app.listen(8080);

const fruits = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 3, name: "cherry" },
];

app.get("/fruits", function (req, res) {
    res.json(fruits);
});

app.get("/fruits/:id", (req, res) => {
    let id = req.params.id;
    let findFruit = fruits.find((f) => f.id == id);

    if (findFruit) res.json(findFruit);
    else
        res.status(404).json({
            message: "Fruits not found",
        });
});
