"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useState } from "react";

export default function SummaryPage() {
  // Dummy meetings
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
  const [summary, setSummary] = useState<string | null>(null);

  const generateSummary = () => {
    if (selectedMeeting === null) return;
    // For demo: generate dummy summary based on selected meeting
    const meeting = meetings.find(m => m.id === selectedMeeting);
    const dummySummary = `Summary for "${meeting?.title}":\n- Key discussion points recorded.\n- Action items identified.\n- Next steps planned.`;
    setSummary(dummySummary);
  };

  return (
    <main className="min-h-screen w-full bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Meeting Summaries</h1>

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

        {/* Generate Summary */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Summary Generator</h2>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              className="bg-purple-600 text-white"
              onClick={generateSummary}
              disabled={selectedMeeting === null}
            >
              <Wand2 className="mr-2 h-4 w-4" /> Generate Summary
            </Button>

            <div className="min-h-[200px] text-gray-800 border rounded-xl p-4 bg-white shadow-inner whitespace-pre-line">
              {summary || "Select a meeting and click 'Generate Summary'."}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
