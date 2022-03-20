import request from "request"

export const geocode = (address,callback) => {
    const geoCodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoicm9oaXR3YWdobWFyZSIsImEiOiJjbDAzajZhbTAxYmQ3M2tvMHF0aWE4MzRrIn0.Bx-DuNY_Rv77p8xoo5H-fg&limit=1"

    request({url:geoCodeURL,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to location services!",undefined)
        }
        else if(response.body.features == ""){
            callback("unable to find location. try another location search!",undefined)
        }
        else{
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}   