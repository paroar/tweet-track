const Sentiment = require("sentiment");

module.exports = (tweet, app) => {
  let sentiment = new Sentiment();
  let result = {};
  if (tweet.extended_tweet) {
    result = sentiment.analyze(tweet.extended_tweet.full_text);
  } else {
    result = sentiment.analyze(tweet.text);
  }
  tweet.sentiment = result.comparative;
  const score = tweet.sentiment;
  if (score === 0) {
    tweet.color = "#FBBC05";
    app.locals.neutral++;
  } else if (score > 0) {
    tweet.color = "#34A853";
    app.locals.good++;
  } else {
    tweet.color = "#EA4335";
    app.locals.bad++;
  }
  return tweet;
};
