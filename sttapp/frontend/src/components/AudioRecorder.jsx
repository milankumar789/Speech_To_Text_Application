import API from "../services/api";

import useRecorder
    from "../hooks/useRecorder";

export default function AudioRecorder({
                                          setTranscript,
                                      }) {

    const {
        recording,
        startRecording,
        stopRecording,
    } = useRecorder();

    const handleRecording =
        async () => {

            if (!recording) {

                await startRecording();

            } else {

                const blob =
                    await stopRecording();

                const file =
                    new File(
                        [blob],
                        "recording.webm",
                        {
                            type:
                                "audio/webm",
                        }
                    );

                const formData =
                    new FormData();

                formData.append(
                    "file",
                    file
                );

                try {

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
                        "Recording upload failed"
                    );
                }
            }
        };

    return (

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">

            <h2 className="text-xl font-semibold text-white mb-4">
                Voice Recorder
            </h2>

            <button
                onClick={handleRecording}
                className={
                    recording
                        ? "bg-red-600 hover:bg-red-700 transition-all text-white px-5 py-3 rounded-lg"
                        : "bg-green-600 hover:bg-green-700 transition-all text-white px-5 py-3 rounded-lg"
                }
            >
                {recording
                    ? "Stop Recording"
                    : "Start Recording"}
            </button>

        </div>
    );
}