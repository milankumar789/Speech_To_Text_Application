import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authService";

import {
    saveToken,
    saveEmail
} from "../utils/token";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await loginUser(form);

            saveToken(response.token);

            saveEmail(form.email);

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data ||
                "Login Failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Speech To Text
                    </h1>

                    <p className="text-slate-400 mt-2">
                        AI Powered Audio Transcription
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                    />

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold p-3 rounded-lg"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-slate-400 mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}