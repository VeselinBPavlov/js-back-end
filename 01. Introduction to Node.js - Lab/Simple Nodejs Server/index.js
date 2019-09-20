let http = require('http');

let app = http.createServer((req, res) => {
    res.write('Hi!');
    res.end();
});

let port = '5000';
app.listen(port);

console.log(`Node.js server running on port ${port}...`);