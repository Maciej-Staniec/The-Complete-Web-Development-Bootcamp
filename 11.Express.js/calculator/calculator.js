"use strict";

const express = require("express");
// In order to fetch data from the HTML form, we need to parse it first. To do that, we've got to install body-parser.
const bodyParser = require("body-parser");

const app = express();

// body-parser works with express, so we can pass it into the app.use() method.
/* 
body-parser has a few modes:
1. body-parser.text() - parse the request info into text
2. body-parser.json() - parse the request info into json format (new XML format)
3. body-parser.urlencoded() - parse data that comes from an HTML form. Whenever we're trying to grab information that gets posted to our server from an HTML form, use urlencoded(). This is the one we're going to use.

In addition we must explicitly declare an extended option to make body-parser work, syntax: urlencoded({extended : true/false}).
It allows us to post nested objects. It's not something that we're going to be using. It is something that the body-parser require you to explicitly declare.
*/
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // __dirname returns the file path of the current file (the js script). No matter where it is hosted - usually file servers are hosted in the cloud.
  res.sendFile(`${__dirname}\\index.html`);
});

app.post("/", (req, res) => {
  // Once we post HTML form, it should send to the user's browser the "Thanks for posting that" text.
  res.send("Thanks for posting that");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
