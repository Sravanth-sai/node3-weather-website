const request = require('request')


const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=08feba30faeb94e31a7cfa2717b8d1c8&query=' + latitude +','+ longitude +'&units=m'
    // callback(url)

    request( {url, json: true}, (error, response) => {

        if (error){
            callback('Unable to connect to wheather API right now!', undefined)
        } else if (response.body.error) {
            callback ('Bad location request!', undefined)
        } else {
            const info = {
                location: response.body.location.region,
                country: response.body.location.country,
                status: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature,
                feelsLike : response.body.current.feelslike,
                weather: response.body.current.weather_descriptions[0] +
                ". It's currently "+response.body.current.temperature+
                    " out, feels like "+response.body.current.feelslike+
                    ". There is a "+response.body.current.precip+
                    "% chance of rain."
            }
            callback(undefined,info)

            // callback(undefined, "It's currently " + response.body.current.temperature + "degrees out. There is a " + response.body.current.precip +"% chance of rain. Feels like "+ response.body.current.feelslike)
        }

    })

}

module.exports = forecast