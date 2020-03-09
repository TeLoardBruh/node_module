const mongoose = require('mongoose');
require('dotenv/config');

const connectionURL = process.env.MONGO_DB_ONLINE ;
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex:true
}, (err, client) => {
    if (err) {
        return console.log("Unable to connect to database");
    } else
    console.log("Connected");
})
