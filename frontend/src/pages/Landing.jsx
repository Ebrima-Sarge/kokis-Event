import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Toaster, toast } from "sonner";
import IntroOverlay from "@/components/IntroOverlay";
import KokisWordmark from "@/components/KokisWordmark";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useBrand } from "@/hooks/useBrand";
import { useBrandLink } from "@/hooks/useBrandLink";
import { WORK_WITH_US_PATH } from "@/constants/site";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Anchor,
  Construction,
  ShieldCheck,
  Zap,
  Layers,
  Cable,
  ArrowUpRight,
  Menu,
  X,
  MoveDown,
  Facebook,
  Instagram,
  Linkedin,
  ChevronUp,
  Mail,
} from "lucide-react";

const NAV = [
  { label: "Stage", href: "#stage" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
];

const SERVICES = [
  {
    icon: Construction,
    title: "Truss & Structures",
    desc: "Ground-supported and flown grids, towers and custom steel. Engineered, certified, load-calculated.",
    span: "lg:col-span-7",
  },
  {
    icon: Anchor,
    title: "Rigging & Motors",
    desc: "Chain hoists, bridles and dynamic rigging by ETCP-certified crews.",
    span: "lg:col-span-5",
  },
  {
    icon: Zap,
    title: "Lighting & Power",
    desc: "Moving heads, distro and cable management.",
    span: "lg:col-span-4",
  },
  {
    icon: Layers,
    title: "Staging & Decking",
    desc: "Modular decks, rolling risers, rake & runway builds.",
    span: "lg:col-span-4",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Compliance",
    desc: "Method statements, RAMS, fall-arrest and on-site supervision.",
    span: "lg:col-span-4",
  },
];

const GALLERY = [
  {
    url: "https://images.pexels.com/photos/17425777/pexels-photo-17425777.jpeg",
    title: "Arena Tour — Grid Load-In",
    meta: "48T flown / 12 motors",
  },
  {
    url: "https://images.unsplash.com/photo-1670028514318-0ac718c0590d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodGluZyUyMHRydXNzfGVufDB8fHx8MTc4MjQxNjI3OXww&ixlib=rb-4.1.0&q=85",
    title: "Festival Mainstage",
    meta: "Front-of-house truss array",
  },
  {
    url: "https://images.unsplash.com/photo-1623090351083-90cce8ec842e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBldmVudCUyMGJhY2tzdGFnZSUyMGRhcmt8ZW58MHx8fHwxNzgyMTU3NTM2fDA&ixlib=rb-4.1.0&q=85",
    title: "Corporate Keynote",
    meta: "Black-box rig + LED",
  },
  {
    url: "https://images.unsplash.com/photo-1771942690809-49605caf6ec5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBldmVudCUyMGJhY2tzdGFnZSUyMGRhcmt8ZW58MHx8fHwxNzgyMTU3NTM2fDA&ixlib=rb-4.1.0&q=85",
    title: "Theatre Residency",
    meta: "Soft goods & flying",
  },
];

const TEAM = [
  {
    id: "lead-rigger",
    name: "Alex Mercer",
    role: "Lead Rigger",
    initials: "AM",
    bio: "ETCP-certified rigger with 15+ years on arena tours and festival main stages.",
  },
  {
    id: "stage-manager",
    name: "Jordan Lee",
    role: "Stage Manager",
    initials: "JL",
    bio: "Load-in to strike — coordinates crews, timelines, and safety across multi-day builds.",
  },
  {
    id: "structural",
    name: "Sam Okonkwo",
    role: "Structural Engineer",
    initials: "SO",
    bio: "Steel plots, load calculations, and sign-off for flown grids and ground support.",
  },
  {
    id: "lighting-tech",
    name: "Riley Chen",
    role: "Lighting Tech",
    initials: "RC",
    bio: "Truss hangs, distro, and cable management for broadcast and live events.",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

/* ---------------- Navbar ---------------- */
function Navbar({ logoTargetRef, visible }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 ${visible ? "" : "invisible pointer-events-none"}`}
    >
      <div className="mx-auto max-w-[1400px] px-6 h-16 flex items-center justify-between">
        <a
          href="#stage"
          ref={logoTargetRef}
          data-testid="nav-logo"
          className="inline-flex items-center"
        >
          <span className={visible ? "" : "invisible"} aria-hidden={!visible}>
            <KokisWordmark size="nav" />
          </span>
        </a>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            {NAV.map((n) => (
              <NavigationMenuItem key={n.label}>
                <NavigationMenuLink
                  href={n.href}
                  data-testid={`nav-${n.label.toLowerCase()}`}
                  className="glass-nav inline-flex items-center rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-brand-muted hover:text-brand-text"
                >
                  {n.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#quote"
                data-testid="nav-quote-btn"
                className="glass-nav inline-flex items-center rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-text bg-brand-accent/15 hover:bg-brand-accent/25"
              >
                Request Quote
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-brand-text"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-nav border-t border-brand-text/10 px-6 py-4 flex flex-col gap-3">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="glass-nav rounded-full px-4 py-3 text-center text-sm uppercase tracking-[0.2em] text-brand-muted hover:text-brand-text"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="glass-nav rounded-full px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.15em] text-brand-text bg-brand-accent/15 hover:bg-brand-accent/25"
          >
            Request Quote
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero / Stage (scroll-driven swipe reveal) ---------------- */
function Hero() {
  const { brand } = useBrand();
  const wrapRef = useRef(null);
  const topRef = useRef(null);
  const baseRef = useRef(null);
  const dividerRef = useRef(null);
  const headlineRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const pct = p * 100;
      if (topRef.current) topRef.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
      if (baseRef.current) baseRef.current.style.transform = `scale(${1 + p * 0.08})`;
      if (dividerRef.current) {
        dividerRef.current.style.left = `${pct}%`;
        dividerRef.current.style.opacity = String(p > 0.01 && p < 0.99 ? 1 : 0);
      }
      if (headlineRef.current)
        headlineRef.current.style.opacity = String(Math.max(0, 1 - p * 2.4));
      if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - p * 4));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="stage" data-testid="hero-section" ref={wrapRef} className="relative h-[230vh] w-full bg-brand-bg">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* base = branded KOKI'S frame (revealed by the swipe) */}
        <div
          ref={baseRef}
          data-testid="hero-image-brand"
          className="absolute inset-0 z-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: `url("${brand.assets.heroBrand}")` }}
        />
        {/* top = raw stagehands frame, wiped away on scroll */}
        <div
          ref={topRef}
          data-testid="hero-image-raw"
          className="absolute inset-0 z-10 bg-cover bg-center grayscale"
          style={{ backgroundImage: `url("${brand.assets.heroRaw}")`, clipPath: "inset(0 0 0 0%)" }}
        />
        {/* swipe divider */}
        <div
          ref={dividerRef}
          className="pointer-events-none absolute top-0 z-20 h-full w-[2px] bg-brand-accent opacity-0"
          style={{ left: "0%" }}
        />

        {/* contrast overlay */}
        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-black/70 via-black/20 to-black" />

        {/* headline (fades out as the swipe reveals the brand) */}
        <div
          ref={headlineRef}
          className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-center"
        >
          <div className="mx-auto max-w-[1400px] w-full px-6">
            <motion.p
              {...fadeUp(0.1)}
              className="text-xs uppercase tracking-[0.3em] text-brand-text mb-4"
            >
              Live Event Production & Rigging
            </motion.p>
            <motion.h1
              {...fadeUp(0.2)}
              className="font-display font-black uppercase tracking-tighter leading-[0.85] text-5xl md:text-7xl lg:text-8xl max-w-4xl"
            >
              We Build
              <br />
              The Show
              <br />
              You Remember.
            </motion.h1>
            <motion.p
              {...fadeUp(0.35)}
              className="mt-6 max-w-md text-sm md:text-base text-brand-muted leading-relaxed"
            >
              Certified stagehands, riggers and structural crews for tours,
              festivals and broadcast. Scroll to reveal the build.
            </motion.p>
            <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
              <a
                href="#quote"
                data-testid="hero-quote-btn"
                className="bg-brand-accent text-brand-accent-fg text-sm font-bold uppercase tracking-[0.15em] px-7 py-4 hover:bg-brand-accent-hover transition-colors"
              >
                Request a Quote
              </a>
              <a
                href="#work"
                data-testid="hero-work-btn"
                className="border-2 border-brand-border text-brand-text text-sm font-bold uppercase tracking-[0.15em] px-7 py-4 hover:border-brand-accent transition-colors"
              >
                See Our Work
              </a>
            </motion.div>
          </div>
        </div>

        {/* scroll hint */}
        <div
          ref={hintRef}
          data-testid="scroll-hint"
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-brand-muted"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll To Reveal</span>
          <MoveDown size={18} className="animate-bounce text-brand-text" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats strip ---------------- */
function Stats() {
  const items = [
    ["18+", "Years On Site"],
    ["2,400", "Shows Rigged"],
    ["100%", "ETCP Certified"],
    ["48T", "Max Flown Load"],
  ];
  return (
    <section className="border-y border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border">
        {items.map(([n, l], i) => (
          <motion.div key={i} {...fadeUp(i * 0.08)} className="px-6 py-8">
            <div className="font-display font-black text-3xl md:text-5xl tracking-tighter text-brand-text">
              {n}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-brand-subtle">{l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  return (
    <section id="services" data-testid="services-section" className="bp-grid">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-brand-text">
          // Capabilities
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3 max-w-3xl"
        >
          Everything Overhead, Engineered.
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-px bg-brand-border border border-brand-border">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                data-testid={`service-card-${i}`}
                className={`group bg-brand-surface-alt hover:bg-brand-surface-hover transition-colors p-8 ${s.span}`}
              >
                <div className="flex items-start justify-between">
                  <Icon className="text-brand-text" size={28} strokeWidth={1.5} />
                  <span className="font-mono text-xs text-brand-subtle">0{i + 1}</span>
                </div>
                <h3 className="font-display font-bold uppercase tracking-tight text-xl md:text-2xl mt-6">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-brand-subtle leading-relaxed max-w-md">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Work / Gallery ---------------- */
function Work() {
  return (
    <section id="work" data-testid="work-section" className="bg-brand-surface border-y border-brand-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-brand-text">
              // Selected Work
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3"
            >
              On The Truss.
            </motion.h2>
          </div>
          <motion.span {...fadeUp(0.2)} className="font-mono text-xs text-brand-subtle">
            2019 — 2026
          </motion.span>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border border border-brand-border">
          {GALLERY.map((g, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.08)}
              data-testid={`work-item-${i}`}
              className="group relative overflow-hidden bg-brand-bg aspect-[16/10]"
            >
              <img
                src={g.url}
                alt={g.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-text">
                    {g.meta}
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-xl mt-1">
                    {g.title}
                  </h3>
                </div>
                <ArrowUpRight className="text-brand-text opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const { brand } = useBrand();

  return (
    <section id="about" data-testid="about-section">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-brand-text">
            // The Crew
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3 leading-[0.9]"
          >
            Steel, Rope
            <br />& Discipline.
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="mt-6 text-brand-muted leading-relaxed max-w-lg">
            {brand.legalName} is a crew of certified riggers, structural engineers
            and stagehands who treat the air above a show as a load-bearing
            workspace. Every point is calculated, signed and double-checked.
          </motion.p>
          <motion.p {...fadeUp(0.3)} className="mt-4 text-brand-muted leading-relaxed max-w-lg">
            From a 200-cap club to a stadium headline, we deliver rigging plots,
            ground-support and flown systems that pass inspection the first time.
          </motion.p>
          <motion.div {...fadeUp(0.4)} className="mt-8 flex gap-px bg-brand-border border border-brand-border">
            {[
              ["ETCP", "Certified"],
              ["LOLER", "Compliant"],
              ["24/7", "On Call"],
            ].map(([a, b], i) => (
              <div key={i} className="bg-brand-surface-alt px-6 py-4 flex-1">
                <div className="font-display font-black text-xl text-brand-text">{a}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle mt-1">{b}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.2)} className="relative">
          <div className="border border-brand-border">
            <img
              src="https://images.unsplash.com/photo-1755925193287-275aa7fe64f0"
              alt="Rigging safety equipment"
              loading="lazy"
              className="w-full h-[440px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-brand-accent text-brand-accent-fg px-5 py-4 flex items-center gap-3">
            <Cable size={22} />
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

/* ---------------- Team ---------------- */
function TeamProfileCard({ member, index }) {
  const reduce = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const showBack = !reduce && (isHovered || isFlipped);

  const handleClick = () => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsFlipped((v) => !v);
    }
  };

  if (reduce) {
    return (
      <motion.div
        {...fadeUp(index * 0.08)}
        data-testid={`team-card-${member.id}`}
        className="bg-brand-surface-alt p-8 flex flex-col items-center text-center min-h-[320px]"
      >
        <Avatar className="h-24 w-24 rounded-none">
          <AvatarFallback className="rounded-none bg-brand-elevated text-brand-text font-display font-black text-2xl">
            {member.initials}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-display font-bold uppercase tracking-tight text-xl mt-6">
          {member.name}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle mt-2">
          {member.role}
        </p>
        <p className="mt-4 text-sm text-brand-muted leading-relaxed">{member.bio}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      data-testid={`team-card-${member.id}`}
      className="perspective-[1000px] min-h-[320px] aspect-[3/4] cursor-pointer md:cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${member.name}, ${member.role}. Tap to flip for bio.`}
    >
      <motion.div
        className="relative w-full h-full min-h-[320px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: showBack ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* front */}
        <div
          className="absolute inset-0 bg-brand-surface-alt p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Avatar className="h-24 w-24 rounded-none">
            <AvatarFallback className="rounded-none bg-brand-elevated text-brand-text font-display font-black text-2xl">
              {member.initials}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-display font-bold uppercase tracking-tight text-xl mt-6">
            {member.name}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle mt-2">
            {member.role}
          </p>
        </div>

        {/* back */}
        <div
          className="absolute inset-0 bg-brand-surface-hover p-8 flex flex-col justify-center text-center [backface-visibility:hidden]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle">
            // Placeholder
          </p>
          <p className="mt-4 text-sm text-brand-muted leading-relaxed">{member.bio}</p>
          <p className="mt-6 font-display font-bold uppercase tracking-tight text-lg text-brand-text">
            {member.name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle mt-1">
            {member.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Team() {
  const workWithUsLink = useBrandLink(WORK_WITH_US_PATH);

  return (
    <section id="team" data-testid="team-section" className="bg-brand-surface border-y border-brand-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-brand-text">
          // The Team
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3"
        >
          Built By Specialists.
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border border border-brand-border">
          {TEAM.map((member, i) => (
            <TeamProfileCard key={member.id} member={member} index={i} />
          ))}
        </div>

        <motion.div {...fadeUp(0.4)} className="mt-12">
          <Link
            to={workWithUsLink}
            data-testid="team-work-with-us-btn"
            className="inline-flex bg-brand-accent text-brand-accent-fg text-sm font-bold uppercase tracking-[0.15em] px-7 py-4 hover:bg-brand-accent-hover transition-colors"
          >
            Work With Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Quote form ---------------- */
function Quote() {
  const [form, setForm] = useState({ name: "", email: "", type: "Concert / Tour", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    setSubmitted(true);
    toast.success("Quote request received — we'll be in touch.", {
      description: "Prototype: data is not stored yet.",
    });
  };

  return (
    <section id="quote" data-testid="quote-section" className="bg-brand-surface border-t border-brand-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-brand-text">
            // Request a Quote
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3 leading-[0.9]"
          >
            Tell Us
            <br />
            The Build.
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="mt-6 text-brand-muted leading-relaxed max-w-md">
            Send the basics and our rigging lead will reply with a scope and a
            number — usually within one working day.
          </motion.p>
        </div>

        <motion.form
          {...fadeUp(0.2)}
          onSubmit={onSubmit}
          data-testid="quote-form"
          className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border border border-brand-border"
        >
          <div className="bg-brand-bg p-6">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">Name</label>
            <input
              data-testid="quote-name-input"
              value={form.name}
              onChange={onChange("name")}
              placeholder="Jane Doe"
              className="mt-2 w-full bg-transparent border-b border-brand-border focus:border-brand-accent outline-none py-2 text-brand-text placeholder:text-brand-subtle"
            />
          </div>
          <div className="bg-brand-bg p-6">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">Email</label>
            <input
              data-testid="quote-email-input"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              placeholder="jane@venue.com"
              className="mt-2 w-full bg-transparent border-b border-brand-border focus:border-brand-accent outline-none py-2 text-brand-text placeholder:text-brand-subtle"
            />
          </div>
          <div className="bg-brand-bg p-6 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">Event Type</label>
            <select
              data-testid="quote-type-select"
              value={form.type}
              onChange={onChange("type")}
              className="mt-2 w-full bg-brand-bg border-b border-brand-border focus:border-brand-accent outline-none py-2 text-brand-text"
            >
              {["Concert / Tour", "Festival", "Corporate / Conference", "Theatre", "Broadcast / Film", "Other"].map(
                (o) => (
                  <option key={o} className="bg-brand-bg">
                    {o}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="bg-brand-bg p-6 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">Project Details</label>
            <textarea
              data-testid="quote-details-input"
              value={form.details}
              onChange={onChange("details")}
              rows={4}
              placeholder="Venue, dates, flown weight, deck size…"
              className="mt-2 w-full bg-transparent border-b border-brand-border focus:border-brand-accent outline-none py-2 text-brand-text placeholder:text-brand-subtle resize-none"
            />
          </div>
          <div className="bg-brand-bg p-6 md:col-span-2 flex items-center justify-between flex-wrap gap-4">
            <span className="font-mono text-[11px] text-brand-subtle">
              {submitted ? "✓ Request logged (prototype)" : "We reply within 1 working day"}
            </span>
            <button
              type="submit"
              data-testid="quote-submit-btn"
              className="bg-brand-accent text-brand-accent-fg text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-brand-accent-hover transition-colors"
            >
              Send Request
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function TikTokIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.5 5.06a5.4 5.4 0 0 1-1.28-.9 5.4 5.4 0 0 1-1.5-3.16h-3.2v13.2a2.72 2.72 0 1 1-2.4-2.7v-3.2a5.94 5.94 0 1 0 5.6 5.93V8.3a8.55 8.55 0 0 0 4.78 1.45V6.54a5.4 5.4 0 0 1-1.8-.48z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
];

function Footer() {
  const { brand } = useBrand();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer data-testid="footer" className="bg-brand-surface border-t border-brand-border text-brand-text">
      <div className="mx-auto max-w-[1400px] px-6 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center md:text-left">
        {/* left: legal links */}
        <div className="flex items-center justify-center md:justify-start gap-3 text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          <a href="#" className="hover:text-brand-text transition-colors">
            Terms of Use
          </a>
          <span className="text-brand-subtle">|</span>
          <a href="#" className="hover:text-brand-text transition-colors">
            Privacy Policy
          </a>
        </div>

        {/* center: social icons + email */}
        <div className="flex items-center justify-center gap-7">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              data-testid={`footer-social-${label.toLowerCase()}`}
              className="text-brand-muted hover:text-brand-text transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
          <a
            href={`mailto:${brand.contactEmail}`}
            aria-label="Email us"
            data-testid="footer-email"
            className="text-brand-muted hover:text-brand-text transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* right: copyright + scroll-to-top */}
        <div className="flex items-center justify-center md:justify-end gap-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-brand-subtle">
            Copyright &copy; {brand.legalName} 2026
          </p>
          <button
            type="button"
            onClick={scrollTop}
            data-testid="footer-scroll-top"
            aria-label="Back to top"
            className="grid place-items-center w-10 h-10 rounded-full border-2 border-brand-border text-brand-muted hover:bg-brand-accent hover:text-brand-accent-fg hover:border-brand-accent transition-colors shrink-0"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const logoTargetRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <AnimatePresence>
        {!introDone && (
          <IntroOverlay
            key="intro"
            logoTargetRef={logoTargetRef}
            onDone={() => setIntroDone(true)}
          />
        )}
      </AnimatePresence>
      <Toaster theme="dark" position="top-right" />
      <Navbar logoTargetRef={logoTargetRef} visible={introDone} />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Work />
        <About />
        <Team />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}
