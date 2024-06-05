const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
};

const server = http.createServer((req, res) => {
    const filePath = req.url === '/' ? './index.html' : '.' + req.url;
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('404 Not Found');
            } else {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
