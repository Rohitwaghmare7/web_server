import request from "request"

export const forecast = (latitude,longitude,callback) => {
    const url ="http://api.weatherstack.com/current?access_key=604abe85ac83401dd2bf2a396853d237&query="+latitude+","+longitude

    request({url,json:true},(error,responce)=>{
        if(error){
            callback("unable to connect to location services!",undefined)
        }
        else if(responce.body.error){
            callback("unable to find location. try another location search!",undefined)
        }
        else{
            callback(undefined,responce.body.current.weather_descriptions +" it is currently "+responce.body.current.temperature + " degrees out. it is feels like "+ responce.body.current.feelslike +" degrees out")
        }
    })
}