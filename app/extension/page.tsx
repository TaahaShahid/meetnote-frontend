"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

const API_BASE = "http://localhost:8000";

export default function ExtensionPopup() {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingCountRef = useRef(1);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRecording) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const fileName = `meetnote_recording_${recordingCountRef.current}.webm`;
        recordingCountRef.current += 1;

        const file = new File([blob], fileName, {
          type: "audio/webm",
        });

        setUploadedFile(file);

        stream.getTracks().forEach((track) => track.stop());
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTime(0);
    } catch (err) {
      alert("Microphone access is required to record audio");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setTime(0);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const lower = file.name.toLowerCase();
    const valid =
      file.type.startsWith("audio/") ||
      lower.endsWith(".mp3") ||
      lower.endsWith(".mp4") ||
      lower.endsWith(".webm");

    if (!valid) {
      alert("Please upload a valid audio file");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploadedFile(file);
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setProcessingComplete(false);
    setApiResponse(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => {
    if (!uploadedFile && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProcessFile = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProcessingComplete(false);
    setApiResponse(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("language", "en");
      formData.append("max_summary_length", "150");
      formData.append("min_summary_length", "40");
      formData.append("num_keywords", "10");
      formData.append("summary_temperature", "0.3");
      formData.append("include_metadata", "true");

      const res = await fetch(`${API_BASE}/process`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Processing failed");
      }

      const data = await res.json();
      setApiResponse(data);
      setProcessingComplete(true);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  const meetings = [
    {
      title: "Product Strategy Meeting",
      time: "Today, 2:30 PM",
      duration: "45 min",
    },
    { title: "Team Standup", time: "Yesterday, 10:00 AM", duration: "15 min" },
    {
      title: "Client Review Session",
      time: "Nov 7, 3:00 PM",
      duration: "1h 20m",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-blue-50 rounded-3xl shadow-lg p-6">
        <button
          onClick={toggleRecording}
          className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg ${
            isRecording
              ? "bg-red-500 text-white"
              : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          }`}
        >
          {isRecording ? (
            <>
              <StopCircleOutlinedIcon />
              Recording {formatTime(time)}
            </>
          ) : (
            <>
              <MicOutlinedIcon />
              Start Recording
            </>
          )}
        </button>

        <button
          onClick={triggerFileInput}
          disabled={!!uploadedFile}
          className={`w-full mt-4 py-3 rounded-xl flex items-center justify-center gap-2 border ${
            uploadedFile
              ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
              : "border-dashed border-gray-300 text-gray-600"
          }`}
        >
          <FileUploadOutlinedIcon />
          Upload Audio File
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadedFile && !isProcessing && !processingComplete && (
          <div className="mt-4 p-4 rounded-xl bg-white border flex justify-between items-center">
            <div className="truncate">
              <p className="text-sm font-medium">{uploadedFile.name}</p>
              <p className="text-xs text-gray-500">
                {Math.ceil(uploadedFile.size / 1024)} KB
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteFile}
                className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={handleProcessFile}
                className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg"
              >
                Upload
              </button>
            </div>
          </div>
        )}

        {/* Loading spinner */}
        {isProcessing && (
          <div className="mt-4 p-4 bg-white border rounded-xl flex justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-sm">Processing...</p>
            </div>
          </div>
        )}

        {/* Temporary backend response */}
        {apiResponse && !isProcessing && (
          <div className="mt-4 p-4 bg-white border rounded-xl text-sm overflow-auto max-h-60">
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}

        {/* Processing complete confirmation */}
        {processingComplete && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
            <Link href="/summary" className="text-green-600 font-medium">
              View Summary →
            </Link>
          </div>
        )}

        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-gray-800">Recent Meetings</h2>
            <a href="#" className="text-blue-500 text-sm">
              View All
            </a>
          </div>

          <div className="flex flex-col gap-3">
            {meetings.map((m, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-gray-200 bg-blue-100"
              >
                <p className="font-medium text-gray-800">{m.title}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <span>🕒</span>
                  <span>{m.time}</span> • <span>{m.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
