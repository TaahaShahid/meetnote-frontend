"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Video, Globe, User } from "lucide-react";

import {
  areUserSettingsEqual,
  cloneUserSettings,
  defaultUserSettings,
  loadUserSettings,
  saveUserSettings,
  type OutputLanguage,
  type UserSettings,
} from "@/lib/user-settings";

const OUTPUT_LANGUAGES: OutputLanguage[] = ["English", "Spanish", "French"];

const TIME_ZONES = [
  "UTC+5 (Asia/Karachi)",
  "UTC+0 (GMT)",
  "UTC-5 (EST)",
] as const;

type SaveStatus = "idle" | "saved";

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(defaultUserSettings);
  const [initialSettings, setInitialSettings] = useState<UserSettings | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    const loaded = loadUserSettings();

    // Avoid setState synchronously inside the effect body (react-hooks/set-state-in-effect).
    const raf = window.requestAnimationFrame(() => {
      setSettings(loaded);
      setInitialSettings(cloneUserSettings(loaded));
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  const isDirty = useMemo(() => {
    if (!initialSettings) return false;
    return !areUserSettingsEqual(settings, initialSettings);
  }, [initialSettings, settings]);

  function handleSave() {
    saveUserSettings(settings);
    setInitialSettings(cloneUserSettings(settings));
    setSaveStatus("saved");
    window.setTimeout(() => setSaveStatus("idle"), 1500);
  }

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
              <select
                className="border rounded px-3 py-1"
                value={settings.outputLanguage}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    outputLanguage: e.target.value as OutputLanguage,
                  }))
                }
              >
                {OUTPUT_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Receive Email</p>
                <p className="text-sm text-gray-600">Enter your email for Meeting Summary</p>
              </div>
              <input
                type="email"
                placeholder="your@email.com"
                className="border rounded px-3 py-1"
                value={settings.email}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Time Zone</p>
                <p className="text-sm text-gray-600">Set your local time zone</p>
              </div>
              <select
                className="border rounded px-3 py-1"
                value={settings.timeZone}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, timeZone: e.target.value }))
                }
              >
                {TIME_ZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
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
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={settings.notifications.meetingReminders}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      meetingReminders: e.target.checked,
                    },
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Summary Ready</p>
                <p className="text-sm text-gray-600">Notify when AI summaries are generated</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={settings.notifications.summaryReady}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      summaryReady: e.target.checked,
                    },
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-gray-600">Receive weekly meeting summaries</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={settings.notifications.weeklyReports}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      weeklyReports: e.target.checked,
                    },
                  }))
                }
              />
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
        <div className="flex justify-end items-center gap-4">
          {saveStatus === "saved" && (
            <p className="text-sm text-gray-600">Saved.</p>
          )}

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
            disabled={!isDirty}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </main>
  );
}
