const Twit = require("twit");
const sentiment = require("../sentiment/sentimentAnalysis.js");
const cors = require("cors");
require("dotenv").config();

module.exports = (app, io) => {
  let T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  let tStream = null;
  let topic = null;
  app.locals.count = 1;
  app.locals.good = 0;
  app.locals.bad = 0;
  app.locals.neutral = 0;

  io.on("connection", socket => {
    console.log("Client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      resetLocalCount();
    });
  });

  const stream = () => {
    let stream = T.stream("statuses/filter", { track: topic });
    stream.on("tweet", tweet => {
      sendMessage(tweet);
    });
    stream.on("error", error => {
      console.log(error);
    });
    tStream = stream;
  };

  const sendMessage = msg => {
    const tempTweet = sentiment(msg, app);
    if (!tempTweet.text.includes("RT")) {
      io.sockets.emit("tweets", tempTweet);
    }
    io.sockets.emit("count", {
      count: app.locals.count,
      good: app.locals.good,
      bad: app.locals.bad,
      neutral: app.locals.neutral
    });
    app.locals.count++;
  };

  const resetLocalCount = () => {
    app.locals.count = 1;
    app.locals.good = 0;
    app.locals.bad = 0;
    app.locals.neutral = 0;
  };

  app.get("/changeTopic", cors(), (req, res) => {
    tStream && tStream.stop();
    topic = req.query.topic;
    res.json({
      status: "success",
      yay: topic
    });
  });

  app.get("/play", cors(), (req, res) => {
    res.status(200).json({
      status: "success",
      yay: "play"
    });
    stream();
  });

  app.get("/pause", cors(), (req, res) => {
    tStream && tStream.stop();
    res.json({
      status: "success",
      yay: "paused"
    });
  });

  app.get("/stop", cors(), (req, res) => {
    tStream && tStream.stop();
    resetLocalCount();
    res.json({
      status: "success",
      yay: "stoped"
    });
  });
};
