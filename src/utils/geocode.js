const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGFsb3BlNTg5MyIsImEiOiJja25jdGd6Nm4xYXBkMnBsY2dzYW1oZzZwIn0.TdPxJue6YLuBwMC-W6sU9w&limit=1'


    request( {url: url, json: true}, (error, response) => {
        const {features} = response.body
        if (error){
            callback('Unable to connect to location API!', undefined)
        } else if (features.length === 0){
            callback('Bad location request!', undefined)
        } else {
            const location = {
                location: features[0].place_name,
                lat: features[0].center[1],
                long: features[0].center[0]
            }
            
            callback(undefined,location)
        }
    })


    // request( {url: url, json: true}, (error, response) => {
    //     if (error){
    //         callback('Unable to connect to location API!', undefined)
    //     } else if (response.body.features.length === 0){
    //         callback('Bad location request!', undefined)
    //     } else {
    //         const location = {
    //             location: response.body.features[0].place_name,
    //             lat: response.body.features[0].center[1],
    //             long: response.body.features[0].center[0]
    //         }
            
    //         callback(undefined,location)
    //     }
    // })

}


module.exports = geocode