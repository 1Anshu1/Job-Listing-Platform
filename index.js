import dotenv from "dotenv/config";
import express from "express";

import connectDB from "./config/db.js";

const app = express();

app.use(express.json());









const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
