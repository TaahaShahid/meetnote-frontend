"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

export default function ExtensionPopup() {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setTime(0);
    } else {
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const lower = file.name.toLowerCase();
    const valid =
      file.type === "audio/mpeg" ||
      file.type === "video/mp4" ||
      lower.endsWith(".mp3") ||
      lower.endsWith(".mp4");
    if (!valid) {
      alert("Please upload only MP3 or MP4 files.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setUploadedFile(file);
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => {
    if (!uploadedFile && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProcessFile = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingComplete(true);
    }, 5000);
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
    <div className="min-h-screen bg-linear-to-b  bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-blue-50 rounded-3xl shadow-lg p-6 relative">
        <button
          onClick={toggleRecording}
          className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition ${
            isRecording
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-linear-to-r from-blue-500 to-purple-500 text-white"
          }`}
        >
          {isRecording ? (
            <>
              <StopCircleOutlinedIcon fontSize="medium" />
              Recording... {formatTime(time)}
            </>
          ) : (
            <>
              <MicOutlinedIcon fontSize="medium" />
              Start Recording
            </>
          )}
        </button>

        <button
          onClick={triggerFileInput}
          disabled={!!uploadedFile}
          className={`w-full mt-4 py-3 rounded-xl flex items-center justify-center gap-2 border ${
            uploadedFile
              ? "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100"
              : "border-dashed border-gray-300 text-gray-600 hover:bg-blue-50"
          }`}
        >
          <FileUploadOutlinedIcon fontSize="medium" />
          Upload Audio File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3, .mp4, audio/mpeg, video/mp4"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadedFile && !isProcessing && !processingComplete && (
          <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
            <div className="truncate">
              <p className="text-sm font-medium text-gray-800">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {Math.ceil(uploadedFile.size / 1024)} KB
              </p>
            </div>
            <div className="ml-4 flex gap-2">
              <button
                onClick={handleDeleteFile}
                className="px-3 py-1 rounded-lg text-sm bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
              >
                Delete
              </button>
              <button
                onClick={handleProcessFile}
                className="px-3 py-1 rounded-lg text-sm bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 font-medium"
              >
                Upload
              </button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-600">Processing...</p>
            </div>
          </div>
        )}

        {processingComplete && (
          <div className="mt-4 p-4 rounded-xl border border-green-200 bg-green-50 flex items-center justify-center">
            <Link
              href="/summary"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              View Summary <span className="text-xl">→</span>
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
