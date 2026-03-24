

export const SkillGapsList = ({ skillGaps }: { skillGaps: string[] }) => (
  <div>
    <p className="text-[12px] uppercase tracking-widest text-zinc-400 mb-3">Skill gaps</p>
    <div className="flex flex-col gap-2">
        {skillGaps.map((gap, i) => {
            const clean = gap.replace(/\*\*(.*?)\*\*/g, "$1");
            const colonIdx = clean.indexOf(":");
            const label = colonIdx !== -1 ? clean.slice(0, colonIdx).trim() : clean;
            const detail = colonIdx !== -1 ? clean.slice(colonIdx + 1).trim() : "";
            
            return (
            <div key={i} className="border-b border-zinc-800/60 pb-2 last:border-0 last:pb-0">
                <p className="text-sm text-zinc-300 font-medium leading-snug">{label}</p>
                {detail && <p className="text-[12px] text-zinc-400 leading-relaxed mt-0.5">{detail}</p>}
            </div>
            );
        })}
    </div>
  </div>
);