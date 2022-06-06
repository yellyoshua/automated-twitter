import sessionHandlers from "./session.handlers.js";
import twitterHandlers from "./twitter.handlers.js";

export default function handlers(services = {}) {
	return {
		sessionHandlers: sessionHandlers(services),
		twitterHandlers: twitterHandlers(services),
	};
}