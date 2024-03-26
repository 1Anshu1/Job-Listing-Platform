import express from "express";
import { authMiddleware, authorize } from "../middleware/auth.middleware.js";
import { getJob, createJob, getAlljob, updateJob, deleteJob } from "../controller/job.controller.js";

const router = express.Router();

router.route("/addjob").post(authMiddleware, authorize, createJob);
router.route("/").get(getAlljob);
router
    .route("/:id")
    .get(getJob)
    .patch(authMiddleware, authorize, updateJob)
    .delete(authMiddleware, authorize, deleteJob);

export default router;
