export type OutputLanguage = "English" | "Spanish" | "French"

export type UserSettings = {
  outputLanguage: OutputLanguage
  email: string
  timeZone: string
  notifications: {
    meetingReminders: boolean
    summaryReady: boolean
    weeklyReports: boolean
  }
}

export const defaultUserSettings: UserSettings = {
  outputLanguage: "English",
  email: "",
  timeZone: "UTC+5 (Asia/Karachi)",
  notifications: {
    meetingReminders: true,
    summaryReady: true,
    weeklyReports: false,
  },
}

const STORAGE_KEY = "meetnote:userSettings:v1"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function sanitizeOutputLanguage(value: unknown): OutputLanguage {
  if (value === "English" || value === "Spanish" || value === "French") return value
  return defaultUserSettings.outputLanguage
}

function sanitizeUserSettings(value: unknown): UserSettings {
  const v = isRecord(value) ? value : {}
  const notifications = isRecord(v.notifications) ? v.notifications : {}

  return {
    outputLanguage: sanitizeOutputLanguage(v.outputLanguage),
    email: typeof v.email === "string" ? v.email : defaultUserSettings.email,
    timeZone:
      typeof v.timeZone === "string" ? v.timeZone : defaultUserSettings.timeZone,
    notifications: {
      meetingReminders:
        typeof notifications.meetingReminders === "boolean"
          ? notifications.meetingReminders
          : defaultUserSettings.notifications.meetingReminders,
      summaryReady:
        typeof notifications.summaryReady === "boolean"
          ? notifications.summaryReady
          : defaultUserSettings.notifications.summaryReady,
      weeklyReports:
        typeof notifications.weeklyReports === "boolean"
          ? notifications.weeklyReports
          : defaultUserSettings.notifications.weeklyReports,
    },
  }
}

export function loadUserSettings(): UserSettings {
  if (typeof window === "undefined") return defaultUserSettings

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultUserSettings

    return sanitizeUserSettings(JSON.parse(raw))
  } catch {
    return defaultUserSettings
  }
}

export function saveUserSettings(settings: UserSettings): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function cloneUserSettings(settings: UserSettings): UserSettings {
  // Settings is a plain JSON object (strings/booleans), so JSON clone is safe here.
  return JSON.parse(JSON.stringify(settings)) as UserSettings
}

export function areUserSettingsEqual(a: UserSettings, b: UserSettings): boolean {
  return (
    a.outputLanguage === b.outputLanguage &&
    a.email === b.email &&
    a.timeZone === b.timeZone &&
    a.notifications.meetingReminders === b.notifications.meetingReminders &&
    a.notifications.summaryReady === b.notifications.summaryReady &&
    a.notifications.weeklyReports === b.notifications.weeklyReports
  )
}
