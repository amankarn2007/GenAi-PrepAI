import express from "express"
const app = express();
import authRouter from "./routes/auth.route.js";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import cors from "cors";
import interviewRouter from "./routes/interview.route.js";

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const allowedOrigin = [
    "http://localhost:5173",
    "https://prep-ai-opal-pi.vercel.app"
]
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}))

app.get("/", (req, res) => {
    res.send("hiiii");
})

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("app is listning on port 3000");
})