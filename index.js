const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();
const apikey = "61ea9fa2490638e078dd9fe99c784eae";

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.get('/', function (req, res){
    res.render('index', {weather: null, error: null})
})
app.post('/',function(req,res){
    let city= req.body.city
    //let url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&appid=${apikey}`;
    console.log(req.body.city);
    request(url, function(err,response, body){
        if(err){
            res.render("index",{weather: null,error: 'Error,Please try again'});
        }else{
                let weather = JSON.parse(body);
                if(weather.main == undefined){
                    res.render("index",{
                        weather:null,
                        error: 'Error,please try again'
                    });
            } else{
                let weatherText = `It's ${weather.main.temp} degree Celsius with ${weather.weather[0].main} in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
                console.log("body:", body);
                } 
            }
    });
});

app.listen(3000, function(){
    console.log("Weather app listening on port 3000!");
});