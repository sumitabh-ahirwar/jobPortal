import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/auth.middelware.js";
import { upload } from "../utils/multer.js";
import { getMe } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/register").post(upload.fields(
    [{
        name: "profilePhoto",
        maxCount: 1
    },]
), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/updateProfile").post(isAuthenticated, upload.fields([
        {
            name: "resume",
            maxCount: 1
        },
        {
            name: "profilePhoto",
            maxCount: 1
        },
    ]), updateProfile);
router.route("/me").get(isAuthenticated, getMe)
export default router;