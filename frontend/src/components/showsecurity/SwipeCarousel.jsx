import { useCallback, useEffect, useState, Children } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function SwipeCarousel({
  children,
  itemClassName = "basis-full sm:basis-1/2 lg:basis-1/3",
  showDots = true,
  showArrows = true,
  className,
}) {
  const [api, setApi] = useState(null);
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const items = Children.toArray(children);

  return (
    <div className={cn("relative", className)}>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: false, containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((child, i) => (
            <CarouselItem key={i} className={cn("pl-4", itemClassName)}>
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {(showArrows || showDots) && count > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          {showDots && (
            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    selected === i ? "w-6 bg-brand-accent" : "w-2 bg-brand-border"
                  )}
                />
              ))}
            </div>
          )}

          {showArrows && (
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => api?.scrollPrev()}
                disabled={selected === 0}
                className="grid place-items-center w-10 h-10 rounded-full border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => api?.scrollNext()}
                disabled={selected >= count - 1}
                className="grid place-items-center w-10 h-10 rounded-full border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
