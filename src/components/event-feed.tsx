"use client";

import { useState, useMemo, useEffect } from "react";
import type { Event } from "@/lib/types";
import EventCard from "./event-card";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";

type EventFeedProps = {
  events: Event[];
  categories: string[];
};

export default function EventFeed({ events, categories }: EventFeedProps) {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [price, setPrice] = useState(50);
  const [duration, setDuration] = useState(12);

  useEffect(() => {
    setActiveCategory("Alle");
  }, [events]);

  const filteredEvents = useMemo(() => {
    let filtered = events;
    if (activeCategory !== "Alle") {
      filtered = filtered.filter((event) => event.category === activeCategory);
    }
    filtered = filtered.filter((event) => event.price <= price);
    filtered = filtered.filter((event) => event.duration <= duration);
    return filtered;
  }, [events, activeCategory, price, duration]);

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

      <Accordion type="single" collapsible className="w-full mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Weitere Filter
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="price-slider">Preis</Label>
                  <span className="text-sm font-medium">{price > 0 ? `bis zu ${price} €` : 'Kostenlos'}</span>
                </div>
                <Slider
                  id="price-slider"
                  max={50}
                  step={5}
                  value={[price]}
                  onValueChange={(value) => setPrice(value[0])}
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="duration-slider">Dauer</Label>
                  <span className="text-sm font-medium">bis zu {duration} h</span>
                </div>
                <Slider
                  id="duration-slider"
                  max={12}
                  step={1}
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
            <p className="text-lg font-medium text-muted-foreground">Keine Events gefunden</p>
            <p className="text-sm text-muted-foreground/80">Versuche eine andere Kategorie oder ändere deine Filter.</p>
        </div>
      )}
    </div>
  );
}
