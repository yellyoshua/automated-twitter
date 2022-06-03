export default function routes(app, services) {
    app.post('/api/tweet', (req, res) => {
        services.tweet.createTweet(req.body)
            .then(tweet => {
                res.send(tweet);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });
}