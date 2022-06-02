import express from "express";

export default function twitterHandler({ services }) {
    return {
        async sendAuthoizationUrl(req = express.request, res = express.response) {
            const authorizationUrl = await services.twitter.getAuthorizationUrl();
            return res.json({ authorizationUrl }).status(200);
        },
        async receiveOauthCode(req = express.request, res = express.response) {
            const { code } = req.body;
            const currentSession = req.session;
            const tweetToken = await services.twitter.getAccessToken(code);
            const session = await services.session.update({
                _id: currentSession._id,
            },{ tweetToken });

            return res.json(session).status(200);
        }
    };
}