import type { Request, Response } from "express";
import { PDFParse } from "pdf-parse"
import { generateInterviewReport } from "../services/ai.services.js";
import prismaClient from "../config/db.js";
import { generateReport } from "../utils/types.js";



// expects resume as req.file, selfDescription as string, jobDescription as string
export async function generateInterviewReportController(req: Request, res: Response) {
    if(!req.file) {
        return res.status(400).json({
            message: "Resume file is required"
        })
    }
    
    const parsedResult = generateReport.safeParse(req.body);
    if(!parsedResult.success) {
        return res.status(400).json({
            message: "invalid input data"
        })
    }

    try {
        const { selfDescription, jobDescription } = parsedResult.data;
        const parser = new PDFParse({data: req.file.buffer});

        const result = await parser.getText();
        const resumeContent = typeof result === 'string' ? result : result.text;

        const info = await parser.getInfo(); //meta data
        await parser.destroy(); //free space

        const aiResponse = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        }) as any;

        if(!aiResponse) {
            return res.status(500).json({
                message: "Ai failed to generate report"
            })
        }

        //Keys: [ 'match_score', 'technical_questions', 'behavioral_questions', 'skill_gaps', 'preparation_plan' ]
        const interviewReport = await prismaClient.interviewReport.create({
            data: {
                userId: (req as any).user.id,
                resume: resumeContent,
                selfDescription,
                jobDescription,
                title: aiResponse.title || info.info?.Title || "Untitled Report",
                matchScore: aiResponse.matchScore || aiResponse.match_score || 0,
            }
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            reportId: interviewReport.id,
            report: aiResponse
        })
    } catch (err) {
        res.status(500).json({
            message: "Can't generate report",
            err: err
        })
    }

}

// get a specific report
export async function getInterviewReportByIdController(req: Request, res: Response) {
    try {   
        const { interviewId } = req.params;

        if(typeof interviewId !== 'string') {
            return res.status(400).json({
                message: "Wrong interview id"
            })
        }

        const report = await prismaClient.interviewReport.findFirst({
            where: {
                id: interviewId
            }
        })

        if(!report) {
            return res.status(404).json({
                message: "Can't find report"
            })
        }

        return res.json(report)

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while report finding"
        })
    }
}

// get all interview reports
export async function getAllInterviewReportsController(req: Request, res: Response) {
    try {
        const interviewReport = await prismaClient.interviewReport.findMany({
            where: {
                userId: (req as any).user.id
            }
        })

        res.status(200).json({
            message: "Interview report fetched successfully",
            report: interviewReport
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while fetching all reports"
        })   
    }
} 

export async function generateResumePdfController() {

}