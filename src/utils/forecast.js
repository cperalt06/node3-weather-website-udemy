const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4c416eb8e57610f704ca85a1acbb1134&query=${latitude},${longitude}&units=f`;

    request({ url, json:true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the weather services!', undefined);
        }  
        else if(body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            const currentWeather = body.current;
            callback(undefined, `${currentWeather.weather_descriptions[0]}. It is currently ${currentWeather.temperature} degrees out. It feels like ${currentWeather.feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;