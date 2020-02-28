const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
// for env 
require('dotenv/config');


// require router for use in app.use
const routes = require('./routes/routes');
app.use( express.static( "public" ) );

// connect to db 
mongoose.connect(process.env.DB_ACCESS,
{ useNewUrlParser: true },()=>{
    console.log('Database connected');
});
app.use(bodyParser.urlencoded({extended: true}));


const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// all the web thing are here
app.use('/', routes);

app.listen('3000',function(){
    console.log(`running on localhost:3000`);
});