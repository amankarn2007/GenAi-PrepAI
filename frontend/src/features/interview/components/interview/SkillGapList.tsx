

//export const SkillGapsList = ({ skillGaps }: { skillGaps: string[] }) => (
//  <div>
//    <p className="text-[12px] uppercase tracking-widest text-zinc-400 mb-3">Skill gaps</p>
//    <div className="flex flex-col gap-2">
//        {skillGaps.map((gap, i) => {
//            const clean = gap.replace(/\*\*(.*?)\*\*/g, "$1");
//            const colonIdx = clean.indexOf(":");
//            const label = colonIdx !== -1 ? clean.slice(0, colonIdx).trim() : clean;
//            const detail = colonIdx !== -1 ? clean.slice(colonIdx + 1).trim() : "";
            
//            return (
//            <div key={i} className="border-b border-zinc-800/60 pb-2 last:border-0 last:pb-0">
//                <p className="text-sm text-zinc-300 font-medium leading-snug">{label}</p>
//                {detail && <p className="text-[12px] text-zinc-400 leading-relaxed mt-0.5">{detail}</p>}
//            </div>
//            );
//        })}
//    </div>
//  </div>
//);

interface SkillGap {
  id: string;
  skill: string;
  severity: string;
}

interface SkillGapsListProps {
  skillGaps: SkillGap[]; // Array of objects instead of strings
}

export const SkillGapsList = ({ skillGaps }: SkillGapsListProps) => {
  return (
    <div className="w-full">
      <p className="text-[12px] uppercase tracking-widest text-zinc-500 font-semibold mb-4">
        Skill Gaps Identified
      </p>
      
      <div className="flex flex-col gap-4">
        {skillGaps?.map((gap) => {
          // 1. Pehle skill string ko nikaalo
          const rawSkill = gap.skill || "";
          
          // 2. Markdown (**) saaf karo
          const clean = rawSkill.replace(/\*\*(.*?)\*\*/g, "$1");
          
          // 3. Colon logic (Heading vs Detail)
          const colonIdx = clean.indexOf(":");
          const label = colonIdx !== -1 ? clean.slice(0, colonIdx).trim() : clean;
          const detail = colonIdx !== -1 ? clean.slice(colonIdx + 1).trim() : "";

          return (
            <div key={gap.id} className="group">
              <div className="flex items-start gap-2.5">
                {/* Severity indicator (Chota dot) */}
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  gap.severity === "High" ? "bg-red-500" : "bg-amber-500"
                }`} />
                
                <div className="flex-1">
                  <p className="text-sm text-zinc-200 font-medium leading-tight group-hover:text-zinc-100 transition-colors">
                    {label}
                  </p>
                  {detail && (
                    <p className="text-[12px] text-zinc-500 leading-relaxed mt-1">
                      {detail}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Subtle divider */}
              <div className="h-px w-full bg-zinc-800/50 mt-4" />
            </div>
          );
        })}
      </div>

      {skillGaps?.length === 0 && (
        <p className="text-xs text-zinc-600 italic">No major skill gaps found.</p>
      )}
    </div>
  );
};