import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
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
        role: {
            type: String,
            enum: ["employer", "employee"],
            default: "employee",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.comparePassword = async function (password) {
    const verifyPassword = await bcrypt.compare(password, this.password);
    return verifyPassword;
};

const User = model("User", userSchema);
export default User;
