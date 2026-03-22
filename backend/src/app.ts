import express from "express"
const app = express();
import authRouter from "./routes/authRouter.js";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import cors from "cors";
import interviewRouter from "./routes/interviewRouter.js";

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
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