'use strict'

const express = require('express')
const https = require('https')
const app = express();

units = ['standard', 'imperial', 'metric']

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`