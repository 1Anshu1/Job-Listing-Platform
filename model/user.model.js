import { Schema, model, Types } from "mongoose";

const userSchmea = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        mobile: {
            type: String,
            required: [true, "mobile is required"],
            unique: true,
        },
    },
    { timestamps: true }
);

const User = model("User", userSchmea);
export default User;
