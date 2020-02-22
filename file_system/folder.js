// work with folder , creating directory (folder), create files in folder, delete files in folder.
const fs = require('fs');
// create folder

fs.mkdir('file_system_test', (err) => {
    if (err) console.log(err);
    else {
        fs.writeFile('./file_system_test/example.txt', "element created", (err) => {
            if (err) console.log(err);
            else {
                fs.readFile('./file_system_test/example.txt', 'utf8', (err, file) => {
                    if (err) console.log(err);
                    else console.log("the file has : " + file);
                })
            };
        })
    };
})

// delete 
// first unlink from file then remove folder

fs.unlink('file_system_test/example.txt', (err) => {
    if (err) console.log(err);
    else {
        fs.rmdir('file_system_test', (err) => {
            if (err) console.log(err);
            else console.log('success delete');
        });
    }
});


// deleting files in folder

fs.readdir('example',(err,files)=>{
    if(err)
        console.log(err);
    else{
        // console.log(files);
        for (let file of files){
            fs.unlink('./example/' + file ,(err)=>{
                if(err) 
                    console.log(err);
                else{
                    console.log('sucess deleting file');
                }
            })
        }
    }
})