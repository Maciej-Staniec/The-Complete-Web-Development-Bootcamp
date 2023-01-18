"use strict";

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  // __dirname returns the file path of the current file (the js script). No matter where it is hosted - usually file servers are hosted in the cloud.
  res.sendFile(`${__dirname}\\index.html`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
