import { useContext } from "react"
import { InterviewContext } from "../interview.context"
import { generateInterviewReport, getAllInterviewReports, getInterviewReportById, type generateReportType } from "../services/interview.api";


export const useInterview = () => {
    const context = useContext(InterviewContext);

    if(!context) {
        throw new Error("useInterview must be used within an interview provider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;
    
    const generateReport = async ({jobDescription, selfDescription, resumeFile}: generateReportType) => {
        setLoading(true);
        try{
            const data = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
            setReport(data.report);
            return data;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const getReportById = async ({interviewId}: {interviewId: string}) => {
        setLoading(true);
        try {
            const data = await getInterviewReportById({ interviewId });
            setReport(data);

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getAllReports = async () => {
        setLoading(true);
        try {
            const data = await getAllInterviewReports();
            setReports(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports
    }

}