import { Schema, model, Types } from "mongoose";

const jobSchema = new Schema(
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

const Job = model("Job", jobSchema);
export default Job;
