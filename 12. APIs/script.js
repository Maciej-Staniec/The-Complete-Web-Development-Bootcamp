"use strict";

const express = require("express");
const https = require("https");
const app = express();

const city = "Warrington";
const countryCode = "GB";
const apiKey = "5535ef8ca0e0e33a597c83028393f925";

// This is the URL that we need to pass in the https.get() method, to get the latitude and longtitude of the city.
const apiGeoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`;

let latitude, longtitude, currentWeatherURL, weatherInfo;

// Get latitude and longtitude of the desired city using https module and its get() method.
https.get(apiGeoURL, (response) => {
  let geoData = "";

  // Check if we get a response from the server.
  if (response.statusCode === 200) {
    console.log("The request was successful");
  } else {
    console.log(`The request failed with status code = ${response.statusCode}`);
  }

  // The https module is designed to receive data in chunks to reduce the overhead and speed up processing. Therefore, we have to add up each chunk of data to a variable each time it gets data response.
  response.on("data", (chunk) => {
    geoData += chunk;
    console.log("Getting chunks of data");
  });

  // Once the data response is finished (The API sent all requested information), we want to parse this data into a javascript object (convert to a javascript object), so that we can access data as parameters.
  response.on("end", () => {
    const geoCoordinates = JSON.parse(geoData);
    latitude = geoCoordinates[0].lat;
    longtitude = geoCoordinates[0].lon;
    currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&units=metric&appid=${apiKey}`;
  });
});

app.get("/", (req, res) => {
  // We want to request information on user request from the browser, that's why https requests are situaded within app.get() method.

  // Make another https request, but this time we want to request the temperature of a specific location using previously obtained latitude and longtitude coordinates.
  https.get(currentWeatherURL, (response) => {
    if (response.statusCode === 200) {
      console.log("The request was successful");
    } else {
      console.log(
        `The request failed with status code = ${response.statusCode}`
      );
    }

    let data = "";

    response.on("data", (dataChunk) => {
      data += dataChunk;
    });

    response.on("end", () => {
      weatherInfo = JSON.parse(data);
      console.log(weatherInfo);
      console.log(weatherInfo.name);
      const temp = Math.trunc(weatherInfo.main.temp);
      res.send(
        `<h1>${weatherInfo.name}</h1><p>The temperature is ${temp} degrees Celsius</p>`
      );
    });
  });
});

app.listen(3000, () => {
  console.log("The server is running on port 3000.");
});
