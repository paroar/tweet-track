const Twit = require("twit");
const sentiment = require("../sentiment/sentimentAnalysis.js");
const cors = require("cors");
require("dotenv").config();

var mongoose = require('mongoose');
const dbconn = require("../connection/connection");
dbconn.connectWithRetry();
var conn =  mongoose.connection;

const fetch = require("node-fetch");
const logstash = "http://logstash:5000";

module.exports = (app, io) => {

  let T = new Twit({
    consumer_key: "qxo282tmtwEVhDXBqjdBwnYay",
    consumer_secret: "0R5tXlAiWVb5CXaFGZFzfSJyjXy4w0LFJyc1Y1sxGEBUB5r3d7",
    access_token: "1211253165296734208-8JCJ2BmZqJ5c8176tg7Cd9iqlkgdpe",
    access_token_secret: "pWcIfKN1hAg7tRCPE50TDlcbgCIscoFkhylC2bxB2T2Jm"
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

    //sockets
    io.sockets.emit("tweets", tempTweet);
    io.sockets.emit("count", {
      count: app.locals.count,
      good: app.locals.good,
      bad: app.locals.bad,
      neutral: app.locals.neutral
    });
    app.locals.count++;

    //mongo
    conn.collection('tweets').insertOne(tempTweet);

    //logstash
    fetch(logstash, {
      method: 'post',
      body: JSON.stringify(tempTweet),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => null);

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
