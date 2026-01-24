import express from "express"
import isAuthenticated from "../middlewares/auth.middelware.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();
router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, upload.fields(
    [
        {
            name: "logo",
            maxCount: 1
        }
    ]

), updateCompany);


export default router;