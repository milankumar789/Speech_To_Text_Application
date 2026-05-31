import { Link, useNavigate }
    from "react-router-dom";

import {
    getEmail,
    removeToken
}
    from "../utils/token";

export default function Navbar() {

    const navigate =
        useNavigate();

    const email =
        getEmail();

    const logout = () => {

        removeToken();

        navigate("/");
    };

    return (

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-5 shadow-xl mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Speech To Text
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Logged in as:
                        <span className="text-blue-400 ml-2">
                            {email}
                        </span>
                    </p>

                </div>

                <div className="flex gap-3">

                    <Link
                        to="/dashboard"
                        className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-2 rounded-lg"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/history"
                        className="bg-slate-700 hover:bg-slate-600 transition-all text-white px-5 py-2 rounded-lg"
                    >
                        History
                    </Link>

                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 transition-all text-white px-5 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}