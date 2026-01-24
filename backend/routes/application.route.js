import express from "express"
import isAuthenticated from "../middlewares/auth.middelware.js";
import { applyToJob, getApplications, getApplicationsForJob, updateApplicationStatus } from "../controllers/application.controller.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyToJob);
router.route("/get").get(isAuthenticated,getApplications);
router.route("/:id/applicants").get(isAuthenticated, getApplicationsForJob);
router.route("/status/:id/update").post(isAuthenticated, updateApplicationStatus);


export default router;