const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let blogBody = new Schema({
    title:{
        type:String,
        required: true
    },
    des:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    publish:{
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('blogBody', blogBody)