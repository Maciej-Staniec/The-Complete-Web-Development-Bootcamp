const { application } = require("express");
const express = require("express");
const app = express();
const port = 3000;

/* 
app.get is the express method that allows us to specify what should happen when a browser gets in touch
with our server and makes a get request.
The first parameter it takes ("/" in this case) is the location of the get request. '/' represents the root of our website - our home page. When that request happens, we can trigget a callback function, and this callback function can have two parameters:
1. request
2. response
So in our case, the app.get() method gets triggered once we type in the browser the FQDN of our website.
Because we run the server locally, the fqdn will be: localhost:port. Once we set up our server on some public hosting service, we can use a normal domain name.
 */
app.get("/", (request, response) => {
  // Let's print out the 'request' object when the callback function is triggered.
  // As you can see it is a very long text to read. It contains all request information, like what browser is used, in what languages it can show the page etc. You can also see what URL was accessed when the request was triggered.
  console.log(request);

  // Once the servers gets requested, it outputs to the web browser whatever we specify.
  response.send("<h1><strong>Hello World!</strong></h1>");
});

// If somebody browse a contact page, let's response with the folliwng:
app.get("/contact", (req, res) => {
  res.send("<p>Contact me @ cleva.likes.barf@mail.com");
});

// Display about page if /about is requested.
app.get("/about", (req, res) => {
  res.send(`<h1>Maciej Staniec</h1>
  <h2> Yes, it's me</h2>
  <p>Gues who is back!</p>`);
});

// It is painful to restart the server everytime we add something to the script. To mitiage this issue, let's install nodemon utility, which monitors for any changes in the source code and automatically restart our server.
// npm -install -g nodemon

// Time to add another subpage to test whether the nodemon utility works.

app.get("/hobbies", (req, res) => {
  res.send(
    "<li>Bushcraft</li><li>Programming</li><li>Technology</li><li>Psychology</li>"
  );
});

app.get("/test", (req, res) => {
  res.send("Test page");
});

// The following statement displays in the console on what port is the server listening on
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
