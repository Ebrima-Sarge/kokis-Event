import { useReducedMotion } from "framer-motion";

export default function MarqueeStrip({ items, renderItem, speed = 40 }) {
  const reduce = useReducedMotion();
  const doubled = [...items, ...items];

  if (reduce) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-brand-border border border-brand-border">
        {items.map((item) => (
          <div key={item.id} className="bg-brand-surface-alt px-6 py-8 flex items-center justify-center">
            {renderItem(item)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-y border-brand-border bg-brand-surface">
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="shrink-0 px-10 py-8 border-r border-brand-border flex items-center justify-center min-w-[180px]"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
