const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const Joi = require('joi');

// using middware and css paths
app.use('/public', express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// middware for post request 
app.use(bodyParser.urlencoded({
    extended: false
}));

// difference paths 
app.get('/example', (req, res) => {
    res.send('Hello Example');
});

// working value stuff
app.get('/example/:name/:age', (req, res) => {
    console.log(req.params);
    console.log(req.query);
    res.send('Hello ' + req.params.name);
});

// post request 
app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'form.html'));
})

// normal post and validation with Joi
app.post('/post', (req, res) => {
    console.log(req.body);
    // create scheme for vailidation
    const scheme = Joi.object().keys({
        email : Joi.string().trim().email().required(),
        password : Joi.string().min(5).max(10).required(),
    })
    Joi.validate(req.body,scheme,(err,result)=>{
        if(err){
            console.log(err);
            res.send('err');
        }
        else{
            res.send('successful posted data');
            console.log(result);
        }
    });
    // database work 

})



// hanle Json
// app.use(bodyParser.json());
// app.post('/post', (req, res) => {
//     console.log(req.body);
//     // database work 
//     res.json({sucess : true})
// })
app.listen('3000');