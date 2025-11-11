"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      // SYSTEM AUDIO (tab / system audio)
      const systemStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: false,
      });

      // MICROPHONE AUDIO
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Combine both streams
      const combinedTracks = [
        ...systemStream.getAudioTracks(),
        ...micStream.getAudioTracks(),
      ];

      const mixedStream = new MediaStream(combinedTracks);

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(mixedStream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = handleStop;

      mediaRecorder.start();
      setRecording(true);

      console.log("Recording started...");
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      console.log("Recording stopped.");
    }
  };

  const handleStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

    console.log("Audio blob created:", audioBlob);

    // Convert Blob to WAV file-like object
    const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });

    // Prepare to send to backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Placeholder API — update later when backend is ready
      const response = await fetch("https://example.com/api/process_audio", {
        method: "POST",
        body: formData,
      });

      console.log("Uploaded successfully:", response);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">MeetNote Audio Recorder</h1>

      {!recording ? (
        <button
          onClick={startRecording}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-6 py-3 bg-red-600 text-white rounded-lg"
        >
          Stop Recording
        </button>
      )}
    </div>
  );
}
