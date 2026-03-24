

export const StrengthsList = ({ strengths }: { strengths: string[] }) => (
  <div>
    <p className="text-[12px] uppercase tracking-widest text-zinc-400 mb-3">Strengths</p>
    <div className="flex flex-col gap-2">
      {strengths?.map((s, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-emerald-600 text-xs mt-0.5 shrink-0">✓</span>
          <p className="text-sm text-zinc-400 leading-relaxed">{s.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
        </div>
      ))}
    </div>
  </div>
);