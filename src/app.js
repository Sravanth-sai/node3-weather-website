const path = require('path')
const express = require('express')
const hbs = require('hbs')

//loading geocode and forecast

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT

// Define paths for Express config
const pathToPublic = path.join(__dirname,'../public')
const pathToViews = path.join(__dirname, '../templates/views')
const pathToPartials = path.join(__dirname, '../templates/partials')

// Setup handelers engine and views location
app.set('view engine','hbs')
app.set('views', pathToViews)
hbs.registerPartials(pathToPartials)

//Setup handelers directory to serve
app.use(express.static(pathToPublic))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sravanth'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About Page',
        name: 'Sravanth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message!',
        title: 'Help Page',
        name: 'Sravanth'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send( {
            error: 'Address is Required!'
        } )
    }

    geocode(req.query.address, (error, {location, lat, long} = {}) => {
        if(error) {
            return res.send( {
                error: error
            })
        }
        forecast(lat, long, (error, {status, temp, feelsLike,weather}) => {
            if (error) {
                return res.send ({
                    error: error
                })
            }
            res.send({
                Address: req.query.address,
                location: location,
                lattitude: lat,
                longitude: long,
                Current: status,
                temperature: temp,
                feelslike: feelsLike,
               weather: weather
            })

        })
    } )
    // res.send({
    //     Address: req.query.address,
    //     forecast: 30,
    //     location: 'Goa'
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
       return res.send( {
            error: 'You must Provide a query'
        } )
    }
    console.log(req.query.search)


    res.send( {
        products: []
    } ) 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error_msg: 'Help article not found',
        name: 'Sravanth'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404!',
        error_msg: 'Page not found',
        name: 'Sravanth'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+ port +"True")
})