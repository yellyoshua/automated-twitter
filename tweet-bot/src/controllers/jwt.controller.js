import jwt from "jsonwebtoken";

export default function jwtController({
    JWT_SECRET,
    JWT_EXPIRES_IN = "2d",
}) {
    return {
        sign(payload) {
            return jwt.sign(payload, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            });
        },
        verify(token) {
            return jwt.verify(token, JWT_SECRET);
        },
    };
}