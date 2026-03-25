//import { dummyReport } from "../services/dummyData";
import { Interview } from "../components/interview/Interview";
import { useInterview } from "../hooks/useInterview";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useEffect } from "react";
import { useParams } from "react-router"

export default function InterviewPage() {
  const { report, loading, getReportById } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => { //fetch on every interviewId change
    if(interviewId) {
      getReportById({ interviewId })
    }
  }, [interviewId]);


  if (loading) {
    return <Loader />
  }

  if (!report) {
    return <Error />
  }

  return <Interview report={report} />;
}