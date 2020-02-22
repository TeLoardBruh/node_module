// read, write, rename, and detele files !
// if we use readFile the error will be the file is greater than the buffer,(if the file is big)
// readFile use full-buffer , load the whole file once
const fs = require('fs');
// create a file 
fs.writeFile('example.txt', "this is an example 1", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('\n');
        console.log('file successfully created');
        fs.readFile('example.txt', "utf8", (err, file) => {
            if (err) {
                console.log(err);
            } else {
                // read file after create 
                console.log("read File : \n");
                console.log(file);
            }
        })
    }
})

// rename 
fs.rename('example1.txt', 'example1.txt', (err) => {
    if (err)
        console.log(err);
    else
        console.log("renamed");
})

// append data 
fs.appendFile('example1.txt', 'some more data', (err) => {
    if (err) console.log(err);
    else console.log('sucessfully appended to file');
})

// delete 
fs.unlink('example1.txt', (err) => {
    if (err) console.log(err);
    else console.log('sucessfully deteled the file');
});
