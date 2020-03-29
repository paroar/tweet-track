const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");

require("./stream/streamTweets.js")(app, io);

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Node service is up and running!!!'))


server.listen(8080, () => {
  console.log("Listening at 8080");
});
