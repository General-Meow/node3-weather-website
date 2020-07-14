const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//setup the view engine
app.set('view engine', 'hbs')

//expose a public directory to allow access to basic html pages
app.use(express.static(path.join(__dirname, '../public')))

//configure the directories for partials and view templates
const partialsDir = path.join(__dirname, '../templates/partials')
const viewsDir = path.join(__dirname, '../templates/views')
app.set('views', viewsDir)

hbs.registerPartials(partialsDir)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        creator: 'Paul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Paul',
        creator: 'Paul'
    })
})

app.get('/weather', (req, res) => {

    console.log(req.query)
    if(!req.query.address) {
        return res.send({
            error: 'please provide an address'
        })
    }
    const location = req.query.address
    geocode(req.query.address, (error, response) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast(response.long, response.lat, (error, response) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            return res.send({
                location: location,
                forecast: response.temp,
            })
        })
    })
    
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        creator: 'Paul'
    })
})


//wildcard matching
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found?',
        creator: "Paul"
    })
})

//wildcard matching
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        creator: "Paul"

    })
})

app.listen(3000, () => {console.log("Running express app")})