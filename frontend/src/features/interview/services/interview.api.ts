import axios from "axios";

const baseUrl = "http://localhost:3000";

export interface generateReportType {
    jobDescription: string,
    selfDescription: string,
    resumeFile: any
}

export async function generateInterviewReport({jobDescription, selfDescription, resumeFile}: generateReportType) {
    const formData = new FormData(); //using formData we can send files to backend
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    try {
        const response = await axios.post(`${baseUrl}/api/interview`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        })

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getInterviewReportById({interviewId}: {interviewId: string}) {
    const response = await axios.get(`${baseUrl}/api/interview/report/${interviewId}`, {
        withCredentials: true 
    });

    return response.data;
}

export async function getAllInterviewReports() {
    const response = await axios.get(`${baseUrl}/api/interview`, {
        withCredentials: true 
    });

    return response.data;
}

export async function generateResumePdf() {
    
}