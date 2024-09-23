const express = require("express");
const app = express();

app.listen(8080);

const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");

app.use("/", userRouter);
app.use("/", channelRouter);
