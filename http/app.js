// create http module 
// create server at loction host 3000 
const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write("Working server from node js ");
        res.end();
    }
    else{
        res.write("something else");
        res.end();       
    }
    
})

server.listen('3000');