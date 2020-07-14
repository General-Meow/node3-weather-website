const request = require("request")


const geocode = (location, callbackFunction) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoicGF1bGhvYW5nIiwiYSI6ImNrYzVhZGtnejBmdWEyeXRpNHBtYWhsNzUifQ.DG_Bk6WnJtXdMP61YQ-Vmg'

    request({
        url,
        json: true
    }, (error, response) => {
        if(error) {
            callbackFunction("Error occurred, possibly no network connection", undefined)
        } else if (response.statusCode >= 400 || !response.body.features[0]) {
            callbackFunction("Error occurred possibly bad request or server issue", undefined)
        } else {
            let geoInfo = response.body.features[0].center
            callbackFunction(undefined, {
                long: geoInfo[0],
                lat: geoInfo[1]
            })  
        }
    })
}

module.exports = geocode