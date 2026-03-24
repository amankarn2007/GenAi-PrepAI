

export default function Loader() {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
          <p className="text-sm text-zinc-500">Loading report...</p>
        </div>
      </div>
    );
}