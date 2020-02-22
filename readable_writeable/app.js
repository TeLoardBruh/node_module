// so this is the method of reading stream line by line , the advantage here is we can write into another file while reading 
// better to use stream to read File
// if we use readFile the error will be the file is greater than the buffer,(if the file is big)
// this createReadCreate use small-buffer 1, chunk by chunk
const fs = require('fs');
const readStream = fs.createReadStream('./example.txt','utf8');
const writeStream = fs.createWriteStream('./example2.txt','utf8');
readStream.on('data',(chunk)=>{
    writeStream.write(chunk);
});