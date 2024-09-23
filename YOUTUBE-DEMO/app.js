const express = require("express");
const app = express();

app.listen(8080);

// import user-demo
const userRouter = require("./routes/user-demo");

app.use("/", userRouter);
