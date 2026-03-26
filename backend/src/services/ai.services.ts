import { GoogleGenAI } from "@google/genai"
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer, { Page } from "puppeteer"


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
})

// schema to get structured response 
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),

    title: z.string().describe("The title of the job for which the interview report is generated"),
})

interface GenerateReportParams {
    resume: string,
    selfDescription: string,
    jobDescription: string
}

// calling ai with user details
async function generateInterviewReport({resume, selfDescription, jobDescription}: GenerateReportParams) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert technical interviewer. Analyze the following candidate profile and job description, then generate a comprehensive interview report.
            Resume: ${resume}
            Self Description: ${selfDescription}
            Job Description: ${jobDescription}
            Generate a detailed interview report with match score, technical questions, behavioral questions, skill gaps, and mainly give the preparation plan.    You MUST return a JSON object with exactly these keys: summary, technical_questions (array), behavioral_questions (array), skill_gaps (array), preparation_plan (array), match_score (number), title (string).`,

            config: {
                responseMimeType: "application/json",
                //@ts-ignore
                responseJsonSchema: zodToJsonSchema(interviewReportSchema),
            }
        })

        //@ts-ignore
        const report = JSON.parse(response.text);
        return report;

    } catch(err) {
        console.log("Error in generating interview report: ", err);
        throw err;
    }

}

// helper func of generatePDF, to generate PDF from html
async function generatePdfFromHtml({htmlContent}: {htmlContent: string}) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width: 794,
        height: 1123,
        deviceScaleFactor: 1
    });

    await page.setContent(htmlContent, {
        waitUntil: 'networkidle2'
    })

    await page.emulateMediaType("print"); //render to browser in print mode

    const pdfBuffer = await page.pdf({ //page setup
        format: 'A4',
        printBackground: true,
        margin: {
            top: "0px",
            bottom: "0px",
            left: "0px",
            right: "0px"
        },
        preferCSSPageSize: true
    })

    await browser.close();
    return pdfBuffer;
}

// expects resume, self and job description as string
async function generatePDF({resume, selfDescription, jobDescription}: GenerateReportParams) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    //write prompt according to ROLE, DATA, RULES, FORMATE & EXAMPLE
    const prompt = `You are a professional resume writer. Generate a clean, ATS-friendly resume in HTML format.

        CANDIDATE DATA (use EXACTLY as provided, do not modify names, links, or any details):
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}

        STRICT RULES:
        1. Copy all names, emails, phone numbers, GitHub/LinkedIn URLs EXACTLY as given
        2. Keep it to ONE page only — no scrolling, no overflow
        3. Do not add skills or experience not mentioned
        4. HTML must be self-contained with inline CSS only
        5. Do NOT use mm/cm units — use px only
        6. The entire resume must fit within 794px wide × 1123px tall (A4 at 96dpi)

        LAYOUT & STYLE RULES:
        - Outer wrapper: width: 794px; height: 1123px; overflow: hidden; box-sizing: border-box; padding: 40px 50px;
        - Font: Arial, sans-serif
        - Body text: 13px; line-height: 1.4
        - Section headings: 15px, font-weight: bold, border-bottom: 1px solid #333, margin-bottom: 4px
        - Name heading: 22px, font-weight: bold
        - Subheading/title: 13px, color: #555
        - Use a two-column layout: left column 65% for main content, right column 35% for skills/contact
        - All margins and paddings should be small (4px–10px) to keep content compact
        - Bullet points: margin: 2px 0; padding-left: 14px
        - Do NOT use <table> for layout — use flexbox divs
        - Avoid page-break CSS properties entirely

        CRITICAL: Every section must fit. If content is too long, abbreviate bullet points rather than overflow.

        Return ONLY valid JSON: { "html": "<complete html string here>" }`
    ;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,

            config: {
                responseMimeType: "application/json",
                //@ts-ignore
                responseJsonSchema: zodToJsonSchema(resumePdfSchema),
            }
        })

        const jsonContent = JSON.parse(response.text!);

        const pdfBuffer = await generatePdfFromHtml({htmlContent: jsonContent.html}); //create pdf

        return pdfBuffer;

    } catch (err) {
        console.log("Error in generating interview PDF: ", err);
        throw err;
    }
}

export { generateInterviewReport, generatePDF }