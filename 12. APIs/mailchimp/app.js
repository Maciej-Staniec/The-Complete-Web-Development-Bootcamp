"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const path = require("path");

const app = express();

// If we don't use the following code, it won't load css file.
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

app.post("/", (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});