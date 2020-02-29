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
    img_link:
    {
        type:String,
        required:true
    },
    link:{
        type:String,
        required: true
    },
    publish:{
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('blogBody', blogBody)