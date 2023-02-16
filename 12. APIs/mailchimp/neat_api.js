"use strict";

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const audienceID = `ec47cb7864`;
const rootURL = "https://us17.api.mailchimp.com/3.0/";
const getListInfo = {
  method: "GET",
  url: rootURL + `lists/${audienceID}`,
  auth: "user_API",
};
const createNewMember = {
  method: "POST",
  url: rootURL + `lists/${audienceID}/members`,
  auth: "user_API",
};
