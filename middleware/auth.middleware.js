import CustomError from "../util/customError.js";
import { verifyToken } from "../util/jwt.util.js";

const authMiddleware = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                throw next(new CustomError(401, "user unauthenticated"));
            }
            const { id, role } = verifyToken(token);
            req.user = {id, role};
            next();
        } catch (error) {
            throw next(new CustomError(401, "user unauthenticated"));
        }
    } else {
        throw next(new CustomError(401, "user unauthenticated"));
    }
};

const authorize = (req, res, next) => {
    if (req.user.role === "employer") {
        next();
    } else {
        throw next(new CustomError(403, "Unauthorized access"));
    }
};

export { authMiddleware, authorize };
