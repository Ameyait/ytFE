"use client"
import { SectionHeader, VideoSection, FilterDrawer } from "../components"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useList } from "../hooks/useList";

export default function rhymes() {
    const [openFilter, setOpenFilter] = useState(false);
    const { data, loading, loadScrap, toast, page,
        setPage,
        total,
        limit, } = useList("rhymes")
    console.log(data);
    const totalPages = Math.ceil(total / limit);
    return (
        <>
            <div>
                <SectionHeader
                    title="Trending rhymes videos"
                />
                <VideoSection
                    loading={loading}
                    onScrape={loadScrap}
                    videos={data}
                    onFilterClick={() => setOpenFilter(true)}
                />
                <FilterDrawer
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                />
                {toast.open && (
                    <div
                        className="fixed top-[15%] right-6 z-[9999] animate-toast-in"
                    >
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
            <div className="mt-1 mb-5 flex flex-wrap items-center justify-center gap-4">
                <div className="mt-10 flex items-center justify-center gap-3">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-heading transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft size={10} />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`flex h-8 w-8 items-center justify-center rounded-full border text-lg font-semibold transition-all duration-300  ${page === pageNumber
                                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                                        : "border-border bg-white text-heading hover:border-primary hover:text-primary hover:scale-105"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    {/* Next */}
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-heading transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight size={10} />
                    </button>

                </div>

            </div>

        </>
    )
}
