"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}\\bmiCalculator.html`);
});

app.post("/", (req, res) => {
  console.log(req.body);
  const height = Number(req.body.height);
  const weight = Number(req.body.weight);
  res.send(`Your BMI is ${Math.round((weight / height ** 2) * 10) / 10}`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
