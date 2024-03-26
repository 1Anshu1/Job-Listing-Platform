import { Schema, model, Types } from "mongoose";

const jobSchema = new Schema(
    {
        company: {
            type: String,
            required: [true, "company is required"],
            unique: true,
        },
        logoUrl: {
            type: String,
            required: [true, "logo is required"],
        },
        position: {
            type: String,
            required: [true, "position is required"],
        },
        salary: {
            type: Number,
            required: [true, "salary is required"],
        },
        jobType: {
            type: String,
            required: [true, "job type is required"],
        },
        workMode: {
            type: String,
            enum: ["Office", "Remote", "Hybrid"],
            required: [true, "work mode is required"],
        },
        location: {
            type: String,
            required: [true, "location is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        aboutCompany: {
            type: String,
            required: [true, "aboutCompany is required"],
        },
        skills: {
            type: [String],
            required: [true, "skills is required"],
        },
        information: {
            type: String
        },
        postedBy: {
            type: Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

const Job = model("Job", jobSchema);
export default Job;
