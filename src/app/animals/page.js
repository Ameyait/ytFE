"use client";

import { useState } from "react";

import {
  SectionHeader,
  VideoSection,
  FilterDrawer,
} from "../components";

import { useList } from "../hooks/useList";

export default function Animals() {
  const [openFilter, setOpenFilter] = useState(false);

  const {
    data,
    loading,
    loadScrap,
    toast,
    displayVideos,
    lastUpadte,
  } = useList("animals");

  return (
    <>
      <div>
        <SectionHeader title="Trending Animal Videos" />

        <VideoSection
          loading={loading}
          lastUpadte={lastUpadte}
          onScrape={loadScrap}
          refreshVideos={displayVideos}
          videos={data}
          total={data.length}
          onFilterClick={() => setOpenFilter(true)}
        />

        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
        />

        {toast.open && (
          <div className="fixed right-6 top-[15%] z-[9999] animate-toast-in">
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
    </>
  );
}