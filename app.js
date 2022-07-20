const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
res.sendFile(__dirname+"/index.html");
});



app.post("/", function(req, res){
const query=   req.body.cityName;
const apikey = "158e807f6a8a481ad2148c3dcb44f6a8";
const unit = "metric";

const url ="http://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apikey +"&units="+unit ;

http.get(url, function(response){

response.on("data", function(data){
  const weatherData=JSON.parse(data); //Storing weather data  in Jason format
   console.log(weatherData);
  const temp =weatherData.main.temp ;
  const icon = weatherData.weather[0].icon ;
  const main = weatherData.weather[0].main ;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const city=weatherData.name ;
  const imgURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png" ;
  const description = weatherData.weather[0].description; 
 res.write("<h1> Temperature in "+ query+" is "+temp +" degree C.</h1>");
  res.write("<h1>The weather is currently " +description +" </h1>" );
  res.write("<img src="+ imgURL +">"+"</p>");
  res.write(main);
  res.write("<p>Humidity: "+humidity+"</p>");
  res.write("<p>Wind speed: "+windSpeed+"</p>");
  res.send();
})
});


});
 
app.listen(3000, function(){
  console.log("This server is running on port 3000");
});
