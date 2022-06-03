import bcrypt from "bcrypt";

export default function bcryptController() {
    return {
        encryptPassword(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        },
        validatePassword(password, encryptedPassword) {
            return bcrypt.compareSync(password, encryptedPassword);
        }
    }
}