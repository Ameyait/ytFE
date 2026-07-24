"use client";

import { SectionHeader, VideoSection, FilterDrawer } from "../components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useList } from "../hooks/useList";

export default function Moral() {
  const [openFilter, setOpenFilter] = useState(false);

  const {
    data,
    loading,
    loadScrap,
    toast,
    page,
    setPage,
    total,
    totalPages,
    hasNext,
    displayVideos,
    hasPrevious,
    lastUpadte,
  } = useList("moral");

  const getPagination = () => {
    const pages = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    let start = Math.max(page - 1, 2);
    let end = Math.min(page + 1, totalPages - 1);
    if (page <= 3) {
      start = 2;
      end = 4;
    }

    if (page >= totalPages - 2) {
      start = totalPages - 3;
      end = totalPages - 1;
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };
  return (
    <>
      <div>
        <SectionHeader title="Trending Moral Videos" lastUpadte={lastUpadte} />
        <VideoSection
          loading={loading}
          lastUpadte={lastUpadte}
          onScrape={loadScrap}
          refreshVideos={displayVideos}
          videos={data}
          total={total}
          page={page}
          onFilterClick={() => setOpenFilter(true)}
        />
        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
        />
        {toast.open && (
          <div className="fixed top-[15%] right-6 z-[9999] animate-toast-in">
            <div className="rounded-xl border border-green-200 bg-white px-5 py-4 shadow-xl">
              <h3 className="font-semibold text-green-700">
                ✅ Scraping Started
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Videos will be updated in approximately 5 minutes.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}

      <div className="my-10 flex justify-center">
        <div className="flex items-center gap-2">
          {/* Previous */}

          <button
            disabled={!hasPrevious}
            onClick={() => setPage((prev) => prev - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Numbers */}

          {getPagination().map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center text-gray-500"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all
        ${page === item
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                    : "border-border bg-white text-heading hover:border-primary hover:text-primary"
                  }`}
              >
                {item}
              </button>
            );
          })}

          {/* Next */}

          <button
            disabled={!hasNext}
            onClick={() => setPage((prev) => prev + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
}