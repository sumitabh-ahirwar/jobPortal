import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from  "./routes/user.routes.js"
import companyRoutes from './routes/company.route.js'
import jobRoutes from './routes/job.route.js'
import cors from "cors";
import applicationRoutes from './routes/application.route.js'
import geminiAiRoutes from './routes/geminiAI.route.js'
import path from "path"
dotenv.config({})
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())
const corsOptions = {
    origin: [
        "http://localhost:5173",
        'https://jobportal-y0dn.onrender.com',
        ],
    credentials: true
}
app.use(cors(corsOptions))


const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    })
})
.catch((err) => {
    console.log(`MONGODB ERROR !!!`);
})
const _dirname = path.resolve()
// app.get('/', (req, res) => {
//     res.send("Hello")
// })
app.use("/api/v1/company", companyRoutes)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/job", jobRoutes)
app.use("/api/v1/application", applicationRoutes)
app.use("/api/v1/ai",geminiAiRoutes)

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.use( (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend","dist", "index.html"));
})

