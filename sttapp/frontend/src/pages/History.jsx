import { useEffect, useState }
    from "react";

import API from "../services/api";

import Navbar
    from "../components/Navbar";

import TranscriptCard
    from "../components/TranscriptCard";

export default function History() {

    const [history, setHistory] =
        useState([]);

    const fetchHistory =
        async () => {

            try {

                const response =
                    await API.get(
                        "/api/speech/history"
                    );

                setHistory(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        fetchHistory();

    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">

            <div className="max-w-6xl mx-auto">

                <Navbar />

                <h1 className="text-4xl font-bold text-white mb-8">
                    Transcript History
                </h1>

                {history.length === 0 ? (

                    <div className="bg-slate-800 rounded-2xl p-6 text-slate-300">
                        No transcripts found
                    </div>

                ) : (

                    history.map((item) => (

                        <TranscriptCard
                            key={item.id}
                            transcript={item}
                            refreshHistory={fetchHistory}
                        />

                    ))

                )}

            </div>

        </div>
    );
}