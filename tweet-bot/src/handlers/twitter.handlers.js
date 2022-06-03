import express from "express";

export default function twitterHandler({ services = {} }) {
    const {
        twitterService,
        sessionServices,
    } = services;
    return {
        async createNewTweet(req, res) {
            const {
                text,
            } = req.body;
            const {
                user_id,
            } = req.session;
            const tweet = await twitterService.createTweet(user_id, text);
            res.json(tweet);
        },
        async requestTwitterAuthorization(req, res) {},
        async requestTwitterAccessToken(req, res) {},
        async requestTweets(req, res) {},
    };
};