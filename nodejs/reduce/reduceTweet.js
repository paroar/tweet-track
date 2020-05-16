module.exports = tweet => {
    const newTweet = {
        id: tweet.id,
        id_str: tweet.id_str,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        profile_image_url: tweet.user.profile_image_url,
        description: tweet.user.description,
        sentiment: tweet.sentiment
    };

    if (tweet.extended_tweet) {
        newTweet.text = tweet.extended_tweet.full_text
    } else {
        newTweet.text = tweet.text
    }

    if (
        tweet.place &&
        tweet.place.bounding_box &&
        tweet.place.bounding_box.coordinates
    ) {
        newTweet.place = tweet.place.bounding_box.coordinates
    }
    return newTweet;
}