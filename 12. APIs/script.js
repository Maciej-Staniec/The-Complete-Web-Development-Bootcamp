"use strict";

const express = require("express");
const https = require("https");
const { allowedNodeEnvironmentFlags } = require("process");
const app = express();

const units = ["standard", "imperial", "metric"];
const apiKey = "5535ef8ca0e0e33a597c83028393f925";
let city = "";

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
