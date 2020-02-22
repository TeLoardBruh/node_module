// using pip its a short hand version of read and write stream
const fs = require('fs');
// zip lib
const zlib = require('zlib');
// creating zip file
const gzib = zlib.createGzip();
// creating unzip file
const gunzib = zlib.createGunzip();


// short hand of doing the long way of read and write Stream
const readStream = fs.createReadStream('./example.txt','utf8');
const writeStream = fs.createWriteStream('./example2.txt','utf8');
readStream.pipe(writeStream);


// // compress file
const readStream = fs.createReadStream('./example.txt','utf8');
const writeStream = fs.createWriteStream('./example2.txt.zip');
readStream.pipe(gzib).pipe(writeStream);


// uncompress thing
const readStream = fs.createReadStream('./example2.txt.zip');
const writeStream = fs.createWriteStream('uncompress.txt');
// // uncompress file
readStream.pipe(gunzib).pipe(writeStream);