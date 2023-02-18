// A server, which handles the mailchimp subscription process using a built-in https module.

"use strict";

const express = require("express");
const app = express();
const https = require("https");
// From express 4.16.0 version, there is a built-in middleware function, that parses incoming request bodies with urlencoded payloads (data in the form "key=value&key=value"). It also adds the 'body' object to the request object, containing parsed data. Thanks to that, we can access the user's input using the 'req.body.x' syntax.
// Let's comment out 'require("body-parser")', as we don't need to import this module anymore.
// const bodyParser = require("body-parser");

// Instead, let's use a built-in middleware function to parse urlencoded payloads.
// Any data submitted by a user on a website comes as a url-encoded payload. Therefore, we have to use the following statement:
app.use(express.urlencoded({ extended: true }));

// We've got to use a middleware function, which enables users to get all files required to render our web page. The express.static() function does this job.
const path = require("path");
app.use(express.static(path.join(__dirname)));

const listID = `ec47cb7864`;
const apiKey = "your_API_key";

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

// To make sure that we get data from the API server before proceding to execute the rest of the code, we've got to use Promises, as any https request is asynchronous.
function httpsGetRequest(options) {
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

function httpsPostRequest(options, userData) {
  return new Promise((resolve, reject) => {
    let data = [];

    const request = https.request(options, (response) => {
      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const response = JSON.parse(data);
        console.log(response.status);
        if (response.status < 200 || response.status > 300) {
          reject(response);
        } else {
          resolve(response);
        }
      });

      response.on("error", (error) => {
        reject(error);
        console.log("There was a problem with the response from the server.");
      });
    });
    request.on("error", (error) => {
      console.log(`There was a problem with the HTTP request, details:
      ${error}`);
    });

    request.write(userData);
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

const addNewMemberOptions = {
  host: "us17.api.mailchimp.com",
  path: `/3.0/lists/${listID}/members`,
  method: "POST",
  auth: `apikey:${apiKey}`,
  headers: {
    "Content-Type": "application/json",
  },
};

// printHttpsRequest(listOptions);
// printHttpsRequest(memberRequestOptions);

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

  const jsonData = JSON.stringify(data);

  httpsPostRequest(addNewMemberOptions, jsonData)
    .then((data) => {
      res.sendFile(__dirname + "/success.html");
    })
    .catch((error) => {
      res.sendFile(__dirname + "/failure.html");
    });
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
