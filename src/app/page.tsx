import Header from "@/components/header";
import EventFeed from "@/components/event-feed";
import AiRecommendations from "@/components/ai-recommendations";
import { getEvents } from "@/lib/events";

export default function Home() {
  const events = getEvents();
  const categories = ["All", ...new Set(events.map((event) => event.category))];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <h1 className="mb-6 text-3xl font-bold font-headline tracking-tight md:text-4xl">
                Upcoming Events in <span className="text-primary">Halle</span>
              </h1>
              <EventFeed events={events} categories={categories} />
            </div>
            <aside className="w-full">
              <AiRecommendations />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
