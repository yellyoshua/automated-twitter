import got from "got";
import { paramsUrlToObjects } from "../utils/index.js";
import twitterController, {
    REQUEST_TOKEN_URL,
    ACCESS_TOKEN_URL,
} from "../controllers/twitter.controller.js";

export default function twitterService(repositories = {}, envs) {
    const twitter = twitterController();
    return ({
        TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET,
    }) => {
        const {
            tweetsRepository,
            usersRepository,
        } = repositories;

        const oauth = twitter.instanceTwitterOauth({
            consumer_key: TWITTER_CONSUMER_KEY,
            consumer_secret: TWITTER_CONSUMER_SECRET,
        });

        return {
            async createTweet(user_id, text) {
                const user = await usersRepository.findOne({ _id: user_id });
                if (!user) throw new Error("User not found");
                const tweet = await tweetsRepository.create({
                    user_id: user._id,
                    text,
                    posted: false,
                });

                return tweet;
            },
            async requestAuthorization() {
                const authHeader = oauth.toHeader(oauth.authorize({
                    url: REQUEST_TOKEN_URL,
                    method: 'POST'
                }));

                const req = await got.post(REQUEST_TOKEN_URL, {
                    headers: {
                        Authorization: authHeader["Authorization"]
                    }
                });

                const { oauth_token } = paramsUrlToObjects(req.body);

                const authorizationUrl = twitter.getAuthorizationUrl({
                    oauth_token,
                });

                return { authorizationUrl, oauth_token };
            },
            async requestAccessToken(oauth_token, otp_token) {
                const { Authorization } = oauth.toHeader(oauth.authorize({
                    url: ACCESS_TOKEN_URL,
                    method: 'POST'
                }));
                const req = await got.post(
                    `https://api.twitter.com/oauth/access_token?oauth_verifier=${otp_token}&oauth_token=${oauth_token}`,
                    { headers: { Authorization } },
                );
            
                const accessToken = paramsUrlToObjects(req.body);

                const token = {
                    key: accessToken.oauth_token,
                    secret: accessToken.oauth_token_secret
                };
            
                const authHeader = oauth.toHeader(oauth.authorize({
                    url,
                    method: 'POST'
                }, token));
            
                return authHeader["Authorization"];
            },
            async getTweets(user_id) {
                const user = await usersRepository.findOne({ _id: user_id });
                if (!user) throw new Error("User not found");
                const tweets = await tweetsRepository.find({ user_id });
                return tweets;
            },
        }
    }
}

// async createTweet(tweet) {
//     const response = await got.post(CREATE_TWEET_URL, {
//         json: tweet,
//         responseType: 'json',
//         headers: {
//             Authorization: authorization,
//             'user-agent': "v2CreateTweetJS",
//             'content-type': "application/json",
//             'accept': "application/json"
//         }
//     });

//     return response.body;
// }