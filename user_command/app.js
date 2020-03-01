
const yargs = require('yargs');
const fs = require('fs');
const notes = require('./notes');
// console.log(process.argv);
// console.log(process.argv[3]);

const user_input = process.argv[2];


// setting up yargs 
yargs.command({
    command:'add',
    describe: 'Add to note',
    builder:{
        title: {
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe:'Body description',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNotes(argv.title, argv.body);
    }
})
yargs.command({
    command:'remove',
    builder:{
        title: {
            describe:'Remove title',
            demandOption: true,
            type: 'string'
        }
    },
    describe: 'Remove to note',
    handler: function(argv){
        notes.removeNoted(argv.title);
    }
})
yargs.command({
    command:'read',
    builder:{
        title: {
            describe:'Read title',
            demandOption: true,
            type: 'string'
        }
    },
    describe: 'Read note',
    handler: function(argv){
        notes.readNoted(argv.title);
    }
})
yargs.command({
    command:'list',
    describe: 'List out the note',
    handler: function(argv){
        notes.listNoted();
    }
})

yargs.parse();
// if(user_input === "add"){
//     console.log("add to : ");
// }
// else if(user_input === 'remove'){
//     console.log("remove at :");
// }