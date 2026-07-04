import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function ServiceScrollShowcase({ services }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const nodes = sectionRefs.current.filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      {
        root: null,
        threshold: 0.45,
        rootMargin: "-12% 0px -38% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [services.length]);

  const scrollTo = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <div className="relative">
      <div className="mb-14 md:mb-20 border-t border-brand-border pt-10">
        <p className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-brand-text">
          Our
          <br />
          Services
        </p>
        <p className="mt-6 max-w-xl text-sm md:text-base text-brand-muted leading-relaxed">
          Scroll to explore each capability — the image updates to match the service in view.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_minmax(320px,44%)] xl:grid-cols-[1fr_480px] lg:gap-12 xl:gap-20">
        {/* Scroll panels */}
        <div>
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <section
                key={service.id}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                data-index={i}
                data-testid={`service-scroll-panel-${service.id}`}
                className="min-h-[72vh] lg:min-h-[88vh] flex flex-col justify-center py-12 lg:py-16 border-t border-brand-border first:border-t-0"
              >
                <div className="lg:hidden mb-8 aspect-[4/3] overflow-hidden bg-brand-surface-alt">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <span
                  className={`font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-500 ${
                    isActive ? "text-brand-accent" : "text-brand-subtle"
                  }`}
                >
                  0{i + 1}
                </span>

                <h2
                  className={`font-display font-black uppercase tracking-tighter text-3xl md:text-4xl lg:text-5xl mt-4 leading-[0.95] transition-opacity duration-500 ${
                    isActive ? "text-brand-text opacity-100" : "text-brand-text opacity-35"
                  }`}
                >
                  {service.title}
                </h2>

                <p
                  className={`mt-6 max-w-md text-sm md:text-base leading-relaxed transition-opacity duration-500 ${
                    isActive ? "text-brand-muted opacity-100" : "text-brand-muted opacity-50"
                  }`}
                >
                  {service.desc}
                </p>
              </section>
            );
          })}
        </div>

        {/* Sticky image — desktop */}
        <div className="hidden lg:block relative">
          <div className="sticky top-28 h-[calc(100vh-8rem)]">
            <div className="relative w-full h-full overflow-hidden bg-brand-surface-alt border border-brand-border">
              {services.map((service, i) => (
                <motion.img
                  key={service.id}
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: reduce ? 1 : active === i ? 1 : 1.06,
                  }}
                  transition={{ duration: reduce ? 0 : 0.65, ease: EASE }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
                  {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </p>
                <p className="font-display font-bold uppercase tracking-tight text-white text-lg mt-1">
                  {services[active]?.title}
                </p>
              </div>
            </div>

            {/* Progress rail */}
            <div
              className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2"
              aria-hidden="true"
            >
              {services.map((service, i) => (
                <button
                  key={service.id}
                  type="button"
                  aria-label={`Go to ${service.title}`}
                  onClick={() => scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    active === i
                      ? "h-10 w-1 bg-brand-accent"
                      : "h-2 w-1 bg-brand-border hover:bg-brand-subtle"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
