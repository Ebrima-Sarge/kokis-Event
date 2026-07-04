import { motion } from "framer-motion";
import { fadeUp, EASE } from "@/lib/motion";

export default function AnimatedSectionHeader({
  overline,
  title,
  description,
  className = "",
  titleClassName = "text-4xl md:text-6xl",
}) {
  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <div className={className}>
      <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-brand-text">
        {overline}
      </motion.p>

      <div className="mt-3">
        {titleLines.map((line, i) => (
          <motion.h2
            key={line}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08 + i * 0.1, ease: EASE }}
            className={`font-display font-black uppercase tracking-tighter leading-[0.9] ${titleClassName} ${
              i > 0 ? "mt-1" : ""
            }`}
          >
            {line}
          </motion.h2>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        className="mt-5 h-px w-16 origin-left bg-brand-accent"
        aria-hidden="true"
      />

      {description && (
        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 max-w-xl text-sm md:text-base text-brand-muted leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
