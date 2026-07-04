import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function HorizontalScrollStrip({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-brand-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-brand-bg to-transparent" />

      <div className="flex gap-px overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none">
        {children}
      </div>

      <motion.p
        {...fadeUp(0.15)}
        className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-brand-subtle md:hidden"
      >
        // Swipe to browse
      </motion.p>
    </div>
  );
}
