"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type ActionItemObj = {
  text?: string;
  context?: string | null;
  priority?: string | null;
};

type SummaryPayload = {
  filename?: string;
  transcript?: string;
  summary?: string;
  keywords?: string[] | string;
  action_items?: ActionItemObj[] | string[] | string;
};

export default function SummaryPage() {
  const [data, setData] = useState<SummaryPayload | null>(null);
  const [expanded, setExpanded] = useState(false);

  const getPriorityBadgeClass = (priority: string | null | undefined) => {
    if (!priority) return "bg-gray-100 text-gray-600";
    const p = priority.toLowerCase();
    if (p === "high") return "bg-red-100 text-red-700";
    if (p === "medium") return "bg-yellow-100 text-yellow-700";
    if (p === "low") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-600";
  };

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const raw = window.sessionStorage.getItem("meetnote-last-summary");
      if (!raw) return;
      const parsed = JSON.parse(raw) as SummaryPayload;
      setData(parsed);
      setExpanded(true);
    } catch (error) {
      console.error("Failed to load summary from sessionStorage", error);
    }
  }, []);

  const keywords: string[] = (() => {
    if (!data || data.keywords == null) return [];
    if (Array.isArray(data.keywords)) return data.keywords.map(String);
    if (typeof data.keywords === "string") {
      return data.keywords
        .split(/[\n,]+/)
        .map((k) => k.trim())
        .filter(Boolean);
    }
    return [];
  })();

  type NormalizedActionItem = {
    text: string;
    priority?: string | null;
  };

  const actionItems: NormalizedActionItem[] = (() => {
    if (!data || data.action_items == null) return [];

    if (Array.isArray(data.action_items)) {
      return data.action_items
        .map((item) => {
          if (typeof item === "string") {
            const text = item.trim();
            return text ? { text } : null;
          }
          if (item && typeof item === "object") {
            const text = (item as ActionItemObj).text?.toString().trim();
            if (!text) return null;
            return {
              text,
              priority: (item as ActionItemObj).priority ?? null,
            };
          }
          return null;
        })
        .filter((i): i is NormalizedActionItem => !!i);
    }

    if (typeof data.action_items === "string") {
      return data.action_items
        .split(/[\n\-•]+/)
        .map((k) => k.trim())
        .filter(Boolean)
        .map((text) => ({ text }));
    }

    return [];
  })();

  return (
    <main className="min-h-screen w-full bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Meeting Summary</h1>

        {!data && (
          <Card className="shadow-lg border-none">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                No summary available yet
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload or record a meeting from the extension page to generate a summary.
              </p>
              <Link href="/extension">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Go to Extension
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {data && (
          <Card className="shadow-lg border-none">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Latest processed meeting
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <button
                type="button"
                className="w-full text-left p-4 rounded-xl border shadow-sm hover:bg-gray-50 transition flex items-center justify-between bg-white"
                onClick={() => setExpanded((prev) => !prev)}
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {data.filename || "Untitled meeting"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Transcript, keywords & action items
                  </p>
                </div>
                {expanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {expanded && (
                <div className="space-y-6">
                  <section>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Summary
                    </h3>
                    <div className="min-h-[80px] p-4 border rounded-xl bg-white text-gray-800 shadow-inner whitespace-pre-line text-sm">
                      {data.summary || "No summary was returned for this meeting."}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Transcript
                    </h3>
                    <div className="min-h-[160px] max-h-80 p-4 border rounded-xl bg-white text-gray-800 shadow-inner whitespace-pre-line overflow-y-auto text-sm">
                      {data.transcript || "No transcript was returned for this meeting."}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Keywords
                    </h3>
                    {keywords.length ? (
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((kw, idx) => (
                          <span
                            key={`${kw}-${idx}`}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">
                        No keywords were returned for this meeting.
                      </p>
                    )}
                  </section>

                  <section>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Action items
                    </h3>
                    {actionItems.length ? (
                      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-800">
                        {actionItems.map((item, idx) => (
                          <li
                            key={`${item.text}-${idx}`}
                            className="flex items-start justify-between gap-3"
                          >
                            <span className="flex-1">{item.text}</span>
                            {item.priority && (
                              <span
                                className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${getPriorityBadgeClass(
                                  item.priority,
                                )}`}
                              >
                                {item.priority.charAt(0).toUpperCase() +
                                  item.priority.slice(1)}
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-xs text-gray-500">
                        No action items were returned for this meeting.
                      </p>
                    )}
                  </section>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
