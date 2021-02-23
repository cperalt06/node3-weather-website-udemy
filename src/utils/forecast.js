const request = require('postman-request');

// Import the environment variables from the .env file
const dotenv = require('dotenv');
dotenv.config();

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API}&query=${latitude},${longitude}&units=f`;

    request({ url, json:true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the weather services!', undefined);
        }
        else if(body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            const currentWeather = body.current;
            callback(undefined, {
                weather_desc: `${currentWeather.weather_descriptions[0]}. It is currently ${currentWeather.temperature} degrees out. It feels like ${currentWeather.feelslike} degrees out.`,
                img: currentWeather.weather_icons
            });
        }
    });
}

module.exports = forecast;