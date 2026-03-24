

interface PreparationStep {
  id: string;
  day: number;
  focus: string;
  task: string[]; // <--- Backend se array aa raha hai
}

interface RoadMapDayProps {
  item: PreparationStep;
  index: number;
  isLast: boolean;
}

export const RoadMapDay = ({ item, index, isLast }: RoadMapDayProps) => {
  // Clean up markdown bold markers like **Text:**
  const cleanText = (text: string) => text.replace(/\*\*(.*?)\*\*/g, "$1");

//  return (
//    <div className="flex gap-4 cursor-pointer group">
//        <div className="flex flex-col items-center">
//            <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center shrink-0 group-hover:bg-red-800">
//                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-white">{String(index + 1).padStart(2, "0")}</span>
//            </div>

//            { !isLast && 
//                <div className="w-px flex-1 bg-zinc-800 my-1 min-h-5" />
//            }
//        </div>

//        <div className="pb-5 flex-1 min-w-0">
//            <p className="text-sm font-medium text-zinc-200 mb-1.5 mt-0.5 leading-snug">{heading}</p>
//            <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
//        </div>
//    </div>
//  );

    return (
        <div className="flex gap-4 group">
        {/* ── Timeline (Line & Circle) ── */}
        <div className="flex flex-col items-center shrink-0">
            <div className="w-9 h-9 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center transition-colors group-hover:border-pink-500/50 group-hover:bg-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 group-hover:text-pink-400">
                {String(item.day || index + 1).padStart(2, "0")}
            </span>
            </div>

            {!isLast && (
            <div className="w-px flex-1 bg-zinc-800 my-1 min-h-[40px] group-hover:bg-zinc-700" />
            )}
        </div>

        {/* ── Content ── */}
        <div className="pb-8 flex-1 min-w-0">
            {/* Focus as Heading */}
            <h4 className="text-sm font-semibold text-zinc-200 mb-2 mt-1.5 uppercase tracking-wide">
            {cleanText(item.focus)}
            </h4>

            {/* Tasks as List Items */}
            <div className="space-y-2">
            {item.task?.map((t, idx) => (
                <div key={idx} className="flex gap-2.5">
                {/* Chota dot bullet point ke liye */}
                <div className="w-1 h-1 rounded-full bg-zinc-700 mt-2 shrink-0" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                    {cleanText(t)}
                </p>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};