function route(pathname, handle, response) {
    console.log("pathname: " + pathname);
    console.log("handle[pathname]: ", typeof handle[pathname]);

    if ((typeof handle[pathname]).includes("function")) {
        handle[pathname](response);
    } else {
        response.writeHead(404, { "content-type": "text/html" });
        response.write("Not Found");
        response.end();
    }
}

exports.route = route;
