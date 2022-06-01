import cron from 'node-cron';
import tweetsService from '../services/tweets.service.js';

const twitter = tweetsService({
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

cron.schedule('0 0 * * *', async () => {
    // Get the tweets from the database
    // postTweet();
});