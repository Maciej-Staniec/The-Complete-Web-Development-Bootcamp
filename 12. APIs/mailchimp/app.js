"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const path = require("path");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

mailchimp.setConfig({
  apiKey: "your_api_key",
  server: "us17",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

// If we don't use the following code, it won't load css file.
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

app.post("/", (req, res) => {
  res.send(req.body.fname, req.body.lname, req.body.email);
  run();
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
