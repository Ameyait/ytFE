"use client";

import { Text } from "..";
import clsx from "clsx";

export default function SectionHeader({title}){
  return (
    <section>
        <div className="flex flex-col gap-1 justify-start py-8 border-b">
          <Text variant="h1" as="h1">{title}</Text>
          <Text variant="span" as="span" className="w-[90%] sm:w-[50%]">The most-watched, most-loved content right now. Tap Filters to slice by category, freshness and duration.</Text>
        </div>
    </section>

  );
}