"use client";

import { Text } from "..";

export default function SectionHeader({ title, lastUpadte }) {
  
  // Parsing logic matching VideoSection
  const parseBackendDate = (dateString) => {
    if (!dateString) return null;

    const sanitized = String(dateString)
      .replace(" at ", " ")
      .replace(" IST", "");

    const date = new Date(sanitized);
    return isNaN(date.getTime()) ? null : date;
  };

  const formatDateTime = (dateObj) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(dateObj);
  };

  console.log(lastUpadte,"cvbnjvcvbhn");

  // 1. END DATE: Use backend time, fallback to 'now' while API loads
  const endDateObj = parseBackendDate(lastUpadte) || new Date();

  // 2. START DATE: Subtract 3 days (72 hours)
  const startDateObj = new Date(endDateObj.getTime() - 3 * 24 * 60 * 60 * 1000);
  

  return (
    <section>
      <div className="flex flex-col gap-1 justify-start border-b py-8">
        <Text variant="h1" as="h1">
          {title}
        </Text>
        <Text variant="span" as="span" className="w-[90%] text-slate-600 sm:w-[50%]">
          Videos scraped over the last 3 days (from {formatDateTime(startDateObj)} to {formatDateTime(endDateObj)}).
        </Text>
      </div>
      
    </section>
  );
}