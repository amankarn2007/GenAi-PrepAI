import { useInterview } from "../../hooks/useInterview"
import Loader from "../Loader";

export default function Header() {
    const { getLogedOut, loading } = useInterview();

    async function handleLogout() {
        await getLogedOut();
    }
    
    if(loading) {
        return <Loader />
    }

    return (
        <div className='w-full flex flex-col items-center relative'>
            <h1 className="text-4xl text-white font-bold">
                Create Your Custom <span className='text-pink-500'>Interview Plan</span>
            </h1>
            <p className="text-gray-400 w-[75%] text-center py-2">
                Let our AI analyze the job requirements and your unique profile to build a winning strategy.
            </p>

            <div className="absolute px-5 py-2 top-0 right-[-30%] flex items-center gap-5">
                <div className="bg-pink-400 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-pink-500">
                    <p className="text-2xl font-semibold">A</p>
                </div>

                <div className="text-2xl cursor-pointer opacity-60 hover:opacity-100 hover:text-pink-300" 
                onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </div>
        </div>
    )
}