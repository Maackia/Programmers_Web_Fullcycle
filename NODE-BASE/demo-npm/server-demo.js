let http = require("http");

function onRequest(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
}

http.createServer(onRequest).listen(8888);
