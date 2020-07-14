const request = require("request")

const forecast = (long, lat, callbackFunction) => {
    const url = "http://api.weatherstack.com/current?access_key=437ce33fabfbeef3fa9a5f531b149b92&&query="
        + lat + "," + long
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callbackFunction("A network error has occurred", undefined)
        } else if (body.error) {
            callbackFunction("client error, possibly bad long lat", undefined)
        } else {
            callbackFunction(undefined, {
                temp: body.current.temperature
            })
        }
    })
}

module.exports = forecast