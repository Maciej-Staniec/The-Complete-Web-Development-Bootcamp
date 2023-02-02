"use strict";

import express from "express";
import { get } from "https";
const app = express();

const city = "Warrington";
const countryCode = "GB";
const apiKey = "5535ef8ca0e0e33a597c83028393f925";

// This is the URL that we need to pass in the https.get() method, to get the latitude and longtitude of the city.
const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`;

let currentTemperatureURL;

async function getGeoLocation() {
  return new Promise((resolve, reject) => {
    // Get latitude and longtitude of the desired city using https module and its get() method.
    get(geoURL, (response) => {
      let data = "";

      // Check if we get a response from the server.
      if (response.statusCode === 200) {
        console.log("The request was successful");
      } else {
        console.log(
          `The request failed with status code = ${response.statusCode}`
        );
      }

      // The https module is designed to receive data in chunks to reduce the overhead and speed up processing. Therefore, we have to add up each chunk of data to a variable each time it gets data response.
      response.on("data", (chunk) => {
        data += chunk;
        console.log("Getting chunks of data");
      });

      // Once the data response is finished (The API sent all requested information), we want to parse this data into a javascript object (convert to a javascript object), so that we can access data as parameters.
      response.on("end", () => {
        try {
          const geoData = JSON.parse(data);
          resolve(geoData);
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", (error) => {
      reject(error);
    });
  });
}

async function getTemperature() {
  return new Promise((resolve, reject) => {
    get(currentTemperatureURL, (response) => {
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
        try {
          const tempData = JSON.parse(data);
          resolve(tempData);
        } catch {
          reject(error);
        }
      });
    }).on("error", (error) => {
      reject(error);
    });
  });
}

app.get("/", async (req, res) => {
  // We want to request information on user request from the browser, that's why https requests are situaded within app.get() method.
  try {
    const geoData = await getGeoLocation();
    // res.json({ latitude: geoData[0].lat, longtitude: geoData[0].lon });
    // res.send(
    //   `<p>latitude: ${geoData[0].lat}, longitutde: ${geoData[0].lon}</p>`
    // );
    // res.json(geoData);
    const latitude = geoData[0].lat;
    const longtitude = geoData[0].lon;
    currentTemperatureURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&units=metric&appid=${apiKey}`;
    const tempData = await getTemperature();
    // res.json(tempData);
    res.send(
      `<h1>${tempData.name}</h1><p>temperature: ${Math.round(
        tempData.main.temp
      )}°C</p><p>pressure: ${tempData.main.pressure} hPa</p>`
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // Make another https request, but this time we want to request the temperature of a specific location using previously obtained latitude and longtitude coordinates.
});

app.listen(3000, () => {
  console.log("The server is running on port 3000.");
});
