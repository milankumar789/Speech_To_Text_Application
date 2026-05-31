import { useState } from "react";

import API from "../services/api";

export default function UploadAudio({
                                        setTranscript,
                                    }) {

    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const uploadAudio = async () => {

        if (!file) {

            alert("Select a file");

            return;
        }

        try {

            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            const response =
                await API.post(
                    "/api/speech/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

            setTranscript(
                response.data.transcript
            );

        } catch (error) {

            alert(
                error.response?.data ||
                "Upload Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">

            <h2 className="text-xl font-semibold text-white mb-4">
                Upload Audio File
            </h2>

            <input
                type="file"
                className="w-full text-slate-300 mb-4"
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }
            />

            <button
                onClick={uploadAudio}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-3 rounded-lg"
            >
                {loading
                    ? "Processing..."
                    : "Upload Audio"}
            </button>

        </div>
    );
}