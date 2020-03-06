const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email please enter properly")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("PASSWORD CANNOT CONTAIN PASSWORD INSIDE");
            }
        }
    }
}, )
var User = mongoose.model('User', UserSchema, 'user_detail');



// const me = new User({
//     name: "rax",
//     email: "rax@gmail.com",
//     password: "password1424"
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error);
// })


module.exports = User;