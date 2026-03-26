import { Router } from "express";
import authUser from "../middlewares/authMiddleware.js";
import { 
    generateInterviewReportController, 
    generateResumePdfController, 
    getAllInterviewReportsController, 
    getInterviewReportByIdController 
} from "../controller/interviewController.js";
import { upload } from "../middlewares/multer.js";

const interviewRouter = Router();

//to generate interview report
interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController)


// get a specific interview reports
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportByIdController)


// get all interview reports
interviewRouter.get("/", authUser, getAllInterviewReportsController)


// generate resume pdf
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController)

export default interviewRouter;