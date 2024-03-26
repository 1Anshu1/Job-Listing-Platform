import Job from "../model/jobs.model.js";
import asyncWrapper from "../middleware/asyncWrapper.middleware.js";
import CustomError from "../util/customError.js";

const createJob = asyncWrapper(async (req, res, next) => {
    const {
        company,
        position,
        logoUrl,
        salary,
        jobType,
        workMode,
        location,
        description,
        aboutCompany,
        skills,
        information,
    } = req.body;

    if (
        !company ||
        !position ||
        !logoUrl ||
        !salary ||
        !jobType ||
        !workMode ||
        !location ||
        !description ||
        !aboutCompany ||
        !skills
    ) {
        throw next(new CustomError(400, "Required data missing"));
    }
    req.body.postedBy = req.user.id;
    const newJob = await Job.create(req.body);
    res.status(201).json({ message: "job added successfully", newJob });
});

const getJob = asyncWrapper(async (req, res, next) => {
    const job_id = req.params.id;

    const job = await Job.findOne({ _id: job_id });
    if (!job) {
        throw next(new Custome(400, "job does not exist"));
    }
    res.status(200).json({ message: "job found", job });
});

const getAlljob = asyncWrapper(async (req, res, next) => {
    const query = req.query;
    let queryFilter = {};
    if (query.skills) {
        const skill = query.skills.split(",");
        queryFilter = { ...queryFilter, skills: { $in: skill } };
    }
    if (query.search) {
        const searchTitle = { $regex: query.search, $options: "i" };
        queryFilter = { ...queryFilter, position: searchTitle };
    }

    const job = await Job.find(queryFilter);
    res.status(200).json({ job });
});

const updateJob = asyncWrapper(async (req, res, next) => {
    const job_id = req.user.id;

    const job = await Job.findOneAndUpdate({ _id: job_id }, req.body, { new: true });
    if (!job) {
        throw next(new Custome(400, "job does not exist"));
    }
    res.status(200).json({ message: "job updated successfully", job });
});

const deleteJob = asyncWrapper(async (req, res, next) => {
    const job_id = req.user.id;

    const job = await Job.findOneAndDelete({ _id: job_id });
    if (!job) {
        throw next(new Custome(400, "job does not exist"));
    }
    res.status(200).json({ message: "job deleted successfully" });
});

export { createJob, getJob, getAlljob, updateJob, deleteJob };
