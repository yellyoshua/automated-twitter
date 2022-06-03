import sessionServices from "./session.services.js";
import twitterServices from "./twitter.services.js";

export default function services(repositories = {}, envs) {
    return {
        sessionServices: sessionServices(repositories, envs),
        twitterServices: twitterServices(repositories, envs),
    };
}