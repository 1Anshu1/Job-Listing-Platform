import express from "express";
import cors from "cors";

import userRoute from "./route/user.route.js";
import jobRoute from "./route/job.route.js";
import { errorMiddleware, notFound } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use(notFound);
app.use(errorMiddleware);

export default app;
