"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function TranscriptPage() {
  // Dummy meetings with transcripts
  const meetings = [
    {
      id: 1,
      title: "Project Kickoff",
      transcript: `John: Welcome everyone! Let's start the project kickoff.\nSarah: We will finalize the requirements this week.\nAlex: I'll prepare the initial backend setup by Friday.`
    },
    {
      id: 2,
      title: "Design Review",
      transcript: `Sarah: Here are the updated UI mockups.\nJohn: Looks great, let's get feedback from the team.\nAlex: I'll check the feasibility of these designs on the backend.`
    },
    {
      id: 3,
      title: "Sprint Planning",
      transcript: `John: Let's plan the tasks for the next sprint.\nAlex: We have 5 story points for the new feature.\nSarah: I will handle the UI components for these tasks.`
    }
  ];

  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(null);

  // Find the transcript of the selected meeting
  const currentTranscript = meetings.find(m => m.id === selectedMeeting)?.transcript || "";

  return (
    <main className="min-h-screen w-full bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Transcript Viewer</h1>

        {/* Meeting Selection */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Select Meeting</h2>
          </CardHeader>

          <CardContent className="space-y-2">
            {meetings.map((meeting) => (
              <button
                key={meeting.id}
                className={`w-full text-left p-3 rounded-xl border shadow-sm hover:bg-gray-100 transition ${
                  selectedMeeting === meeting.id ? "bg-gray-200 border-gray-400" : "bg-white border-gray-200"
                }`}
                onClick={() => setSelectedMeeting(meeting.id)}
              >
                {meeting.title}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Transcript Display */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Transcript</h2>
          </CardHeader>

          <CardContent>
            <div className="min-h-[300px] p-4 border rounded-xl bg-white text-gray-800 shadow-inner whitespace-pre-line">
              {currentTranscript || "Select a meeting to view its transcript."}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
