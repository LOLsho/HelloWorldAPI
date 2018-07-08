const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const handlers = require('./handlers');
const helpers = require('./helpers');



const server = {};
const PORT = 3131;

server.httpServer = http.createServer(function (req, res) {

    let parsedUrl = url.parse(req.url, true);

    let path = parsedUrl.pathname;

    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    let queryStringObject = parsedUrl.query;

    // Get the HTTP method
    let method = req.method.toLowerCase();

    // Get the headers as an object
    let headers = req.headers;

    // Get the payload, if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        let chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined'
            ? server.router[trimmedPath] : handlers.notFound;

        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        chosenHandler(data, function (statusCode, payload) {

            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            payload = typeof(payload) === 'object' ? payload : {};

            let payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
});


server.router = {
    'hello': handlers.hello,
};



server.init = function () {
    server.httpServer.listen(PORT, function () {
        console.log('\x1b[36m%s\x1b[0m', `This server is listening on port ${PORT}`);
    });
};


module.exports = server;