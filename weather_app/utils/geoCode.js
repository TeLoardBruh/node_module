const request = require('request');

const geoCode = (address, callback) =>{
    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmV3dXNlcnJheCIsImEiOiJjazc5emh1N2YweWptM2hsa211MndpZGx1In0.5vrP4R-rqjeNE5zvZPD8oA';

    request({url: urlGeo, json: true},(err, res)=>{
        // declare data in here 
        const {length,center,place_name} = res.body.features[0]
        if(err){
            callback('Unable to connect Network on service!', undefined);
        }else if(length === 0){
            callback('Unable to find location on service!',undefined)
        }else{
            callback(undefined, {
                longtitude: center[0],
                latitude: center[1],
                location: place_name
            })
        }
    })
}

module.exports = geoCode;
