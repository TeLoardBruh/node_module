const geoCode = require('./utils/geoCode');
const forcast = require('./utils/forcast');

const address = process.argv[2]
if(!address){
    console.log("Please enter another address");
}
else{
     // declare data in here 
    geoCode(address, (err, {latitude,longtitude, location}) => {
        if (err) {
            return console.log(err);
        }
        // console.log("Error ", err);
        // console.log("Data :" ,data);
        console.log(location);
        forcast(latitude, longtitude, (err, forcastData) => {
            if (err) {
                return console.log(err);
            }
            console.log("Data ", forcastData);
        })
    })
}
