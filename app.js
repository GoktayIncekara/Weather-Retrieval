const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended:true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname +  "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;   //needed express.urlencoded to do this
    const apiKey = "9282ef2102ad8aca82ec769da6b46c77";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            const city = weatherData.name;
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees.");
            res.write("<br>");
            res.write("<img src="+ imageUrl + ">");
            res.send();
        });
    });
});





app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});