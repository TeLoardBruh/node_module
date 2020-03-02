const request = require('request');

const forcast = (latitude,longtitude, callback)=>{
    const urlForCast = 'https://api.darksky.net/forecast/296eb6eae22734556efc5ed31ec19cef/'+latitude+','+longtitude+'?units=si';
    request({url:urlForCast, json:true}, (err,res)=>{
        // declare data in here 
        const {error,daily,currently} = res.body
        
        if(err){
            callback('Unable to connect Network on service!', undefined);
        }else if(error){
            callback("Unable to find location", undefined);
        }else{
            callback(undefined, daily.data[0].summary+"The temperature is : "+ currently.temperature + " there is of "+ currently.precipProbability + "% rain")
        }
    }) 

}

//     const latitude = res.body.features[0].center[0];
//     const longtitude = res.body.features[0].center[1];
//     console.log("latitude is :", latitude, " longtitude is : ", longtitude);
module.exports = forcast;