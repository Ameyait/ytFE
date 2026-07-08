"use client";

import { useState, useEffect } from "react";
import { Text } from "..";
import {
  Eye,
  Heart,
  Calendar,
  Clock3,
  ExternalLink,
  X,
  Menu,
  LayoutGrid,
  List
} from "lucide-react";

export default function VideoSection({
  videos = [],
  total = 0,
  page,
  onFilterClick,
  onScrape,
  refreshVideos,
  loading,
  lastUpadte
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("list");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  console.log(lastUpadte, "lastUpadte")
  useEffect(() => {
    if (!isDisabled) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsDisabled(false);

          // Wait 3 seconds, then reload videos
          setTimeout(() => {
            refreshVideos?.();
          }, 3000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDisabled, refreshVideos]);

  const handleScrape = () => {
    if (onScrape) onScrape();
    setIsDisabled(true);
    setTimeLeft(5 * 60); // 5 minutes Cooldown
  };

  const formatLastUpdated = (dateString) => {
    if (!dateString) return "--";

    // Convert: "08 July 2026 at 01:48:31 PM IST"
    const formatted = dateString
      .replace(" at ", " ")
      .replace(" IST", "");

    const date = new Date(formatted);

    // If parsing fails, return original string
    if (isNaN(date)) return dateString;

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };
  return (
    <section className="pt-10">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrape}
              disabled={loading || isDisabled}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Scraping..."
                : isDisabled
                  ? `Wait ${minutes}:${seconds}`
                  : "Scrape Videos"}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={22} />}
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-2 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Clock3 size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Last Updated
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {formatLastUpdated(lastUpadte)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${view === "grid"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <LayoutGrid size={16} />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${view === "list"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <List size={16} />
              <span>List</span>
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Total Videos:
            <span className="ml-1 font-bold text-primary">{total}</span>
          </p>
        </div>
      </div>

      {/* View Configurations */}
      {view === "list" ? (
        <div className="mt-8 overflow-hidden rounded-3xl border bg-white">
          {videos.map((video) => (
            <div
              key={video.id}
              className="grid gap-6 border-b p-6 lg:grid-cols-[260px_1fr_160px]"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden rounded-3xl">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                  {video.duration}
                </span>
              </div>

              {/* Content Description */}
              <div>
                <Text variant="h3" as="h3">
                  {video.title}
                </Text>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={video.channel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition-all hover:bg-indigo-200 hover:text-indigo-900 hover:underline"
                  >
                    {video.channel}
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-6 xl:grid-cols-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Eye size={18} />
                      Views
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-amber-500">
                      {video.views?.toLocaleString()}
                    </h3>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Heart size={18} />
                      Likes
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-pink-500">
                      {video.likes?.toLocaleString()}
                    </h3>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={18} />
                      Published
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-red-500">
                      {video.published_at ? new Date(video.published_at).toLocaleDateString() : "--"}
                    </h3>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock3 size={18} />
                      Duration
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <h3 className="text-sm font-bold">{video.duration}</h3>
                      {video.duration_seconds && (
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                          {Math.floor(video.duration_seconds / 60)} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* External Target Link */}
              <div className="flex items-center justify-center lg:justify-end">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-indigo-300 px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  YouTube
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
            >
              <div>
                <div className="relative">
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="h-52 w-full object-cover"
                  />
                  <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                    {video.duration}
                  </span>
                </div>

                <div className="p-5">
                  <Text variant="h4" as="h4" className="line-clamp-2">
                    {video.title}
                  </Text>

                  {/* Badges: Channel and Optional Category */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {video.channel && (
                      <a
                        href={video.channel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition-all hover:bg-indigo-200 hover:text-indigo-900 hover:underline"
                      >
                        {video.channel}
                        <ExternalLink size={12} />
                      </a>
                    )}

                    {video.category && (
                      <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                        {video.category}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Eye size={16} />
                      {video.views?.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <Heart size={16} />
                      {video.likes?.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={16} />
                      {video.published_at ? new Date(video.published_at).toLocaleDateString() : "--"}
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock3 size={16} />
                      {video.duration}
                    </div>
                  </div>
                </div>
              </div>

              {/* Link Action Button */}
              <div className="p-5 pt-0">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  YouTube
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}