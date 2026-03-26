import { useContext } from "react"
import { InterviewContext } from "../interview.context"
import { generateInterviewReport, generateResumePdf, getAllInterviewReports, getInterviewReportById, logoutApi, type generateReportType } from "../services/interview.api";
import { useNavigate } from "react-router";


export const useInterview = () => {
    const context = useContext(InterviewContext);
    const navigate = useNavigate();

    if(!context) {
        throw new Error("useInterview must be used within an interview provider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;
    
    const getLogedOut = async () => {
        setLoading(true);
        try {
            await logoutApi();
            //console.log(res.message);
            navigate("/");
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

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

    // this func fetch one report using interviewId
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
            setReports(data.report)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getResumePdf = async ({interviewId}: {interviewId: string}) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateResumePdf({interviewId});
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `resume_${interviewId}.pdf`);
            document.body.appendChild(link);
            link.click();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //useEffect(() => {
    //    if(interviewId) {
    //        getReportById({interviewId})
    //    } else {
    //        getAllReports()
    //    }
    //}, [interviewId])

    return {
        loading,
        report,
        reports,
        getLogedOut,
        generateReport,
        getReportById,
        getAllReports,
        getResumePdf
    }

}