"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  // Dummy meeting data
  const meetings = [
    {
      id: 1,
      title: "Project Kickoff",
      date: "Nov 14, 2025",
      duration: "1.33", // in hours
      summary: "Discussed project scope, assigned tasks, and set deadlines."
    },
    {
      id: 2,
      title: "Design Review",
      date: "Nov 12, 2025",
      duration: "0.83", // 50 min
      summary: "Reviewed UI/UX designs, gathered feedback, and finalized wireframes."
    },
    {
      id: 3,
      title: "Sprint Planning",
      date: "Nov 10, 2025",
      duration: "1.17", // 1h 10min
      summary: "Planned tasks for the upcoming sprint, assigned story points, and clarified requirements."
    },
    {
      id: 4,
      title: "Weekly Sync",
      date: "Nov 14, 2025",
      duration: "0.5",
      summary: "Team synced up on ongoing tasks."
    },
  ];

  // Prepare data for chart: number of meetings per day
  const chartData = meetings.reduce<Record<string, { date: string; meetings: number }>>((acc, m) => {
    if (!acc[m.date]) acc[m.date] = { date: m.date, meetings: 0 };
    acc[m.date].meetings += 1;
    return acc;
  }, {});

  const chartArray = Object.values(chartData);

  // Total hours recorded
  const totalHours = meetings.reduce((acc, m) => acc + parseFloat(m.duration), 0);

  return (
    <main className="min-h-screen w-full bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-10">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard Overview</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 shadow-lg border-none">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">Total Meetings</h3>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{meetings.length}</CardContent>
          </Card>

          <Card className="p-6 shadow-lg border-none">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">Hours Recorded</h3>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{totalHours.toFixed(1)}h</CardContent>
          </Card>

          <Card className="p-6 shadow-lg border-none">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">Summaries Created</h3>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{meetings.length}</CardContent>
          </Card>
        </div>

        {/* Meeting Graph */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Meetings Per Day</h2>
          </CardHeader>

          <CardContent style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartArray}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="meetings" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Meetings List */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Recent Meetings</h2>
          </CardHeader>

          <CardContent className="space-y-4">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-100 transition"
              >
                <p className="font-semibold text-gray-900">{meeting.title}</p>
                <p className="text-sm text-gray-600">
                  {meeting.date} · {meeting.duration}h
                </p>
                <p className="text-sm text-gray-700 mt-1">{meeting.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
