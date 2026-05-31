import { useState, useRef } from "react";

export default function useRecorder() {

    const [recording, setRecording] =
        useState(false);

    const mediaRecorderRef =
        useRef(null);

    const chunksRef =
        useRef([]);

    const startRecording =
        async () => {

            try {

                const stream =
                    await navigator.mediaDevices
                        .getUserMedia({
                            audio: true,
                        });

                const mediaRecorder =
                    new MediaRecorder(stream);

                mediaRecorderRef.current =
                    mediaRecorder;

                chunksRef.current = [];

                mediaRecorder.ondataavailable =
                    (event) => {

                        if (event.data.size > 0) {

                            chunksRef.current.push(
                                event.data
                            );
                        }
                    };

                mediaRecorder.start();

                setRecording(true);

            } catch (error) {

                alert(
                    "Microphone permission denied"
                );
            }
        };

    const stopRecording =
        () => {

            return new Promise((resolve) => {

                const mediaRecorder =
                    mediaRecorderRef.current;

                mediaRecorder.onstop =
                    () => {

                        const blob =
                            new Blob(
                                chunksRef.current,
                                {
                                    type:
                                        "audio/webm",
                                }
                            );

                        resolve(blob);
                    };

                mediaRecorder.stop();

                setRecording(false);
            });
        };

    return {
        recording,
        startRecording,
        stopRecording,
    };
}