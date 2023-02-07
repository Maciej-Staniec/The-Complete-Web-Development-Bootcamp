"use strict";

const express = require("express");
const https = require("https");
// const bodyParser = require("body-parser");
const app = express();

app.get("/", async (req, res) => {
  const apiKey = "5535ef8ca0e0e33a597c83028393f925";
  const city = "London";
  const countryCode = "GB";
  const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`;

  const geoCoordinates = await new Promise((resolve, reject) => {
    let data = "";

    https.get(geoURL, (response) => {
      console.log(response.statusCode);

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve(JSON.parse(data));
      });

      response.on("error", () => {
        reject(error);
      });
    });
  });

  const lat = geoCoordinates[0].lat;
  const lon = geoCoordinates[0].lon;
  const cityURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  const tempData = await new Promise((resolve, reject) => {
    let data = "";

    https.get(cityURL, (response) => {
      console.log(response.statusCode);
      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve(JSON.parse(data));
      });

      response.on("error", () => {
        reject(error);
      });
    });
  });

  const temperature = Math.round(tempData.main.temp);
  const iconURL = `http://openweathermap.org/img/wn/${tempData.weather[0].icon}@2x.png`;

  // const icon = await new Promise((resolve, reject) => {
  //   let data = "";

  //   https.get(iconURL, (response) => {
  //     response.on("data", (chunk) => {
  //       data += chunk;
  //     });

  //     response.on("end", () => {
  //       resolve(data);
  //     });
  //     response.on("error", () => {
  //       reject(error);
  //     });
  //   });
  // });
  console.log(iconURL);
  res.write(`<h1>The temperature in ${city} is ${temperature} &degC.</h1>`);
  res.write(`<h3>Weather description: ${tempData.weather[0].description}`);
  res.write(
    `<p>The visibility is ${tempData.visibility > 5000 ? "good" : "bad"}.</p>`
  );
  res.write(
    `<p>Today's pressure is ${
      tempData.main.pressure
    } hPa, and the wind speed is ${
      tempData.wind.speed < 5 ? "low" : "high"
    }.</p>`
  );
  res.write(`<img src="${iconURL}"/>`);
  res.send();
});

const port = 3000;
app.listen(port, () => {
  console.log(`The server is listening on port ${port}.`);
});
