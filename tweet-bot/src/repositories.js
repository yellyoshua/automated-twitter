import repositoryController from './controllers/repository.controller.js';
import userModel from "./models/user.model.js";
import sessionModel from "./models/session.model.js";

export default {
    userRepository: repositoryController(userModel),
    sessionRepository: repositoryController(sessionModel),
}