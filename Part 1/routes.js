const fs = require('fs');     // Write to files

const requestHandler = (req, res) => {
    const method = req.method;
    const url = req.url;
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
};

//! Register the function so that we can import it later
// moudule.exports = requestHandler;

// module.exports.handler = requestHandler;
// module.exports.someText = 'Hohoho';

// exports.handler = requestHandler;
// exports.someText = 'Hohoho';
module.exports = {
    handler : requestHandler,
    someText: 'This is some hard coded text!'
};