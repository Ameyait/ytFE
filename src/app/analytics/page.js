"use client";

import React, { useMemo } from "react";
import { useAnalytics } from "../analyticslog/page";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Configuration constants
const CHART_COLORS = [
  "#2a78d6",
  "#1baf7a",
  "#eda100",
  "#008300",
  "#4a3aa7",
  "#e34948",
  "#e87ba4",
  "#eb6834",
];

// Utility: Safe text truncation
const truncateTitle = (title, maxLength = 30) => {
  if (!title) return "";
  return title.length > maxLength ? `${title.slice(0, maxLength)}…` : title;
};

// Utility: Formatter for X-Axis numbers (e.g., 200000 -> 200k)
const formatAxisNumber = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value;
};

// --- SUB COMPONENTS ---

function MetricCard({ label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

function FilterBar({
  minViews,
  setMinViews,
  minLikes,
  setMinLikes,
  onRefetch,
  isLoading,
}) {
  return (
    <div></div>
  );
}

export default function AnalyticsPage({ category }) {
  const {
    loading,
    toast,
    refetch,
    lastUpadte, // Preserved internal hook spelling mapping
    rankMetric,
    setRankMetric,
    minViews,
    setMinViews,
    minLikes,
    setMinLikes,
    totals,
    topVideos,
    byCategory,
    byGroupCategory,
    engagementRanked,
  } = useAnalytics(category);

  // Formatting chart metrics correctly to safeguard against undefined hook results
  const topVideosChartData = useMemo(() => {
    return (topVideos || []).map((video) => ({
      name: truncateTitle(video.title, 28),
      value: video[rankMetric] || 0,
    }));
  }, [topVideos, rankMetric]);

  const engagementChartData = useMemo(() => {
    return (engagementRanked || []).map((video) => ({
      name: truncateTitle(video.title, 28),
      value: video.engagementRate || 0,
    }));
  }, [engagementRanked]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 text-slate-800">
      {/* Header section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-5 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Video Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Performance tracking and category breakdown</p>
        </div>
        {lastUpadte && (
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            Last refreshed: {lastUpadte}
          </span>
        )}
      </header>

      {/* Global Toast Notification */}
      {toast?.open && (
        <div role="alert" className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
          {toast.message}
        </div>
      )}

      {/* Dynamic Filters layout */}
      <FilterBar
        minViews={minViews}
        setMinViews={setMinViews}
        minLikes={minLikes}
        setMinLikes={setMinLikes}
        onRefetch={refetch}
        isLoading={loading}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading comprehensive analytics…</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Executive Metrics Overview Grid */}
        

          {/* Performance Deep Dives Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top 10 Charts Segment */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Top 10 Performance</h2>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setRankMetric("views")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      rankMetric === "views" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Views
                  </button>
                  <button
                    onClick={() => setRankMetric("likes")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      rankMetric === "likes" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Likes
                  </button>
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topVideosChartData} layout="vertical" margin={{ left: 20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={formatAxisNumber} />
                    <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: "#475569" }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                    <Bar dataKey="value" fill="#2a78d6" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Engagement Velocity Metrics */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">
                Top Engagement Velocity <span className="text-xs font-normal normal-case text-slate-500">(Likes/1k Views)</span>
              </h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementChartData} layout="vertical" margin={{ left: 20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={formatAxisNumber} />
                    <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: "#475569" }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                    <Bar dataKey="value" fill="#1baf7a" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Categorical Distribution Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Views Distribution By Granular Category */}
            <section className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Views Aggregate By Category</h2>
              <div style={{ height: (byCategory?.length || 0) * 55 + 60 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byCategory || []} layout="vertical" margin={{ left: 20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={formatAxisNumber} />
                    <YAxis type="category" dataKey="category" width={110} tick={{ fontSize: 11, fill: "#475569" }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                    <Bar dataKey="views" fill="#2a78d6" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Content Segment Breakdown Donut */}
            <section className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Views Share By Content Group</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={byGroupCategory || []}
                      dataKey="views"
                      nameKey="group"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={3}
                    >
                      {(byGroupCategory || []).map((_, i) => (
                        <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}