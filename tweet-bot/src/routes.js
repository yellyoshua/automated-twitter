export default function routes(app, handlers) {
    const {
        twitterHandlers,
        sessionHandlers,
    } = handlers;

    app.post('/api/tweet', twitterHandlers.createNewTweet);
}