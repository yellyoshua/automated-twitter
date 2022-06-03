import repositoryController from './controllers/repository.controller.js';
import userModel from "./models/users.model.js";
import sessionModel from "./models/sessions.model.js";
import tweetsModel from "./models/tweets.model.js";

export default {
    usersRepository: repositoryController(userModel),
    sessionsRepository: repositoryController(sessionModel),
    tweetsRepository: repositoryController(tweetsModel),
};