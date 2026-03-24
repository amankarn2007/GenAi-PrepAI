import { useState } from "react";


interface QuestionProps {
  item: {
    question: string;
    answer?: string;
  };
  index: number;
}

export const QuestionCard = ({item, index}: QuestionProps) => {
  const [open, setOpen] = useState(false);
  
  const questionText = item.question || "";
  const aiAnswer = item.answer || "No sample answer available.";
  
  // Strip markdown bold markers if any
  const cleanText = (text: string) => text.replace(/\*\*(.*?)\*\*/g, "$1");

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-zinc-800 rounded-xl overflow-hidden transition-all duration-200 focus:outline-none cursor-pointer"
    >
      <div className="flex items-start gap-3 px-5 py-4 bg-zinc-900 hover:bg-zinc-800/70 transition-colors">
        <span className="text-[11px] font-mono text-zinc-600 mt-0.5 shrink-0 w-5">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="text-sm text-zinc-300 leading-relaxed flex-1">{cleanText(questionText)}</p>
        <span
          className="text-zinc-600 text-base shrink-0 mt-0.5 transition-transform duration-200 inline-block"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </div>
      {open && (
        <div className="px-5 py-5 bg-zinc-950/50 border-t border-zinc-800/50">
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-widest text-pink-500 font-semibold mb-2">
              Sample Answer / Intention
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed italic">
              "{cleanText(aiAnswer)}"
            </p>
          </div>
          
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">
              Preparation Tip
            </p>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Use the <strong>STAR</strong> format: Situation → Task → Action → Result.
            </p>
          </div>
        </div>
      )}
    </button>
  );
};