import { useParams } from "react-router";
//import { dummyReport } from "../services/dummyData";
import { Interview } from "../components/interview/Interview";
import { useInterview } from "../hooks/useInterview";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function InterviewPage() {
  const { report, loading, getReportById } = useInterview();
  const reportId = useParams<{ reportId: string }>(); //to fetch report on page refresh

    useEffect(() => {
      if(!report || reportId) {
        getReportById({ interviewId: (reportId as string) })
      }
    }, [reportId])


  if (loading) {
    return (
      <Loader />
    )
  }

  if (!report) {
    return <Error />
  }

  return <Interview report={report} />;
}