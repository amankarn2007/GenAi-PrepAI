import React, { createContext, useState } from "react";
//@ts-ignore
import type { InterviewReport } from "./types/types";

interface InterviewContextType {
    loading: boolean
    report: InterviewReport | null,
    reports: InterviewReport[],
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setReport: React.Dispatch<React.SetStateAction<InterviewReport | null>>
    setReports: React.Dispatch<React.SetStateAction<InterviewReport[]>>
}

export const InterviewContext = createContext<InterviewContextType | null>(null)

export function InterviewProvider({children}: {children: React.ReactNode}) {
    
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<InterviewReport | null>(null);
    const [reports, setReports] = useState<InterviewReport[]>([])

    return (
        <InterviewContext.Provider value={{loading, setLoading, report, setReport, reports, setReports}}>
            { children }
        </InterviewContext.Provider>
    )
}