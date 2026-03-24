

export const MatchScoreBadge = ({ score }: { score: number }) => {
  const config = {
    High:   { color: "text-emerald-400", bg: "bg-emerald-950", border: "border-emerald-900", bar: "bg-emerald-500", width: "w-4/5" },
    Medium: { color: "text-amber-400",   bg: "bg-amber-950",   border: "border-amber-900",   bar: "bg-amber-500",   width: "w-2/4" },
    Low:    { color: "text-red-400",     bg: "bg-red-950",     border: "border-red-900",      bar: "bg-red-500",     width: "w-1/5" },
  }[score] ?? {
    color: "text-zinc-400", bg: "bg-zinc-800", border: "border-zinc-700", bar: "bg-zinc-500", width: "w-1/2",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[12px] uppercase tracking-widest text-zinc-400">Match score</p>
      <div className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${config.bg} ${config.color} ${config.border}`}>
        {score}
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full ${config.bar} ${config.width} transition-all duration-700`} />
      </div>
    </div>
  );
};