import bcryptController from "../controllers/bcrypt.controller.js";
import jwtController from "../controllers/jwt.controller.js";

export default function sessionServices(repositories = {}, envs) {
    const {
        usersRepository,
        sessionsRepository,
    } = repositories;

    const {
        encryptPassword,
        validatePassword,
    } = bcryptController();

    const jwt = jwtController(envs)

    return {
        async createNewUser(email = "", password_in_plaintext = "") {
            const existingUser = await usersRepository.findOne({ email });
            if (existingUser) throw new Error("User already exists");
            const password = encryptPassword(
                password_in_plaintext,
            );
            const user = await usersRepository.create({
                email,
                password,
            });

            return user;
        },
        async authenticateUser(email = "", password_in_plaintext = "") {
            const user = await usersRepository.findOne({ email });
            if (!user) throw new Error("User not found");
            const isValid = validatePassword(
                password_in_plaintext,
                user.password,
            )
            if (!isValid) throw new Error("Invalid email or password");

            const access_token = jwt.sign({userId: user._id })
            const session = await sessionsRepository.create({
                user_id: user._id,
                access_token,
            });

            return { user, access_token, session };
        },
        async userDetails(user_id) {
            const user = await usersRepository.findOne({ _id: user_id });
            if (!user) throw new Error("User not found");

            return user;
        }
    }
}