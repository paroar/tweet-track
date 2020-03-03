let app = require("express")();
let server = require("http").createServer(app);
let Twit = require("twit");
let io = require("socket.io")(server);
require("dotenv").config();
server.listen(8080);

let T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let stream = T.stream("statuses/filter", { track: "coronavirus" });

stream.on("tweet", tweet => {
  io.sockets.emit("stream", tweet);
  console.log(tweet);
});
