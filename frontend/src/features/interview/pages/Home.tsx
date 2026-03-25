import Footer from "../components/home/Footer"
import Header from "../components/home/Header"
import { Briefcase, User, Upload, Info } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import { ChevronRight, BarChart2 } from 'lucide-react';


export default function Home() {
    const { loading, getAllReports } = useInterview();

    useEffect(() => { // fetch all reports on first render
        getAllReports();
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <div className='w-full bg-gray-950 text-white flex flex-col items-center justify-center p-6'>
            <div className="w-full max-w-4xl flex flex-col gap-3">
                <Header />
                <Main />
                <Footer />
            </div>
        </div>
    )
}


function Main() {
    const jobDescriptionRef = useRef(null)
    const resumeRef = useRef(null)
    const selfDescriptionRef = useRef(null);
    const { generateReport, reports } = useInterview()
    const navigate = useNavigate();

    async function handleSubmit() {
        //@ts-ignore
        const jobDescription = jobDescriptionRef.current?.value; //@ts-ignore
        const selfDescription = selfDescriptionRef.current?.value; //@ts-ignore
        const resumeFile = resumeRef.current?.files[0];
        //console.log(jobDescription, selfDescription, resumeFile);

        if (!jobDescription) {
            alert("plese enter job description");
            return;
        }
        if (!selfDescription && !resumeFile) {
            alert("Plese upload Resume or enter Self-Description।");
            return;
        }

        try {
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })

            if (data && data.reportId) {
                navigate(`interview/${data.reportId}`)
            }
        } catch (error) {
            alert("can't generate report right now!");
        }
    }

    return (
        <div className="w-full">
            <div className="bg-[#0f1419] rounded-2xl flex-1 flex flex-col min-h-130">
                <div className="px-6 pt-4 flex flex-col flex-1 min-h-0">
                    <div className="flex gap-6 flex-1 min-h-0">
                        {/* Left: Job Description */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="flex items-center gap-2 mb-2">
                                <Briefcase className="w-4 h-4 text-pink-500" />
                                <h2 className="text-base font-semibold text-white">Target Job Description</h2>
                                <span className="px-2 py-0.5 bg-pink-500 text-white text-xs font-semibold rounded-full">REQUIRED</span>
                            </div>
                            <textarea
                                className="flex-1 min-h-0 bg-[#161d26] text-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-600 border border-gray-700 focus:border-pink-500"
                                placeholder="Paste the full job description here..."
                                ref={jobDescriptionRef}
                            />
                            <div className="text-right text-gray-500 text-xs mt-1">0 / 5000 chars</div>
                        </div>

                        {/* Right: Your Profile */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="w-4 h-4 text-pink-500" />
                                <h2 className="text-base font-semibold text-white">Your Profile</h2>
                            </div>

                            {/* Upload */}
                            <div className="mb-2">
                                <label className="flex items-center gap-2 text-xs font-medium text-gray-300 mb-1.5">
                                    Upload Resume
                                    <span className="px-2 py-0.5 bg-pink-500 text-white text-xs font-semibold rounded-full">
                                        BEST RESULTS
                                    </span>
                                </label>

                                <label htmlFor="resume" className="flex flex-col items-center justify-center border border-dashed border-gray-600 rounded-lg p-3 cursor-pointer hover:border-pink-500 transition-colors bg-[#161d26]">
                                    <Upload className="w-7 h-7 text-pink-500 mb-1" />
                                    <p className="text-gray-300 text-sm font-medium">Click to upload or drag & drop</p>
                                    <p className="text-gray-500 text-xs">PDF or DOCX (Max 5MB)</p>
                                    <input type="file" id="resume" name="resume" accept=".pdf,.docx" className="hidden"
                                        ref={resumeRef} />
                                </label>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-2">
                                <div className="flex-1 h-px bg-gray-700" />
                                <span className="text-gray-500 text-xs font-medium">OR</span>
                                <div className="flex-1 h-px bg-gray-700" />
                            </div>

                            {/* Self Description */}
                            <div className="mb-2 flex flex-col flex-1">
                                <label htmlFor="selfDescription" className="block text-xs font-medium text-gray-300 mb-1.5">
                                    Quick Self-Description
                                </label>
                                <textarea
                                    id="selfDescription"
                                    className="flex-1 min-h-0 bg-[#161d26] text-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-600 border border-gray-700 focus:border-pink-500"
                                    placeholder="Briefly describe your experience and key skills..."
                                    ref={selfDescriptionRef}
                                />
                            </div>

                            {/* Info box */}
                            <div className="flex gap-2 p-2.5 bg-blue-900/30 border border-blue-800/50 rounded-lg">
                                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-gray-300">
                                    Either a <strong className="text-white">Resume</strong> or <strong className="text-white">Self Description</strong> is required.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-700 mt-3">
                        <span className="text-gray-500 text-xs">AI-Powered Strategy Generation &bull; Approx 30s</span>
                        <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-pink-500/30 cursor-pointer" onClick={handleSubmit}>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-5 overflow-y-auto max-h-100 pr-2 custom-scrollbar">
                {reports && reports.length > 0 ? (
                    reports.map((report) => (
                        <button
                            key={report.id}
                            onClick={() => navigate(`/interview/${report.id}`)}
                            className="group w-full text-left border border-zinc-800/60 rounded-xl overflow-hidden transition-all duration-300 hover:border-pink-500/30 hover:bg-zinc-800/30 focus:outline-none bg-zinc-900/40"
                        >
                            <div className="flex items-center justify-between px-5 py-4 border border-zinc-700">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-pink-500/10 transition-colors">
                                        <BarChart2 className={`w-5 h-5 ${report.matchScore > 50 ? 'text-emerald-400' : 'text-amber-400'}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                                            {report.title || "Untitled Interview"}
                                        </p>
                                        <p className="text-[11px] text-zinc-500 mt-0.5 uppercase tracking-wider">
                                            Match Score: <span className="text-zinc-300">{report.matchScore}%</span>
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-sm text-zinc-400">No reports found yet. Generate your first strategy above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}