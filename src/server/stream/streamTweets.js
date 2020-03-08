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

  app.locals.stream = null;
  app.locals.topic = "coronavirus";
  app.locals.count = 1;
  app.locals.good = 0;
  app.locals.bad = 0;
  app.locals.neutral = 0;

  let isStream = false;

  io.on("connection", socket => {
    if (!isStream) {
      stream();
      console.log("Client connected");
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      resetLocalCount();
    });
  });

  const stream = () => {
    let stream = T.stream("statuses/filter", { track: app.locals.topic });
    stream.on("tweet", tweet => {
      sendMessage(tweet);
    });
    stream.on("error", error => {
      console.log(error);
    });
    isStream = true;
    app.locals.stream = stream;
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
    app.locals.stream.stop();
    app.locals.topic = req.query.topic;
    res.json({
      status: "success",
      yay: app.locals.topic
    });
    stream();
  });
};
