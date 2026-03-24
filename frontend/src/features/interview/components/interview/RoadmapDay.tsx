


export const RoadMapDay = ({ item, index, isLast }: { item: string, index: number, isLast: boolean }) => {
  // Clean up markdown bold markers like **Text:**
  const clean = item.replace(/\*\*(.*?)\*\*/g, "$1");

  // Split heading from body if there's a colon separator
  const colonIdx = clean.indexOf(":");
  const heading = colonIdx !== -1 ? clean.slice(0, colonIdx).trim() : `Step ${index + 1}`;
  const body = colonIdx !== -1 ? clean.slice(colonIdx + 1).trim() : clean;

  return (
    <div className="flex gap-4 cursor-pointer group">
        <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center shrink-0 group-hover:bg-red-800">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-white">{String(index + 1).padStart(2, "0")}</span>
            </div>

            { !isLast && 
                <div className="w-px flex-1 bg-zinc-800 my-1 min-h-5" />
            }
        </div>

        <div className="pb-5 flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 mb-1.5 mt-0.5 leading-snug">{heading}</p>
            <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
        </div>
    </div>
  );
};