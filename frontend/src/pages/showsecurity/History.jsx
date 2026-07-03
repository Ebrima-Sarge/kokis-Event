import { motion } from "framer-motion";
import ShowSecurityGate from "@/components/showsecurity/ShowSecurityGate";
import DemoPageShell from "@/components/showsecurity/DemoPageShell";
import SwipeCarousel from "@/components/showsecurity/SwipeCarousel";
import {
  SHOWSECURITY_HISTORY_STATS,
  SHOWSECURITY_HISTORY_MILESTONES,
} from "@/brands/showsecurity-content";

function MilestoneCard({ milestone }) {
  return (
    <div className="h-full bg-brand-surface-alt border border-brand-border p-8 min-h-[240px]">
      <p className="font-display font-black text-4xl text-brand-accent tracking-tighter">
        {milestone.year}
      </p>
      <h3 className="font-display font-bold uppercase tracking-tight text-xl mt-4">
        {milestone.title}
      </h3>
      <p className="mt-4 text-sm text-brand-muted leading-relaxed">{milestone.desc}</p>
    </div>
  );
}

export default function ShowSecurityHistory() {
  return (
    <ShowSecurityGate>
      <DemoPageShell
        overline="// Achievements & History"
        title="Built On Experience"
        description="Placeholder stats and timeline milestones reflecting Show Security's track record in event safety."
      >
        <section className="border-y border-brand-border bg-brand-surface mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-brand-border">
            {SHOWSECURITY_HISTORY_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="px-6 py-8"
              >
                <div className="font-display font-black text-2xl md:text-4xl tracking-tighter text-brand-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-brand-subtle">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-text mb-8">// Timeline</p>
          <SwipeCarousel itemClassName="basis-full md:basis-1/2">
            {SHOWSECURITY_HISTORY_MILESTONES.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </SwipeCarousel>
        </div>
      </DemoPageShell>
    </ShowSecurityGate>
  );
}
