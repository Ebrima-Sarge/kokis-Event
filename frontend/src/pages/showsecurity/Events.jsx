import { ArrowUpRight } from "lucide-react";
import ShowSecurityGate from "@/components/showsecurity/ShowSecurityGate";
import DemoPageShell from "@/components/showsecurity/DemoPageShell";
import SwipeCarousel from "@/components/showsecurity/SwipeCarousel";
import { SHOWSECURITY_EVENTS } from "@/brands/showsecurity-content";

function EventCard({ event }) {
  return (
    <div className="h-full bg-brand-surface-alt border border-brand-border p-8 flex flex-col min-h-[280px]">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent">
        {event.category}
      </span>
      <h3 className="font-display font-bold uppercase tracking-tight text-2xl mt-4 leading-tight">
        {event.title}
      </h3>
      <p className="mt-3 text-sm text-brand-muted">{event.date}</p>
      <p className="mt-1 text-sm text-brand-subtle">{event.venue}</p>
      <button
        type="button"
        className="mt-auto pt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-text hover:text-brand-accent transition-colors"
      >
        Read More
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}

export default function ShowSecurityEvents() {
  return (
    <ShowSecurityGate>
      <DemoPageShell
        overline="// Upcoming Events"
        title="On The Calendar"
        description="Placeholder listings for concerts, festivals, and sport events our crews secure across Sweden."
      >
        <SwipeCarousel itemClassName="basis-full md:basis-1/2 lg:basis-1/3">
          {SHOWSECURITY_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </SwipeCarousel>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-subtle">
          // Placeholder events — swipe to browse
        </p>
      </DemoPageShell>
    </ShowSecurityGate>
  );
}
