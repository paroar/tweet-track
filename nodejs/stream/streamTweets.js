const twitter = require("./twitter.js");
const T = twitter.getT();

const sentiment = require("../sentiment/sentimentAnalysis.js");

const cors = require("cors");

const fetch = require("node-fetch");
const logstashUrl = {
  es: "http://logstash:5000",
  mongo: "http://logstashmongo:5001"
}

module.exports = (app, io) => {

  let tStream = null;
  let topic = null;

  io.on("connection", socket => {
    console.log("Client connected");
    resetLocalCount();
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

    //sockets
    io.sockets.emit("tweets", tempTweet);
    io.sockets.emit("count", {
      count: app.locals.count,
      good: app.locals.good,
      bad: app.locals.bad,
      neutral: app.locals.neutral
    });
    app.locals.count++;

    //logstash
    Object.values(logstashUrl).forEach( url => {
      fetch(url, {
        method: 'post',
        body: JSON.stringify(tempTweet),
        headers: { 'Content-Type': 'application/json' },
      }).catch(err => console.log(err));
    });
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
      action: "changeTopic",
      topic: topic
    });
  });

  app.get("/play", cors(), (req, res) => {
    res.status(200).json({
      status: "success",
      action: "play"
    });
    stream();
  });

  app.get("/pause", cors(), (req, res) => {
    tStream && tStream.stop();
    res.json({
      status: "success",
      action: "paused"
    });
  });

  app.get("/stop", cors(), (req, res) => {
    tStream && tStream.stop();
    resetLocalCount();
    res.json({
      status: "success",
      action: "stoped"
    });
  });
};
