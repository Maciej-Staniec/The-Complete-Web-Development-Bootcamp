// This script uses the mailchimp library.

"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const path = require("path");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

const audienceID = "ec47cb7864";

mailchimp.setConfig({
  apiKey: "your_api_key",
  server: "us17",
});

// Check for a response from the mailchimp server.
async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();

// If we don't use the following code, it won't load css file.
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

// We're going to use promises, so that the code stops from executing, until a new member gets added to our mailchimp subscriber list. Therefore, we need the 'async' keyword before the (req, res) arrow function.
app.post("/", async (req, res) => {
  // Get the user's input from the signup form.
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const mailbox = req.body.email;

  // Create a new subscriber using previously fetched user details with mailchimp library.
  // We need to make the addNewMember function to wait for a promise using the 'await' keyword.
  const addNewMember = await mailchimp.lists
    .addListMember(
      "your_audience_ID",
      // {
      //   skipMergeValidation: false,
      // },
      {
        email_address: mailbox,
        status: "pending",
        // merge_fields is an object, in which we can pass in optional details like first name, last name, birthday etc.
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }
    )
    // This is how we can check the status of a promise in javascript - using .then() method.
    // If we get the 200 http status code, the response is triggered and passed in to the callback function as 'success' object, so we can see its content and give instructions what to do in case of successful response.
    .then(
      (success) => {
        console.log(success);
        res.sendFile(__dirname + "/success.html");
      },
      // If we get an http code different from 200, then the callback function gets triggered and the 'error' is a response, which is passed in as an object to our arrow function, so that we can see its content. We can also define what to do in case of the response failure.
      (error) => {
        console.log(error);
        res.sendFile(__dirname + "/failure.html");
      }
    );
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
