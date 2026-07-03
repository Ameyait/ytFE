"use client";

import { X } from "lucide-react";
import { Text } from "..";
export default function FilterDrawer({ open, onClose }) {
    return (
        <>
            {/* Overlay */}

            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
            />

            {/* Drawer */}

            <aside
                className={`fixed right-0 top-0 z-50 h-screen w-full bg-white shadow-xl transition-transform duration-300
        sm:w-[420px] lg:w-[450px]
        ${open
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b p-6">

                    <h2 className="text-3xl font-bold">
                        Filters
                    </h2>

                    <button onClick={onClose}>
                        <X />
                    </button>

                </div>

                {/* Body */}

                <div className="h-[calc(100vh-90px)] overflow-y-auto p-6">
                    <div className="mt-3">
                        <Text variant="h4" as="h4">
                            Category
                        </Text>
                        {[
                            "Birds & Animals",
                            "Animations & Cartoons",
                            "Educational",
                            "Stories",
                            "Other",
                        ].map((item) => (
                            <label
                                key={item}
                                className="mb-4 flex items-center gap-3 text-[13px]"
                            >
                                <input type="checkbox" />

                                {item}
                            </label>
                        ))}

                    </div>

                    {/* Duration */}

                    <div className="mt-4">

                       <Text variant="h4" as="h4">
                            Duration
                        </Text>

                        <div className="flex flex-wrap gap-3">

                            {["Any", "Short", "Medium", "Long"].map((item) => (
                                <button
                                    key={item}
                                    className="rounded-full border px-3 py-1 text-xs"
                                >
                                    {item}
                                </button>
                            ))}

                        </div>

                    </div>

                    {/* Uploaded */}

                    <div className="mt-4">

                        <Text variant="h4" as="h4">
                            Uploaded
                        </Text>

                        <div className="flex flex-wrap gap-3">

                            {["Today", "Week", "Month", "All Time"].map((item) => (
                                <button
                                    key={item}
                                    className="rounded-full border px-3 py-1 text-xs"
                                >
                                    {item}
                                </button>
                            ))}

                        </div>

                    </div>

                    {/* Sort */}

                    <div className="mt-4">

                       <Text variant="h4" as="h4">
                            Sort By
                        </Text>

                        <select className="w-full text-sm rounded-full border p-3 mb-5">
                            <option>Most viewed</option>
                            <option>Most liked</option>
                            <option>Newest</option>
                        </select>
                        <button className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-semibold text-white">
                            submit
                        </button>
                    </div>

                </div>
            </aside>
        </>
    );
}