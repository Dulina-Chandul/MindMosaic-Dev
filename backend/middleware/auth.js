import jwt from "jsonwebtoken";

const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                from: "auth.middleware.js",
                message: "Authorization header missing or invalid format"
            });
        }

        const token = authHeader.split(" ")[1];
        const payload = verifyToken(token, process.env.JWT_SECRET);

        if (!payload) {
            return res.status(401).json({
                success: false,
                from: "auth.middleware.js",
                message: "Invalid or expired token"
            });
        }

        req.user = payload;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            from: "auth.middleware.js",
            message: "Authentication error",
            error: error.message
        });
    }
};

export default authenticate;