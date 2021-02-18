const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoiY2FpZG8wOTEzIiwiYSI6ImNrajhyYnYxODQ2MmQycXFqOTl2bTB6dDEifQ.39duvHQKoiHPOKUUr2bxNg&limit=1`;

    request({ url, json:true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to the location services!', undefined);
        }  
        else if(body.features == null || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;