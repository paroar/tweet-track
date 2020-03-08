const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

require("./stream/streamTweets.js")(app, io);
require("./routes/routes.js")(app);

server.listen(8080, () => {
  console.log("Listening at 8080");
});
