const fs = require('fs');



const addNoted =  (title, body) => {
    const notes = loadNotes();
    const dupTitle = notes.find((note) => {
        return note.title === title;
    })

    // const dupTitle = notes.filter(function(note){
    //     return note.title === title;
    // })  
    debugger

    if(!dupTitle){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
    }else  console.log('Please enter new title : Title already taken ');

}

const saveNotes =  (notes) =>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('note.json', dataJSON);
}
const removeNoted = (title) =>{
    const notes = loadNotes();
    const titleSearch = notes.filter((note)=>{
        return note.title !== title;
    })
    if(notes.length > titleSearch.length){
        console.log("removed : " ,title);
        saveNotes(titleSearch);
    }
    else{
        console.log("Not found");
    }
}
const listNoted = (title, body)=>{
    const notes = loadNotes();
    console.log("Your notes :");
    notes.forEach(note => {
        console.log(note.title);

    });
}
const readNoted = (title)=>{
    const notes = loadNotes();
    const readTitle = notes.find((note) => {
        return note.title === title;
    })

    if(readTitle){
        console.log(readTitle.title);
        console.log(readTitle.body);
    }else{
        console.log("No match");
    }

}
const loadNotes =  () =>{
    try {
        const dataBuffer = fs.readFileSync('note.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}



module.exports = {
    addNotes : addNoted,
    removeNoted : removeNoted,
    listNoted: listNoted,
    readNoted: readNoted
};