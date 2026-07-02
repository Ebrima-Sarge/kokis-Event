import { motion } from "framer-motion";

export const WORD = ["K", "O", "K", "I", "\u2019", "S"];

export const WORDMARK_EASE = [0.22, 1, 0.36, 1];

export const letterContainer = {
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

export const letterVariant = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: WORDMARK_EASE },
  },
};

const SIZE_CLASSES = {
  hero: "text-6xl md:text-8xl lg:text-9xl",
  nav: "text-lg",
};

export default function KokisWordmark({
  size = "nav",
  animateLetters = false,
  className = "",
}) {
  const textClass = `font-display font-black uppercase tracking-tighter text-white leading-none ${SIZE_CLASSES[size]} ${className}`;

  if (animateLetters) {
    return (
      <motion.div
        className="flex items-center justify-center"
        variants={letterContainer}
        initial="initial"
        animate="animate"
        aria-label="KOKI'S"
      >
        {WORD.map((ch, i) => (
          <motion.span
            key={i}
            variants={letterVariant}
            aria-hidden="true"
            className={textClass}
          >
            {ch}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (size === "nav") {
    return (
      <span className={textClass} aria-label="KOKI'S">
        KOKI&rsquo;S
      </span>
    );
  }

  return (
    <span className={textClass} aria-label="KOKI'S">
      {WORD.join("")}
    </span>
  );
}
