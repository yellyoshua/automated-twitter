import "dotenv/config";
import tweets from './tweets.js';

const twitter = tweets({
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
});

async function postTweet() {
    try {
        const tweet = await twitter.authenticate()
        const response = await tweet.createTweet({
            text: "Hello world",
        });

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

postTweet();