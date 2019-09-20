const url = require('url');
const fs = require('fs');
const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '../views/home/'));

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {
        fs.readFile(rootPath + 'index.html', (err, data) => {
            if (err) {
              console.log(err);
              res.writeHead(404, {
                'Content-Type': 'text/plain'
              });

              res.write('404 Not Found');
              res.end();
              return;
            }
    
            res.writeHead(200, {
              'content-type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }

}
