import User from "../model/user.model.js";

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
    res.status(200).json({ message: "user registered successfully", user });
});

const login = asyncWrapper(async (req, res, next) => {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
        throw next(new CustomError(400, "required field missing"));
    }

    const user = await User.findOne({ email });
    if (user) {
        throw next(new CustomError(400, "user already exist"));
    }
    
    const newUser = await User.create(req.body);
    res.status(200).json({ message: "user registered successfully", user });
});


export {register, login} 
