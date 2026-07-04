import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { useBrand } from "@/hooks/useBrand";
import { useBrandLink } from "@/hooks/useBrandLink";
import { fadeUp } from "@/lib/motion";
import {
  SHOWSECURITY_SERVICES,
  SHOWSECURITY_EVENTS,
  SHOWSECURITY_PARTNERS,
  SHOWSECURITY_HISTORY_STATS,
  SHOWSECURITY_VALUE_PILLARS,
  SHOWSECURITY_LANDING_SECTIONS,
} from "@/brands/showsecurity-content";
import {
  SHOWSECURITY_SERVICES_PATH,
  SHOWSECURITY_EVENTS_PATH,
  SHOWSECURITY_PARTNERS_PATH,
  SHOWSECURITY_WORK_WITH_US_PATH,
} from "@/constants/showsecurity-routes";
import AnimatedSectionHeader from "@/components/showsecurity/landing/AnimatedSectionHeader";
import HorizontalScrollStrip from "@/components/showsecurity/landing/HorizontalScrollStrip";
import MarqueeStrip from "@/components/showsecurity/landing/MarqueeStrip";
import StaggerGrid, { StaggerItem } from "@/components/showsecurity/landing/StaggerGrid";

function StatsStrip() {
  return (
    <section data-testid="ss-stats-section" className="border-y border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border">
        {SHOWSECURITY_HISTORY_STATS.map((item, i) => (
          <motion.div key={item.label} {...fadeUp(i * 0.08)} className="px-6 py-8">
            <div className="font-display font-black text-2xl md:text-4xl lg:text-5xl tracking-tighter text-brand-text">
              {item.value}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-brand-subtle">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ValuePillars() {
  return (
    <section data-testid="ss-pillars-section" className="bp-grid">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <AnimatedSectionHeader
          overline="// Why Show Security"
          title={["We Help You", "Get It Right"]}
          description="From the planning desk to show day — cost-effective analyses, clear communication, and deep event experience."
        />

        <StaggerGrid className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border border border-brand-border">
          {SHOWSECURITY_VALUE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem
                key={pillar.id}
                className="group bg-brand-surface-alt hover:bg-brand-surface-hover transition-colors p-8 md:p-10"
              >
                <Icon className="text-brand-accent" size={28} strokeWidth={1.5} />
                <h3 className="font-display font-bold uppercase tracking-tight text-xl md:text-2xl mt-6">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">{pillar.desc}</p>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const servicesLink = useBrandLink(SHOWSECURITY_SERVICES_PATH);
  const copy = SHOWSECURITY_LANDING_SECTIONS.services;

  return (
    <section id="services" data-testid="ss-services-section" className="bg-brand-surface border-y border-brand-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <AnimatedSectionHeader
            overline={copy.overline}
            title={copy.title}
            description={copy.description}
          />
          <motion.div {...fadeUp(0.2)}>
            <Link
              to={servicesLink}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-text hover:text-brand-accent transition-colors"
            >
              {copy.linkLabel}
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        <HorizontalScrollStrip className="mt-14">
          {SHOWSECURITY_SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                {...fadeUp(i * 0.06)}
                className="snap-start shrink-0 w-[280px] md:w-[320px] bg-brand-surface-alt border border-brand-border group hover:border-brand-accent/40 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <Icon className="text-brand-accent" size={22} strokeWidth={1.5} />
                    <span className="font-mono text-xs text-brand-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-lg mt-4">{service.title}</h3>
                  <p className="mt-2 text-sm text-brand-muted leading-relaxed line-clamp-3">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </HorizontalScrollStrip>
      </div>
    </section>
  );
}

function EventsPreview() {
  const eventsLink = useBrandLink(SHOWSECURITY_EVENTS_PATH);
  const copy = SHOWSECURITY_LANDING_SECTIONS.events;

  return (
    <section id="work" data-testid="ss-events-section">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <AnimatedSectionHeader overline={copy.overline} title={copy.title} description={copy.description} />
          <motion.div {...fadeUp(0.2)}>
            <Link
              to={eventsLink}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-text hover:text-brand-accent transition-colors"
            >
              {copy.linkLabel}
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        <HorizontalScrollStrip className="mt-14">
          {SHOWSECURITY_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              {...fadeUp(i * 0.06)}
              className="snap-start shrink-0 w-[300px] md:w-[340px] bg-brand-surface-alt border border-brand-border p-8 flex flex-col min-h-[260px] hover:border-brand-accent/40 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent">
                {event.category}
              </span>
              <h3 className="font-display font-bold uppercase tracking-tight text-xl mt-4 leading-tight">
                {event.title}
              </h3>
              <p className="mt-3 text-sm text-brand-muted">{event.date}</p>
              <p className="mt-1 text-sm text-brand-subtle">{event.venue}</p>
              <span className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle">
                // Placeholder event
              </span>
            </motion.div>
          ))}
        </HorizontalScrollStrip>
      </div>
    </section>
  );
}

function ExpertiseBlock() {
  const copy = SHOWSECURITY_LANDING_SECTIONS.expertise;

  return (
    <section id="about" data-testid="ss-expertise-section" className="bg-brand-surface border-y border-brand-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <AnimatedSectionHeader overline={copy.overline} title={copy.title} description={copy.description} />

          <motion.div {...fadeUp(0.35)} className="mt-8 flex gap-px bg-brand-border border border-brand-border">
            {copy.badges.map(([a, b]) => (
              <div key={a} className="bg-brand-surface-alt px-5 py-4 flex-1">
                <div className="font-display font-black text-lg md:text-xl text-brand-text">{a}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle mt-1">{b}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="border border-brand-border overflow-hidden">
            <img
              src={copy.image}
              alt="Show Security event operations"
              loading="lazy"
              className="w-full h-[380px] md:h-[440px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-brand-accent text-brand-accent-fg px-5 py-4">
            <span className="font-display font-black uppercase tracking-tight text-sm leading-tight">
              Safety
              <br />
              First, Always
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PartnersMarquee() {
  const partnersLink = useBrandLink(SHOWSECURITY_PARTNERS_PATH);
  const copy = SHOWSECURITY_LANDING_SECTIONS.partners;

  return (
    <section data-testid="ss-partners-section">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 md:pt-32 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <AnimatedSectionHeader overline={copy.overline} title={copy.title} description={copy.description} />
          <motion.div {...fadeUp(0.2)}>
            <Link
              to={partnersLink}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-text hover:text-brand-accent transition-colors"
            >
              {copy.linkLabel}
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>

      <MarqueeStrip
        items={SHOWSECURITY_PARTNERS}
        renderItem={(partner) => (
          <div className="text-center">
            <div className="font-display font-black text-2xl md:text-3xl tracking-tighter text-brand-text">
              {partner.initials}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-brand-subtle">{partner.name}</div>
          </div>
        )}
      />

      <p className="mx-auto max-w-[1400px] px-6 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle">
        // Placeholder partners
      </p>
    </section>
  );
}

function WorkWithUsBand() {
  const workLink = useBrandLink(SHOWSECURITY_WORK_WITH_US_PATH);
  const copy = SHOWSECURITY_LANDING_SECTIONS.cta;

  return (
    <section data-testid="ss-cta-section" className="bg-brand-accent text-brand-accent-fg">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <motion.p
            {...fadeUp()}
            className="text-xs uppercase tracking-[0.3em] text-brand-accent-fg/80"
          >
            {copy.overline}
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-display font-black uppercase tracking-tighter text-3xl md:text-5xl mt-3 leading-[0.9]"
          >
            {copy.title}
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="mt-4 max-w-lg text-sm text-brand-accent-fg/85 leading-relaxed">
            {copy.description}
          </motion.p>
        </div>
        <motion.div {...fadeUp(0.25)}>
          <Link
            to={workLink}
            data-testid="ss-work-with-us-btn"
            className="inline-flex bg-brand-bg text-brand-text text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-surface transition-colors"
          >
            {copy.linkLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { brand } = useBrand();
  const copy = SHOWSECURITY_LANDING_SECTIONS.contact;
  const [form, setForm] = useState({ name: "", email: "", type: copy.eventTypes[0], details: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    setSubmitted(true);
    toast.success("Inquiry received — we'll be in touch.", {
      description: "Prototype: data is not stored yet.",
    });
  };

  return (
    <section id="quote" data-testid="ss-contact-section" className="bg-brand-surface border-t border-brand-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <AnimatedSectionHeader
            overline={copy.overline}
            title={copy.title}
            description={copy.description}
          />
          <motion.p {...fadeUp(0.3)} className="mt-6 text-sm text-brand-subtle">
            {brand.contactEmail}
          </motion.p>
        </div>

        <motion.form
          {...fadeUp(0.2)}
          onSubmit={onSubmit}
          data-testid="ss-contact-form"
          className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border border border-brand-border"
        >
          <div className="bg-brand-bg p-6">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">Name</label>
            <input
              value={form.name}
              onChange={onChange("name")}
              placeholder="Jane Doe"
              className="mt-2 w-full bg-transparent border-b border-brand-border focus:border-brand-accent outline-none py-2 text-brand-text placeholder:text-brand-subtle"
            />
          </div>
          <div className="bg-brand-bg p-6">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={onChange("email")}
              placeholder="jane@venue.se"
              className="mt-2 w-full bg-transparent border-b border-brand-border focus:border-brand-accent outline-none py-2 text-brand-text placeholder:text-brand-subtle"
            />
          </div>
          <div className="bg-brand-bg p-6 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">Event Type</label>
            <select
              value={form.type}
              onChange={onChange("type")}
              className="mt-2 w-full bg-brand-bg border-b border-brand-border focus:border-brand-accent outline-none py-2 text-brand-text"
            >
              {copy.eventTypes.map((o) => (
                <option key={o} className="bg-brand-bg">
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-brand-bg p-6 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">Event Details</label>
            <textarea
              value={form.details}
              onChange={onChange("details")}
              rows={4}
              placeholder={copy.detailsPlaceholder}
              className="mt-2 w-full bg-transparent border-b border-brand-border focus:border-brand-accent outline-none py-2 text-brand-text placeholder:text-brand-subtle resize-none"
            />
          </div>
          <div className="bg-brand-bg p-6 md:col-span-2 flex items-center justify-between flex-wrap gap-4">
            <span className="font-mono text-[11px] text-brand-subtle">
              {submitted ? "✓ Inquiry logged (prototype)" : "We reply within 1 working day"}
            </span>
            <button
              type="submit"
              className="bg-brand-accent text-brand-accent-fg text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-accent-hover transition-colors"
            >
              Send Inquiry
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default function ShowSecurityLanding() {
  return (
    <>
      <StatsStrip />
      <ValuePillars />
      <ServicesPreview />
      <EventsPreview />
      <ExpertiseBlock />
      <PartnersMarquee />
      <WorkWithUsBand />
      <ContactForm />
    </>
  );
}
