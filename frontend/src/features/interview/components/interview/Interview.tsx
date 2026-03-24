import { useState, type JSX } from "react";
//import { useNavigate, useParams } from "react-router";
import type { InterviewReport } from "../../types/types";
import { QuestionCard } from "./QuestionCard";
import { RoadMapDay } from "./RoadmapDay";
import { MatchScoreBadge } from "./MatchScoreBadge";
import { SkillGapsList } from "./SkillGapList";


type NavId = "technical" | "behavioral" | "roadmap";

// ── Constants ──
const NAV_ITEMS: { id: NavId; label: string; icon: JSX.Element }[] = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

interface InterviewProps {
  report: InterviewReport;
}

export const Interview = ({ report }: InterviewProps) => {
  const [activeSection, setActiveSection] = useState<NavId>("technical");

  const displayName = report.title?.split(":")[1]?.trim() || "Candidate";
  const initials = displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">

        {/* ── Title bar ── */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-zinc-300">{initials}</span>
            </div>
            <div>
              <h1 className="font-semibold text-zinc-100 leading-none"> {displayName} </h1>
              <p className="text-sm text-zinc-500 mt-1">{report.title}</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full border border-zinc-700 bg-neutral-600 text-zinc-200 shrink-0">
            Interview Report
          </span>
        </div>

        {/* ── Summary banner ── */}
        <div className="px-6 py-4 bg-zinc-900/40 border-b border-zinc-800">
          <p className="text-[12px] uppercase tracking-widest text-zinc-300 mb-1.5">Summary</p>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-5xl">{report.selfDescription}</p>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 min-h-0 flex-col md:flex-row">

          {/* Sidebar */}
          <aside className="w-full md:w-52 shrink-0 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/50 p-4 flex md:flex-col flex-row gap-1 overflow-x-auto">
            <p className="hidden md:block text-[12px] uppercase tracking-widest text-zinc-500 px-3 mb-2">
              Sections
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2.5 shrink-0 md:w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeSection === item.id
                    ? "bg-zinc-800 text-zinc-100 font-medium"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                <span className={activeSection === item.id ? "text-zinc-300" : "text-zinc-600"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-6 min-w-0">

            {activeSection === "technical" && (
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-4">
                  Technical questions — {report.technicalQuestion.length} total
                </p>
                <div className="flex flex-col gap-2.5">
                  {report.technicalQuestion?.map((q, i) => (
                    <QuestionCard key={q.id} item={q} index={i} />
                  ))}
                </div>
              </div>
            )}

            {activeSection === "behavioral" && (
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-4">
                  Behavioral questions — {report.behavioralQuestions.length} total
                </p>
                <div className="flex flex-col gap-2.5">
                  {report.behavioralQuestions.map((q, i) => (
                    <QuestionCard key={i} item={{...q, answer: q.answer}} index={i} />
                  ))}
                </div>
              </div>
            )}

            {activeSection === "roadmap" && (
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-6">
                  Preparation road map — {report.preparationPlan.length} steps
                </p>
                <div className="flex flex-col">
                  {report.preparationPlan.map((step, i) => (
                    <RoadMapDay
                      key={step.id}
                      item={step}
                      index={i}
                      isLast={i === report.preparationPlan.length - 1}
                    />
                  ))}
                </div>
              </div>
            )}

          </main>

          {/* Right panel */}
          <aside className="w-full md:w-60 shrink-0 border-t md:border-t-0 md:border-l border-zinc-800 bg-zinc-900/50 p-5 flex flex-col gap-6 overflow-y-auto">
            <MatchScoreBadge score={report.matchScore} />
            <div className="w-full h-px bg-zinc-800" />
            <SkillGapsList skillGaps={report.skillGaps} />
          </aside>

        </div>
      </div>
    </div>
  );
};