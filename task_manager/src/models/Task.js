const mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    description:{
        type:String,
        require:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default: false
    }
    
}, )
var Task = mongoose.model('Task', TaskSchema, 'task');



module.exports = Task;