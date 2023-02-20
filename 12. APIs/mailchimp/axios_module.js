// A server, which handles the mailchimp subscription process using an axios module.
// The axios module provides a simple and consistent API for performing HTTP requests, handling errors and handling response data. It's easier and more intuitive compared to a built-in https module.

"use strict";
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

// app.use() mounts all 'middleware' functions so that they get invoked. In this case, they get invoked at any URL path, as we haven't specified it.
// Middleware functions can modify request and response objects, as well as call the next() function.
// The express.static() is a built-in middleware function in Express framework, that serves static assets as images, CSS files and JavaScript files. It take only one argument, which specified the root directory of those files. Because we imported the 'path' module previously, it helps us to specify the root directory. The path.join(__dirname) resolves to the root directory.
// The path.join() is a method provided by the built -in 'path' module.It is used to join multiple path segments into a single path string.
// The '__dirname' is a global variable in Node.js which represents the directory of the current executing script.It contains an absolute path of the directory.
// The reason why path.join() is used instead of just using __dirname directly is to ensure that the path is constructed correctly regardless of the operating system. Different operating systems use different path separators (e.g. / for Unix-based systems and \ for Windows), so path.join() is used to handle this automatically and ensure that the correct path separator is used.
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

const listID = "your_list_ID";
const apiKey = "your_api_key";

// The app.get() method process all GET requests at the specified URL path, which is '/' in this case. The callback function (a route handler) is a function which gets executed, when the user make a GET request at the '/' URL path.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const data = {
    email_address: req.body.email,
    status: "subscribed",
    merge_fields: {
      FNAME: req.body.fname,
      LNAME: req.body.lname,
    },
  };

  const options = {
    url: `https://us17.api.mailchimp.com/3.0/lists/${listID}/members`,
    method: "POST",
    auth: {
      username: `apikey`,
      password: `${apiKey}`,
    },
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(options)
    .then((response) => {
      console.log(response.data.status);
      res.sendFile(__dirname + "/success.html");
    })
    .catch((error) => {
      console.log(error.response.data);
      res.sendFile(__dirname + "/failure.html");
    });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
