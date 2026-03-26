

export const MatchScoreBadge = ({ score }: { score: number }) => {
  // Level based on numerical thresholds
  const isHigh = score >= 80;
  const isMedium = score >= 40 && score < 80;
  //const isLow = score < 40;

  // Select Colors based on level
  const colors = isHigh 
    ? { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", bar: "bg-emerald-500" }
    : isMedium
    ? { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", bar: "bg-amber-500" }
    : { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", bar: "bg-red-500" };

  const label = isHigh ? "High Match" : isMedium ? "Average Match" : "Low Match";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
            Overall Match
          </p>
          <span className={`text-xs font-medium px-2 py-0.5 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
            {label}
          </span>
        </div>
        <div className={`text-2xl font-bold mr-3 tracking-tighter ${colors.text}`}>
          {score}<span className="text-lg opacity-60">%</span>
        </div>
      </div>

      <div className="w-full bg-zinc-800/50 rounded-full h-2 overflow-hidden border border-zinc-800">
        <div 
          className={`h-full rounded-full ${colors.bar} transition-all duration-1000 ease-out`} 
          style={{ width: `${score}%` }} // Inline style for precise width
        />
      </div>
      
      <p className="text-[12px] text-zinc-400 leading-relaxed">
        Based on your technical skills and project experience relative to the JD.
      </p>
    </div>
  );
};