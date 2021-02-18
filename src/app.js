const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode  = require('./utils/geocode');
const forecast  = require('./utils/forecast');
const app = express();

// Define paths for express config.
const publicDirectoryPath = path.join(__dirname , '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Default site to load when the user goes to the root directory of the website.
// Another definition: Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        head_title: 'Home Page',
        title: 'Weather App',
        name: 'Carlos'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        head_title: 'About',
        title: 'About Page',
        img: '/img/robot.png',
        name: 'Carlos'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        head_title: 'Help',
        title: 'Help Page',
        helpText: 'Veniam ut nisi irure ea et sint elit consectetur ipsum fugiat consectetur dolore. Dolor eu tempor tempor Lorem ex in. Anim ipsum tempor esse ut enim esse nisi ex eu duis exercitation id.',
        name: 'Carlos'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'An address must be provided.'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            // To display a web page/text, we use the res.send() method.
            res.send({
                forecast: forecastData,
                location,
                address: address
            });
        })
    });

});

hbs.registerHelper('currentYear', function(block) {
    return new Date().getFullYear();
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        head_title: '404',
        title: '404',
        name: 'Carlos',
        errorMessage : 'Help article not found.',
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        head_title: '404',
        title: '404',
        name: 'Carlos',
        errorMessage: 'Page not found',
    });
});

// app.listen is what starts up the server and waits for the users to connect.
app.listen(3000, () => {
    console.log('Server started on port 3000.');
});