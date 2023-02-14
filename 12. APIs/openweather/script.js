"use strict";

const express = require("express");
const https = require("https");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// const units = ["standard", "imperial", "metric"];
const apiKey = "your_api_key";


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const units = req.body.units;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  console.log(weatherURL);

  const weatherData = await new Promise((resolve, reject) => {
    https.get(weatherURL, (response) => {
      console.log(response.statusCode);
      let data = "";

      response.on("data", (dataChunk) => {
        data += dataChunk;
      });

      response.on("end", () => {
        resolve(JSON.parse(data));
      });

      response.on("error", () => {
        reject(error);
      });
    });
  });
  // res.send(weatherData);

  const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  res.send(`<h1>${city}</h1>
  <p>Temperature: ${Math.round(weatherData.main.temp)}</p>
  <p>Feels like: ${Math.round(weatherData.main.feels_like)}</p>
  <p>${weatherData.weather[0].description}</p>
  <p><img src="${icon}"/></p>`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
