import CustomError from "../utils/customError.js";
import { verifyToken } from "../utils/jwt.util.js";

const authMiddleware = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                throw next(new CustomError(401, "user unauthenticated"));
            }
            const { id } = verifyToken(token);
            req.user = id;
            next();
        } catch (error) {
            throw next(new CustomError(401, "user unauthenticated"));
        }
    } else {
        throw next(new CustomError(401, "user unauthenticated"));
    }
};

export default authMiddleware;
