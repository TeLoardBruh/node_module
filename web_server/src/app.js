const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const forcast = require('./utils/forcast');
const geoCode = require('./utils/geoCode');
// config path
const pDir = path.join(__dirname, '../public');
const viewDir = path.join(__dirname,'../templates/views');
const partailDir = path.join(__dirname,'../templates/partials')



app.set('view engine','hbs')
app.set('views', viewDir);
hbs.registerPartials(partailDir);

// set static dir to served
app.use(express.static(pDir));

app.get('/',(req,res)=>{ 
    const title = "Home";
    const name = "Rax";
    
    res.render("weather", {title:title,name:name});
})
app.get('/about',(req,res)=>{ 
    const title = "Home";
    const name = "Rax";
    res.render("index", {title:title,name:name});
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({err:"You must provide the adress"})
    }
    geoCode(req.query.address,(err,{latitude,longtitude,location}={})=>{
        if(err){
            return res.send({err});
        }
        forcast(latitude,longtitude,(err, forcastDate)=>{
            if(err){
                res.send({err});
            }
            res.send({
                forcast: forcastDate,
                location,
                address: req.query.address
            })
        })

    })
    // const title = "Weather";
    // const name = "Rax";
    // res.render("weather",{
    //     title:title,
    //     name:name,
    //     forcast: "Good weather",
    //     location: "Phnom Penh"
    // })
})
app.get('/weather/*',(req,res)=>{
    const name = "Rax";
    const des = "Content not found";
    const title = "404 error";
    res.render("404",{des:des,name:name,title:title});
})
app.get('*',(req,res)=>{
    const name = "Rax";
    const des = "404 page not found";
    const title = "404 error";
    res.render("404", {des:des,name:name,title:title});
})
app.listen('3000',(req,res)=>{
    console.log("running on port "+`http://localhost:3000/`);
})