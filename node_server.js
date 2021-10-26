const http = require('http');
const port = process.env.PORT || 8000; //
const fs = require('fs');

const serveStaticFile = (res, path, contentType, responseCode=200)=>{
    fs.readFile(__dirname + path, (err, data) => {
        if(err){
            res.writeHead(500, {'contentType': 'text/plain'})
            res.end(`500 - Server error: ${err.message}`)
        }
        res.writeHead(responseCode, {'contentType': contentType})
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/$/, '').toLowerCase()

    switch(path){
        case '':
            serveStaticFile(res, '/public/index.html', 'text/html')
            break;

        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html')
            break;
        case '/contact':
            serveStaticFile(res, '/public/contact.html', 'text/html')
            break;

        default:
            serveStaticFile(res, '/public/404.html', 'text/html')
            break;
    }
})


server.listen(port, ()=> console.log(`The server is running at the port ${port} to exit click ctrl C`))