let http = require("http");
let url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log(`Request for ${pathname} received.`);
        route(pathname, handle, response);
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;
