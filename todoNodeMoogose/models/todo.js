// this file is the creating pom for push to the server
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let toDoSchema = new Schema({
    description: {
        type:String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('ToDo', toDoSchema)