const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task_app';
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex:true
}, (err, client) => {
    if (err) {
        return console.log("Unable to connect to database");
    } else
    console.log("Connected");
})
