"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Video, Globe, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>

        {/* General Settings */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <User size={20} />
              General
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Output Language</p>
                <p className="text-sm text-gray-600">Select your preferred output language</p>
              </div>
              <select className="border rounded px-3 py-1">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Receive Email</p>
                <p className="text-sm text-gray-600">Enter your email for Meeting Summary</p>
              </div>
              <input type="email" placeholder="your@email.com" className="border rounded px-3 py-1" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Time Zone</p>
                <p className="text-sm text-gray-600">Set your local time zone</p>
              </div>
              <select className="border rounded px-3 py-1">
                <option>UTC+5 (Asia/Karachi)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC-5 (EST)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Meeting Reminders</p>
                <p className="text-sm text-gray-600">Get notified before meetings start</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Summary Ready</p>
                <p className="text-sm text-gray-600">Notify when AI summaries are generated</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-gray-600">Receive weekly meeting summaries</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Globe size={20} />
              Integrations
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-gray-600">Sync meetings from your calendar</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium">Zoom</p>
                  <p className="text-sm text-gray-600">Integrate with Zoom meetings</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium">Microsoft Teams</p>
                  <p className="text-sm text-gray-600">Integrate with Teams meetings</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </div>
      </div>
    </main>
  );
}