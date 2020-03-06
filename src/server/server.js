let app = require("express")();
let server = require("http").createServer(app);
let Twit = require("twit");
let io = require("socket.io")(server);
let Sentiment = require("sentiment");
require("dotenv").config();
server.listen(8080);

let T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let stream = T.stream("statuses/filter", {
  track: ["coronavirus"],
  language: "en"
});

stream.on("tweet", tweet => {
  let sentiment = new Sentiment();
  let result = {};
  if (tweet.extended_tweet) {
    result = sentiment.analyze(tweet.extended_tweet.full_text);
  } else {
    result = sentiment.analyze(tweet.text);
  }
  tweet.sentiment = result;
  const score = tweet.sentiment.comparative;
  if (score === 0) {
    tweet.color = "#FBBC05";
  } else if (score > 0) {
    tweet.color = "#34A853";
  } else {
    tweet.color = "#EA4335";
  }
  if (!tweet.text.includes("RT")) {
    io.sockets.emit("stream", tweet);
  }
});
