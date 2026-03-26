import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register } from "../services/auth.api";


interface RegisterType {
    username: string,
    email: string,
    password: string
}

interface LoginType {
    email: string,
    password: string
}

// useAuth will handle state and auth api logics
export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider");

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }: LoginType) => {
        setLoading(true);

        try {
            const data = await login({ email, password });
            setUser(data.user);
            return true; //successfully login
        } catch(err) {
            console.log("Client side error in login function");
            return false; //error in login
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
    }

    const handleRegister = async ({ username, email, password }: RegisterType) => {
        setLoading(true);
        
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return true;
        } catch(err) {
            console.log("Client side error in register function");
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);

        try {
            const data = await logout();
            setUser(null);

        } catch(err) {
            console.log("Client side error in logout function")
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}