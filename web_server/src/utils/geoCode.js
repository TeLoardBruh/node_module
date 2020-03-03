const request = require('request');

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmV3dXNlcnJheCIsImEiOiJjazc5emh1N2YweWptM2hsa211MndpZGx1In0.5vrP4R-rqjeNE5zvZPD8oA';

    request({url, json: true},(err, {body})=>{
        // declare data in here 
        // const {center,place_name} = res.body.features[0];
        // const {length} = res.body.features;
        if(err){
            callback('Unable to connect Network on service!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location on service!',undefined);

        }else{
            callback(undefined, {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;
