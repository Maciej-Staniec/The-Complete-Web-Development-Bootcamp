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

Basically, this is the code that you have to write anytime you want to use a body-parser.
*/
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // __dirname returns the file path of the current file (the js script). No matter where it is hosted - usually file servers are hosted in the cloud.
  res.sendFile(`${__dirname}\\index.html`);
});

app.post("/", (req, res) => {
  // Once we post HTML form, it should send to the user's browser the "Thanks for posting that" text.
  // res.send("Thanks for posting that");

  // Why use body-parser? It allows you to go to any of your routes ("/" in this case) and tap into an object called req.body
  console.log(req.body);
  // Look at the output. It is the same as the output in the browser "Network > localhost > Payload > Form Data" when you submit a form with numbers to calculate.

  /* So the 'body-parser' allows you to parse the HTTP post request and urlencoded to get access to "Form Data" */
  // The data we get is packed into the body object, which we can access as properties. The names of properties come from naming in the html file.
  console.log(req.body.num1);

  res.send(
    `The result of calculation is ${
      Number(req.body.num1) + Number(req.body.num2)
    }`
  );
});

// To make our website accessible locally, we have to make our server listen to client requests on some port. We could use any port, 3000 is just default.
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
