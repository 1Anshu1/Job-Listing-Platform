import User from "../model/user.model.js";
import { createToken } from "../util/jwt.util.js";
import asyncWrapper from "../middleware/asyncWrapper.middleware.js";
import CustomError from "../util/customError.js";

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
        throw next(new CustomError(400, "required field missing"));
    }
    const user = await User.findOne({ email });
    if (user) {
        throw next(new CustomError(400, "user already exist"));
    }
    const newUser = await User.create(req.body);
    const token = createToken({ id: newUser._id, role: newUser.role });
    newUser.password = undefined;
    res.status(200).json({ message: "user registered successfully", newUser, token });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw next(new CustomError(400, "required field missing"));
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw next(new CustomError(400, "invalid credential"));
    }

    const verifyPassword = await user.comparePassword(password)
    if(!verifyPassword) {
        throw next(new CustomError(400, "invalid credential"));
    }
    user.password = undefined;
    const token = createToken({ id: user._id, role: user.role });
    res.status(200).json({ message: "user login successful", user, token });
});

export { register, login };
