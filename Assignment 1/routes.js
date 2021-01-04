const users = [];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My server!</title></head>');
        res.write('<body>');
        res.write('<h1>Greetings, please submit your username!</h1></body>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
    else if (url === '/users'){
        res.write('<html>');
        res.write('<head><title>List of users!</title></head>');
        res.write('<ul><li>Mike</li></ul>');
        res.write('<ul><li>Lotti</li></ul>');
        for (user of users)
            res.write('<ul><li>' + user + '</li></ul>');
        res.write('</html>');
        res.end();
    }
    else if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            console.log(message);
            users.push(message);
        });

        res.statusCode = 302;
        res.setHeader ('Location','/');
        return res.end();
    }
};

exports.handler = requestHandler;