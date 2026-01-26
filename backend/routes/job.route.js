import express from "express"
import isAuthenticated from "../middlewares/auth.middelware.js";
import { createJob, getAllJobs, getAllJobsCreatedByAdmin, getJobById, updateJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, createJob);
router.route("/get").get( getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAllJobsCreatedByAdmin);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/:id/update").put(isAuthenticated, updateJob);

export default router;