import axios from "axios";

//const baseUrl = "http://localhost:3000";
//const baseUrl = ""; //empty becase of vercel.json

export async function logoutApi() {
    const response = await axios.get(`/api/auth/logout`, {
        withCredentials: true
    });

    return response.data;
}

export interface generateReportType {
    jobDescription: string,
    selfDescription: string,
    resumeFile: any
}

// to create new interview report
export async function generateInterviewReport({jobDescription, selfDescription, resumeFile}: generateReportType) {
    const formData = new FormData(); // File + text saath bhejne ke liye
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    try {
        const response = await axios.post(`/api/interview`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true, //for cookies
        })

        return response.data;
    } catch (error) {
        console.log("Error in interview api", error);
    }
}

// get report for a specific id
export async function getInterviewReportById({interviewId}: {interviewId: string}) {
    const response = await axios.get(`/api/interview/report/${interviewId}`, {
        withCredentials: true 
    });

    return response.data;
}

// all reports, to show on dashboard
export async function getAllInterviewReports() {
    const response = await axios.get(`/api/interview`, {
        withCredentials: true 
    });

    return response.data;
}

// create resume pdf
export async function generateResumePdf({interviewId}: {interviewId: string}) {
    try {
        const response = await axios.post(`/api/interview/resume/pdf/${interviewId}`, null, {
            responseType: "blob", // for binary data(pdf, images, files)
            withCredentials: true //for coolies
        })

        return response.data;
                
    } catch (error) {
        console.log(error);
    }

}