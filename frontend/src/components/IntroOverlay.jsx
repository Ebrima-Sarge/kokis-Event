import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import KokisWordmark, { WORDMARK_EASE } from "@/components/KokisWordmark";

const TAGLINE = "Staging & Event Production";
const TRAVEL_DURATION = 0.7;

export default function IntroOverlay({ onDone, logoTargetRef }) {
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
        className="absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "travel" ? 0 : 1 }}
        transition={{ duration: TRAVEL_DURATION, ease: WORDMARK_EASE }}
      />

      {phase === "build" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div ref={wordmarkRef}>
            {reduce ? (
              <KokisWordmark size="hero" />
            ) : (
              <KokisWordmark size="hero" animateLetters />
            )}
          </div>

          {!reduce && (
            <>
              <motion.div
                aria-hidden="true"
                className="mt-6 h-px bg-white/70 origin-center"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 0.6, delay: 1.05, ease: WORDMARK_EASE },
                }}
                style={{ width: "min(72vw, 520px)" }}
              />

              <motion.p
                className="mt-5 text-center text-[11px] md:text-sm uppercase tracking-[0.35em] text-zinc-400"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 1.2, ease: WORDMARK_EASE },
                }}
              >
                {TAGLINE}
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
          <KokisWordmark size="hero" />
        </motion.div>
      )}
    </div>
  );
}
