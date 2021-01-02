const http = require('http');   // Looks for a global http module
const fs = require('fs');     // Write to files

// function rqlistener(req, res) {}

// Event driven architecture => here we need a callback function to be executed
// whenever a request arrives
// http.createServer(rqlistener);

// Equivalent...
// http.createServer(function(req, res) {
// });

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title> Enter message </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        res.end();
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        //* The following 2 functions are non-blocking listeners, which will run in the feature
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                //! Executes when the writeFile operation is completed!
                res.statusCode = 302;       // 302 = redirection
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    //* This code will execute before the listeners registered above (unless we use return)!
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> My first page </title></head>');
    res.write('<body><h1> Hello from my Node.js server! </h1></body>');
    res.write('</html>');
    res.end();
    //! process.exit();  // this will kill the server
});

server.listen(3000);