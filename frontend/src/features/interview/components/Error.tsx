import { useNavigate } from "react-router"


export default function Error() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <div className="text-center">
                <p className="text-lg text-red-400 mb-4"> Report not found </p>
                <button onClick={() => navigate("/")}
                    className=" text-zinc-500 hover:text-zinc-300 underline underline-offset-4 transition-colors"
                >
                    Go back home
                </button>
            </div>
        </div>
    )
}