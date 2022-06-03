export default function sessionMiddleware({ services = {} }) {
    const {
        sessionServices,
    } = services;
    return async (req, res, next) => {
        const bearerToken = req.headers.Authorization;
        if (!bearerToken) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const [, accessToken] = bearerToken.split(" ");

        const session = await sessionServices.accessToken(
            accessToken,
        );

        if (!session) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        req.session = session;

        next();
    }
}