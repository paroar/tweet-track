const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;

const langTable = {
  en: "English",
  es: "Spanish"
}

module.exports = (tweet, app) => {

  let score = 0;

  if(typeof langTable[tweet.lang] !== "undefined"){
    const analyzer = new Analyzer(langTable[tweet.lang], stemmer, "afinn");
    if (tweet.extended_tweet) {
      score = analyzer.getSentiment(tweet.extended_tweet.full_text.split(" "));
    } else {
      score = analyzer.getSentiment(tweet.text.split(" "));
    }
  }
  tweet.sentiment = score;

  if (score === 0) {
    app.locals.neutral++;
  } else if (score > 0) {
    app.locals.good++;
  } else {
    app.locals.bad++;
  }
  return tweet;
};
