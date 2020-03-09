const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./Task');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
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
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Age must be bigger then 0")
            }
        }
    }, 
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
}, { 
    timestamps: true
})

// set relationship
// here is localField and foreignField is the relationship that connect with table 
UserSchema.virtual('tasks', {
    ref: 'Task',
    localField:'_id',
    foreignField:'owner'
})

// generate token
UserSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token; 

}

// get info for user special 
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    
    return userObject;
}

// check user login 
UserSchema.statics.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    });
    if (!user) {
        throw new Error("Unable to login email");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login password");
    }
    return user;
}
// hash password
UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

// delete user also delete tasks with it 

UserSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', UserSchema, 'user_detail');



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