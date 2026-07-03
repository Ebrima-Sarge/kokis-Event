import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BrandWordmark, { WORDMARK_EASE } from "@/components/BrandWordmark";
import { useBrand } from "@/hooks/useBrand";

const TRAVEL_DURATION = 0.7;

export default function IntroOverlay({ onDone, logoTargetRef }) {
  const { brand } = useBrand();
  const reduce = useReducedMotion();
  const wordmarkRef = useRef(null);
  const [phase, setPhase] = useState("build");
  const [travel, setTravel] = useState(null);

  useEffect(() => {
    const hold = reduce ? 900 : 2200;
    const t = setTimeout(() => {
      if (reduce) {
        onDone?.();
        return;
      }

      const source = wordmarkRef.current?.getBoundingClientRect();
      const target = logoTargetRef?.current?.getBoundingClientRect();

      if (source && target) {
        setTravel({
          left: source.left + source.width / 2,
          top: source.top + source.height / 2,
          scale: target.height / source.height,
          toLeft: target.left + target.width / 2,
          toTop: target.top + target.height / 2,
        });
        setPhase("travel");
      } else {
        onDone?.();
      }
    }, hold);

    return () => clearTimeout(t);
  }, [reduce, logoTargetRef, onDone]);

  const handleTravelComplete = () => {
    if (phase === "travel") onDone?.();
  };

  return (
    <div
      data-testid="intro-overlay"
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
    >
      <motion.div
        className="absolute inset-0 bg-brand-bg"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "travel" ? 0 : 1 }}
        transition={{ duration: TRAVEL_DURATION, ease: WORDMARK_EASE }}
      />

      {phase === "build" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div ref={wordmarkRef}>
            {reduce ? (
              <BrandWordmark size="hero" />
            ) : (
              <BrandWordmark size="hero" animateLetters />
            )}
          </div>

          {!reduce && (
            <>
              <motion.div
                aria-hidden="true"
                className="mt-6 h-px bg-brand-accent/70 origin-center"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 0.6, delay: 1.05, ease: WORDMARK_EASE },
                }}
                style={{ width: "min(72vw, 520px)" }}
              />

              <motion.p
                className="mt-5 text-center text-[11px] md:text-sm uppercase tracking-[0.35em] text-brand-muted"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 1.2, ease: WORDMARK_EASE },
                }}
              >
                {brand.tagline}
              </motion.p>
            </>
          )}
        </div>
      )}

      {phase === "travel" && travel && (
        <motion.div
          className="fixed z-[101]"
          style={{
            left: travel.left,
            top: travel.top,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ scale: 1 }}
          animate={{
            left: travel.toLeft,
            top: travel.toTop,
            scale: travel.scale,
          }}
          transition={{ duration: TRAVEL_DURATION, ease: WORDMARK_EASE }}
          onAnimationComplete={handleTravelComplete}
        >
          <BrandWordmark size="hero" />
        </motion.div>
      )}
    </div>
  );
}
