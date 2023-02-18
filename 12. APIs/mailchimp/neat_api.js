"use strict";

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const listID = `ec47cb7864`;
const apiKey = "your_API_code";

const listOptions = {
  // We don't need to specify the request method, as mailchimp doesn't require to do so, but some APIs might still need this to be specified.
  method: "GET",
  // By using the 'host:' option, we can specify the root URL and then by using a 'path' option, we can pass in any endpoint we want.
  host: "us17.api.mailchimp.com",
  path: `/3.0/lists/${listID}`,
  // port: 8080,
  // THe mailchimp API accepts two formats of authentication options.
  // One of them is 'username:apiKey', and the other one is 'apikey:apiKey'.
  auth: `username:${apiKey}`,
  // It isn't neccessary to add the following code, but it is advisable to do so, as some APIs don't accept options in JSON format by default.
  headers: {
    "Content-type": "application/json",
  },
};

// To make sure that we get data from the API server before proceding to execute the rest of the code, we've got to use Promises, as any https request is asynchronous. Promise
function httpsRequest(options) {
  return new Promise((resolve, reject) => {
    let data = [];
    const request = https.request(options, (response) => {
      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        let audience = JSON.parse(data);
        // console.log(audience);
        // If the
        resolve(audience);
      });

      // This handles any error from the server such as a network error or a server error. The 'error' object gets created when an error occurs. The response.on('error', (error)=>{}) indicates to listen for errors occuring on the server side. Once the error occurs, the 'reject' function gets executed to indicate to the rest of the code that the promise wasn't resolved succesfully. This is usually done by .catch((error)=>{}) block.
      response.on("error", (error) => {
        console.log(`response.on(error)`);
        reject(error);
      });
    });
    // This handles any error when sending a request to the server such as network error or incorrect URL. Once the error occurs, the 'reject' function gets executed to indicate to the rest of the code that the promise wasn't resolved succesfully. This is usually done by .catch((error)=>{}) block.
    request.on("error", (error) => {
      console.log(`request.on(error)`);
      reject(error);
    });
    // Because we use https.request() method, not https.get(), we have to end the request explicitly using the .end() method. https.request() is more flexible, as we can specify request options usually packed in an object, just like we did using the 'listInfoOptions'. On the other hand, the https.get() is a GET request. In this case, we don't have to specify the type of request.
    request.end();
  });
}

// The following function allows you to print the result of the promise. Thanks to that, our code can stay DRY.
function printHttpsRequest(options) {
  httpsRequest(options)
    .then((data) => {
      console.log(".then((data)=>{}) callback function running");
      console.log(data);
    })
    .catch((error) => {
      console.log(".catch((error)=>{}) callback function running");
      console.error(error);
    });
}

const memberRequestOptions = {
  // By using the 'host:' option, we can specify the root URL and then by using a 'path' option, we can pass in any endpoint we want.
  host: "us17.api.mailchimp.com",
  path: `/3.0/lists/${listID}/members`,
  // THe mailchimp API accepts two formats of authentication options.
  // One of them is 'username:apiKey', and the other one is 'apikey:apiKey'.
  auth: `apikey:${apiKey}`,
  method: "GET",
  // It isn't neccessary to add the following code, but it is advisable to do so, as some APIs don't accept options in JSON format by default.
  headers: {
    "Content-type": "application/json",
  },
};

printHttpsRequest(listOptions);
printHttpsRequest(memberRequestOptions);

