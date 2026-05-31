import { useState } from "react";

import Navbar from "../components/Navbar";

import UploadAudio
    from "../components/UploadAudio";

import AudioRecorder
    from "../components/AudioRecorder";

export default function Dashboard() {

    const [transcript, setTranscript] =
        useState("");

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">

            <div className="max-w-6xl mx-auto">

                <Navbar />

                <div className="grid md:grid-cols-2 gap-6">

                    <UploadAudio
                        setTranscript={setTranscript}
                    />

                    <AudioRecorder
                        setTranscript={setTranscript}
                    />

                </div>

                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl mt-8">

                    <h2 className="text-2xl font-bold text-white mb-4">
                        Transcript Result
                    </h2>

                    <div className="text-slate-300 leading-7">

                        {transcript ||
                            "Upload audio or record voice to generate transcript."}

                    </div>

                </div>

            </div>

        </div>
    );
}