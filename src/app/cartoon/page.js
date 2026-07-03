'use client'
import { SectionHeader, VideoSection, FilterDrawer } from "../components";
import { useState } from "react";
import { useList } from "../hooks/useList";

export default function Cartoon() {
    const [openFilter, setOpenFilter] = useState(false);
    const { data } = useList("cartoon")
    return (
        <>
            <SectionHeader
                title="Cartoon Videos"
            />
            <VideoSection
                videos={data}
                onFilterClick={() => setOpenFilter(true)} />
            <FilterDrawer
                open={openFilter}
                onClose={() => setOpenFilter(false)}
            />
        </>
    )
}