import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser }
    from "../services/authService";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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

            await registerUser(form);

            alert(
                "Registered Successfully"
            );

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data ||
                "Registration Failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Join Speech To Text Platform
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        name="name"
                        placeholder="Full Name"
                        className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                    />

                    <button
                        className="w-full bg-green-600 hover:bg-green-700 transition-all text-white font-semibold p-3 rounded-lg"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center text-slate-400 mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/"
                        className="text-green-400 hover:text-green-300"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}