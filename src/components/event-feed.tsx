"use client";

import { useState, useMemo, useEffect } from "react";
import type { Event } from "@/lib/types";
import EventCard from "./event-card";
import { Button } from "./ui/button";

type EventFeedProps = {
  events: Event[];
  categories: string[];
};

export default function EventFeed({ events, categories }: EventFeedProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setActiveCategory("All");
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All") {
      return events;
    }
    return events.filter((event) => event.category === activeCategory);
  }, [events, activeCategory]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
            <p className="text-lg font-medium text-muted-foreground">No events found</p>
            <p className="text-sm text-muted-foreground/80">Try selecting a different category or clearing your search.</p>
        </div>
      )}
    </div>
  );
}
