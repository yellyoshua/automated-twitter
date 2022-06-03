import OAuth from 'oauth-1.0a';
import crypto from "crypto";
export const REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
export const CREATE_TWEET_URL = 'https://api.twitter.com/2/tweets';
export const ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token';

export default function twitterController() {
    return {
        instanceTwitterOauth({ consumer_key, consumer_secret }) {
            return OAuth({
                consumer: { key: consumer_key, secret: consumer_secret },
                signature_method: 'HMAC-SHA1',
                hash_function: (baseString, key) => crypto
                    .createHmac('sha1', key)
                    .update(baseString)
                    .digest('base64')
            });
        },
        getAuthorizationUrl({ oauth_token }) {
            const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
            authorizeURL.searchParams.set('oauth_token', oauth_token);
            return authorizeURL;
        },
    };
}