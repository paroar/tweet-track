const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.NODE_PORT || 8080;
require('dotenv').config()
require("./stream/streamTweets.js")(app, io);

server.listen(port, () => {
  console.log(`Listening at ${port}`);
});
