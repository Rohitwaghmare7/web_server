import express from "express"
import path from "path"
import hbs from "hbs"
import { forecast } from "./utils/forecast.js"
import { geocode } from "./utils/geocode.js"

import { fileURLToPath } from 'url'  
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const publicDirectoryPath = path.join(__dirname,"../public/")
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get("",(req, res)=> {
    res.render("index",{
        title: "Weather App",
        name: "Rohit"
    })
})   

app.get("/help",(req, res) => {
    res.render("help",{
        title: "help",
        helpText: "This is help text",
        name: "Rohit" 
    })
})

app.get("/about",(req, res) => {
    res.render('about',{
        title:"About",
        name: "Rohit" 
    })
})
 
app.get("/weather",(req, res) => {
   if(!req.query.address){
       return res.send({
           error: "you must provide an address!"
       })
   }

   geocode(req.query.address,(error, {latitude,longitude,location}) => {
    if(error){ 
         return res.send({error})
    }
 
    forecast(latitude,longitude,(error,forecastData) => {
     if(error){
        return res.send({error})
     }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
     })

   })
})

app.get("/help/*",(req, res) => {
    res.render("404",{
        title: "404",
        errormessage: "help artical is not found",
        name: "Rohit" 
    })
})

app.get("/products",(req,res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products : []
    })
})

app.get("*",(req, res) => {
    res.render("404",{
        title: "404",
        errormessage: "page not found",
        name: "Rohit" 
    })
})

app.listen(3000,() => {
    console.log("server is up on port 3000")
})