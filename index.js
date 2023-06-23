import express from "express";
import https from "https";
import bodyParser from "body-parser";
import exp from "constants";

const app = express();
const port = 4020;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static("public"));
app.set("view engine","ejs");


app.get("/",(request,response)=>
{
    
    response.sendFile("/Users/chirag/Desktop/nodetut/weather app/views/index.html");
});


app.post("/",(request,response)=>
{
    // console.log(request.body.cityName);
    const query = request.body.cityName;
    const apiKey = "b0f5155fd947d2b263846636ccc17d86";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;

    https.get(url,(response1)=>
    {
        console.log(response1.statusCode);
        response1.on("data",(data)=>
        {
            const weatherData = JSON.parse(data);
            const Cname = weatherData.name;
            const temp = weatherData.main.temp;
            const windSpeed = weatherData.wind.speed;
            const weatherDescp = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            const humidity = weatherData.main.humidity;

            // response.write("<h1>the temp in "+query+ " is "+temp+"degree celcius.<h1>"); 
            // response.write("<img src="+imgURL+">");
            // response.send();
            // response.send("the tempreture in london is" + temp + " the weather description " + weatherDescp);
            response.render("page",{t:temp,s:windSpeed,desc:weatherDescp,img:imgURL,hum:humidity,name:Cname});
        });
        
    });
    //  response.send("recived");
});


app.listen(port,()=>
{
    console.log(`server : ${port}`);
});