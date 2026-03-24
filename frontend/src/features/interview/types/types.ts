export interface InterviewReport {
  candidateName: string;
  roleAppliedFor: string;
  overallMatchScore: "High" | "Medium" | "Low";
  summary: string;
  strengths: string[];
  skillGaps: string[];
  technicalQuestions: string[];
  behavioralQuestions: string[];
  preparationPlan: string[];
}

export interface InterviewReportResponse {
  message: string;
  reportId: string;
  report: InterviewReport;
}