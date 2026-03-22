import { Router } from "express";
import authUser from "../middlewares/authMiddleware.js";
import { generateInterviewReportController } from "../controller/interviewController.js";
import { upload } from "../middlewares/multer.js";

const interviewRouter = Router();

interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController)

export default interviewRouter;