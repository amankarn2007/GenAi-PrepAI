import { useState } from "react";


export const QuestionCard = ({ item, index }: { item: string; index: number }) => {
  const [open, setOpen] = useState(false);

  // Strip markdown bold markers if any
  const cleanText = item.replace(/\*\*(.*?)\*\*/g, "$1");

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-zinc-800 rounded-xl overflow-hidden transition-all duration-200 focus:outline-none cursor-pointer"
    >
      <div className="flex items-start gap-3 px-5 py-4 bg-zinc-900 hover:bg-zinc-800/70 transition-colors">
        <span className="text-[11px] font-mono text-zinc-600 mt-0.5 shrink-0 w-5">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="text-sm text-zinc-300 leading-relaxed flex-1">{cleanText}</p>
        <span
          className="text-zinc-600 text-base shrink-0 mt-0.5 transition-transform duration-200 inline-block"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </div>
      {open && (
        <div className="px-5 py-4 bg-zinc-950 border-t border-zinc-800 text-left">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
            Prepare your answer
          </p>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Think about a specific example from your projects or experience that
            directly addresses this question. Use the STAR format: Situation →
            Task → Action → Result.
          </p>
        </div>
      )}
    </button>
  );
};