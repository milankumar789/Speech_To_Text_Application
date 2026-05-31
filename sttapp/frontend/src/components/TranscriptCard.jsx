import API from "../services/api";

export default function TranscriptCard({
                                           transcript,
                                           refreshHistory,
                                       }) {

    const deleteTranscript =
        async () => {

            try {

                await API.delete(
                    `/api/speech/${transcript.id}`
                );

                refreshHistory();

            } catch (error) {

                alert(
                    error.response?.data ||
                    "Delete Failed"
                );
            }
        };

    const downloadTranscript =
        async () => {

            try {

                const response =
                    await API.get(
                        `/api/speech/download/${transcript.id}`,
                        {
                            responseType: "blob",
                        }
                    );

                const url =
                    window.URL.createObjectURL(
                        new Blob([response.data])
                    );

                const link =
                    document.createElement("a");

                link.href = url;

                link.setAttribute(
                    "download",
                    "transcript.txt"
                );

                document.body.appendChild(
                    link
                );

                link.click();

                link.remove();

            } catch {

                alert(
                    "Download Failed"
                );
            }
        };

    return (

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl mb-6 hover:scale-[1.01] transition-all">

            <h3 className="text-xl font-bold text-white mb-3">
                {transcript.audioFile}
            </h3>

            <p className="text-slate-300 leading-7">
                {transcript.transcript}
            </p>

            <div className="flex gap-3 mt-6">

                <button
                    onClick={downloadTranscript}
                    className="bg-green-600 hover:bg-green-700 transition-all text-white px-5 py-2 rounded-lg"
                >
                    Download
                </button>

                <button
                    onClick={deleteTranscript}
                    className="bg-red-600 hover:bg-red-700 transition-all text-white px-5 py-2 rounded-lg"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}