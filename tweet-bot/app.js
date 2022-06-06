import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import configureServices from "./src/services/index.js";
import configureHandlers from "./src/handlers/index.js";
import repositories from "./src/repositories.js";
import routes from "./src/routes.js";
// import tweets from './tweets.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const services = configureServices(
    repositories,
    process.env,
);

const handlers = configureHandlers(
    services,
);

routes(app, handlers);

function connectToMongo() {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
        
    });
}

function startHttpServer() {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

function handleError(err) {
    console.error(err);

    mongoose.disconnect();
    app.close();
    process.exit(1);
}

connectToMongo()
    .then(startHttpServer)
    .catch(handleError);

// const twitter = tweets({
//     TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
//     TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
// });

// async function postTweet() {
//     try {
//         const tweet = await twitter.authenticate()
//         const response = await tweet.createTweet({
//             text: "Hello world",
//         });

//         console.log(response);
//     } catch (error) {
//         console.log(error);
//     }
// }

// postTweet();