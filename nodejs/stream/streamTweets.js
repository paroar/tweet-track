require('dotenv').config()
const twitter = require("./twitter.js");
const T = twitter.getT();
const sentiment = require("../sentiment/sentimentAnalysis.js");
const reduceTweet = require("../reduce/reduceTweet");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const logstashUrls = {
  es: `http://logstash:${process.env.LOGSTASH_ES_PORT}`,
  mongo: `http://logstashmongo:${process.env.LOGSTASH_MONGO_PORT}`
}


module.exports = (app, io) => {

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


  /*DISTRIBUTE MSG*/
  const sendMessage = msg => {
    const tempTweet = sentiment(msg, app);
    const reducedTweet = reduceTweet(tempTweet);

    //sockets
    io.sockets.emit("tweets", reducedTweet);
    io.sockets.emit("count", {
      count: app.locals.count,
      good: app.locals.good,
      bad: app.locals.bad,
      neutral: app.locals.neutral
    });
    app.locals.count++;

    //logstash
    Object.values(logstashUrls).forEach( url => {
      fetch(url, {
        method: 'post',
        body: JSON.stringify(tempTweet),
        headers: { 'Content-Type': 'application/json' }
      }).catch(err => console.log(err));
    });
  };

  const resetLocalCount = () => {
    app.locals.count = 1;
    app.locals.good = 0;
    app.locals.bad = 0;
    app.locals.neutral = 0;
  };

  /*ROUTES
  TODO: MOVE TO ROUTES FOLDER
  */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())


  app.post("/changeTopic", (req, res) => {
    tStream && tStream.stop();
    topic = req.body.topic;
    res.status(200).send({
      status: "success",
      action: "changeTopic",
      topic: topic
    });
  });

  app.post("/play", (req, res) => {
    res.status(200).send({
      status: "success",
      action: "play"
    });
    stream();
  });

  app.post("/pause", (req, res) => {
    tStream && tStream.stop();
    res.status(200).send({
      status: "success",
      action: "paused"
    });
  });

  app.post("/stop", (req, res) => {
    tStream && tStream.stop();
    resetLocalCount();
    res.status(200).send({
      status: "success",
      action: "stoped"
    });
  });

};
