// serv static file 
// hosting file in node server
const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
// html
    const readStream = fs.createReadStream('./static/index.html');
    res.writeHead(200,{'Content-type':'text/html'});
// json
    // res.writeHead(200,{'Content-type':'application/json'});
// image
    // res.writeHead(200,{'Content-type':'image/png'});


    readStream.pipe(res);

}).listen('3000');