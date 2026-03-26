import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth";
import Loader from "../../interview/components/Loader";
import Flash from "../components/Flash";

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [flash, setFlash] = useState(false);

    const { loading, handleLogin } = useAuth();

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const success = await handleLogin({email, password});
        if(success) {
            navigate("/dashboard");
        } else {
            setFlash(true);
        }
    }

    if(loading) {
        return <Loader />
    }

    return (
        <div className="w-full h-screen bg-gray-950 flex items-center justify-center relative">
            <div className="flex flex-col px-5 py-2 gap-5 text-black">
                <h2 className="text-white text-5xl py-5">Login</h2>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-lg font-semibold">Email</label>
                    <input type="text" placeholder="Enter email address" className="pr-50 pl-5 py-3 rounded-2xl text-start bg-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-lg font-semibold">Password</label>
                    <input type="text" placeholder="Enter password" className="pr-50 pl-5 py-3 rounded-2xl text-start bg-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mt-2">
                    <button className="py-3 w-full rounded-2xl text-white bg-red-600 cursor-pointer active:scale-103 transition-transform duration-300 ease-in-out" onClick={handleSubmit}>
                        Login
                    </button>

                    <p className="text-white ml-2 mt-2">Don't have an account ? <span className="text-red-700 cursor-pointer" onClick={() => navigate("/register")}>Register</span></p>
                </div>
            </div>
            
            { flash && <Flash setFlash={setFlash} /> }
        </div>
    )
}