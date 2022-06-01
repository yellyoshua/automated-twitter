import got from "got";
import crypto from "crypto";
import OAuth from 'oauth-1.0a';
import { paramsUrlToObjects, readLineFromConsole } from "./utils.js";

const REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
const CREATE_TWEET_URL = 'https://api.twitter.com/2/tweets';
const ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token';

async function requestAuthorizationURL(oauth) {
    const authHeader = oauth.toHeader(oauth.authorize({
        url: REQUEST_TOKEN_URL,
        method: 'POST'
    }));

    const req = await got.post(REQUEST_TOKEN_URL, {
        headers: {
            Authorization: authHeader["Authorization"]
        }
    });

    const {
        oauth_token,
        oauth_token_secret,
    } = paramsUrlToObjects(req.body);

    const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
    authorizeURL.searchParams.set('oauth_token', oauth_token);

    return {
        oauth_token,
        oauth_token_secret,
        authorizeURL,
    };
}

function instanceTwitterOauth({ consumer_key, consumer_secret }) {
    return OAuth({
        consumer: {
            key: consumer_key,
            secret: consumer_secret
        },
        signature_method: 'HMAC-SHA1',
        hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
    });
}

async function requestAccessToken(pin, { oauth_token }, oauth) {
    const { Authorization } = oauth.toHeader(oauth.authorize({
        url: ACCESS_TOKEN_URL,
        method: 'POST'
    }));
    const req = await got.post(
        `https://api.twitter.com/oauth/access_token?oauth_verifier=${pin}&oauth_token=${oauth_token}`,
        { headers: { Authorization } },
    );

    const accessToken = paramsUrlToObjects(req.body);

    return {
        oauth_token: accessToken.oauth_token,
        oauth_token_secret: accessToken.oauth_token_secret,
    }
}


function authorizeEndpoint(url, { oauth_token, oauth_token_secret }, oauth) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    };

    const authHeader = oauth.toHeader(oauth.authorize({
        url,
        method: 'POST'
    }, token));

    return authHeader["Authorization"];
}

export default function tweets({ TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET }) {
    return {
        async authenticate() {
            const oauth = instanceTwitterOauth({
                consumer_key: TWITTER_CONSUMER_KEY,
                consumer_secret: TWITTER_CONSUMER_SECRET,
            });

            const {
                authorizeURL,
                ...authorizationTokens
            } = await requestAuthorizationURL(oauth);

            console.log(` Authorize your application here: ${authorizeURL}`);
            const pin = await readLineFromConsole(
                "Enter the PIN from the browser: "
            );

            const {
                oauth_token,
                oauth_token_secret,
            } = await requestAccessToken(pin, authorizationTokens, oauth);

            const authorization = authorizeEndpoint(
                CREATE_TWEET_URL,
                { 
                    oauth_token,
                    oauth_token_secret,
                },
                oauth,
            );
            
            return {
                async createTweet(tweet) {
                    const headers = {
                        Authorization: authorization,
                        'user-agent': "v2CreateTweetJS",
                        'content-type': "application/json",
                        'accept': "application/json"
                    };
                    console.log(headers);
                    const responses = await Promise.all([
                        got.post(CREATE_TWEET_URL, {
                            json: tweet,
                            responseType: 'json',
                            headers,
                        }),
                        got.post(CREATE_TWEET_URL, {
                            json: {
                                text: "This is a second post to test the rate limit",
                            },
                            responseType: 'json',
                            headers,
                        })
                    ]).then(responses => responses.map(response => response.body));

                    return responses;
                }
            }
        }
    }
}