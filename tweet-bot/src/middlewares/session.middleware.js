export default function sessionMiddleware({ services }) {
    return async (req, res, next) => {
        const accessToken = req.headers.Authorization;
        if (!accessToken) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const session = await services.session.findOne({
            accessToken
        });

        if (!session) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        req.session = session;

        next();
    }
}