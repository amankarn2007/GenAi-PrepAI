import axios from "axios";
//auth api is purly based on backend communication, send backend api reqs

interface Register {
    username: string,
    email: string,
    password: string
}

//const baseUrl = "http://localhost:3000";
//const baseUrl = ""; // deployed backend, " " becase of vercel.json

export async function register({username, email, password}: Register) {
    try {
        const response = await axios.post(`/api/auth/register`, {
            username, email, password
        }, {
            withCredentials: true
        })

        return response.data;

    } catch(err) {
        console.log(err);
    }
}

export async function login({email, password}: {email: string, password: string}) {
    try {
        console.log("req reached to auth logic")
        const response = await axios.post(`/api/auth/login`, {
            email, password
        }, {
            withCredentials: true
        })

        return response.data;

    } catch(err) {
        console.log(err);
    }
}

export async function logout() {
    try {
        const response = await axios.get(`/api/auth/logout`, {
            withCredentials: true
        });

        return response.data;

    } catch(err) {
        console.log(err);
    }
}

export async function getMe() {
    try {
        const response = await axios.get(`/api/auth/get-me`, {
            withCredentials: true
        })

        return response.data;

    } catch(err) {
        console.log(err);
    }
}

export async function  regreshToken() {
    try {
        const res = await axios.get(`/api/auth/refresh-token`, {
            withCredentials: true
        })

        return res.data;

    } catch(err) {
        console.log(err);
    }
}