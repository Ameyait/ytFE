"use client";
import { useState, useEffect } from "react";
import { Text } from "..";
import {
  Eye,
  Heart,
  Calendar,
  Clock3,
  ExternalLink,
  Filter,
  X,
  Menu
} from "lucide-react";
import { LayoutGrid, List } from "lucide-react";
export default function VideoSection({
  videos = [],
  total,
  page,
  onFilterClick,
  onScrape,
  refreshVideos,
  loading,
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("list");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
  if (!isDisabled) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);

        // enable button
        setIsDisabled(false);

        // wait 3 seconds, then reload videos
        setTimeout(() => {
          refreshVideos();
        }, 3000);

        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [isDisabled, refreshVideos]);
  const handleScrape = () => {
    onScrape();
    setIsDisabled(true);
    setTimeLeft(5 * 60); // 5 minutes
  };
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  return (
    <section className="pt-10">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4 flex-wrap">

          {/* <button
            onClick={onFilterClick}
            className="flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-medium hover:bg-indigo-50"
          >
            <Filter size={16} />
            Filters
          </button> */}
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
              className="flex h-11 w-11 items-center justify-center lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={22} />}
            </button>

          </div>

          <p className="text-sm text-gray-600">
            Total Videos:
            <span className="ml-1 font-bold text-primary">
              {total}
            </span>
          </p>

        </div>
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
      </div>

      {/* List */}
      {view === "list" ? (
        <div className="mt-8 overflow-hidden rounded-3xl border bg-white">

          {videos.map((video) => (

            <div
              key={video.id}
              className="grid gap-6 border-b p-6 lg:grid-cols-[260px_1fr_160px]"
            >

              {/* Thumbnail */}

              <div className="relative overflow-hidden rounded-3xl">

                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="h-44 w-full object-cover"
                />

                <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                  {video.duration}
                </span>

              </div>

              {/* Content */}
              <div>
                <Text variant="h3" as="h3">
                  {video.title}
                </Text>

                <div className="mt-4 flex flex-wrap gap-3">

                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {video.channel}
                  </span>



                </div>

                <div className="mt-6 grid grid-cols-2 gap-6 xl:grid-cols-4">

                  {/* Views */}

                  <div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Eye size={18} />
                      Views
                    </div>

                    <h3 className="mt-2 text-sm font-bold text-amber-500">
                      {video.views.toLocaleString()}
                    </h3>

                  </div>

                  {/* Likes */}

                  <div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Heart size={18} />
                      Likes
                    </div>

                    <h3 className="mt-2 text-sm font-bold text-pink-500">
                      {video.likes.toLocaleString()}
                    </h3>

                  </div>

                  {/* Published */}

                  <div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={18} />
                      Published
                    </div>

                    <h3 className="mt-2  text-sm font-bold text-red-500">
                      {new Date(video.published_at).toLocaleDateString()}
                    </h3>

                  </div>

                  {/* Duration */}

                  <div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock3 size={18} />
                      Duration
                    </div>

                    <div className="mt-2 flex items-center gap-3">

                      <h3 className=" text-sm font-bold">
                        {video.duration}
                      </h3>

                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {Math.floor(video.duration_seconds / 60)} min
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* Button */}

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
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
            >
              <img
                src={video.thumbnail_url}
                alt={video.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <Text variant="h4" as="h4" className="line-clamp-2">
                  {video.title}
                </Text>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {video.channel}
                  </span>

                  <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                    {video.category}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    {video.views.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <Heart size={16} />
                    {video.likes.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(video.published_at).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {video.duration}
                  </div>

                </div>

                <div>
                  <button
                    href={video.url}
                    target="_blank"
                    className="mt-6 flex   items-center justify-center gap-2 rounded-lg bg-primary py-1 px-3 cursor-pointer text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    YouTube
                    <ExternalLink size={16} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}