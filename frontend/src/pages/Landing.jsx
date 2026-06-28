import { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  Lightbulb,
  LightbulbOff,
  Activity,
  MoveVertical,
  Anchor,
  Construction,
  ShieldCheck,
  Zap,
  Layers,
  Cable,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import StageScene from "@/components/StageScene";

const ACCENT = "#facc15";

const NAV = [
  { label: "Stage", href: "#stage" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
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

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

/* ---------------- Navbar ---------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header
      data-testid="main-nav"
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-zinc-900"
    >
      <div className="mx-auto max-w-[1400px] px-6 h-16 flex items-center justify-between">
        <a href="#stage" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-8 h-8 bg-yellow-400 text-black font-display font-black text-lg">
            A
          </span>
          <span className="font-display font-black tracking-tighter uppercase text-lg">
            Apex<span className="text-yellow-400">/</span>Rig
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#quote"
            data-testid="nav-quote-btn"
            className="bg-yellow-400 text-black text-xs font-bold uppercase tracking-[0.15em] px-5 py-2.5 hover:bg-yellow-500 transition-colors"
          >
            Request Quote
          </a>
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-900 bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-zinc-300"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="bg-yellow-400 text-black text-center text-sm font-bold uppercase tracking-[0.15em] px-5 py-3"
          >
            Request Quote
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------------- Control Panel overlay ---------------- */
function ControlPanel({ lightsOn, setLightsOn, beatActive, setBeatActive, trussHeight, setTrussHeight }) {
  return (
    <div
      data-testid="control-panel"
      className="absolute bottom-5 left-5 right-5 md:right-auto md:w-[340px] bg-[#0d0d0d]/95 border border-zinc-800 z-20 pointer-events-auto"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
        <span className="text-[10px] uppercase tracking-[0.25em] text-yellow-400">
          // Rig Control
        </span>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500">
          <span className="w-1.5 h-1.5 bg-green-400 animate-pulse" /> Live
        </span>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            data-testid="toggle-lights-btn"
            onClick={() => setLightsOn((v) => !v)}
            className={`flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border transition-colors ${
              lightsOn
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-transparent text-zinc-400 border-zinc-700 hover:border-white hover:text-white"
            }`}
          >
            {lightsOn ? <Lightbulb size={15} /> : <LightbulbOff size={15} />}
            Lights {lightsOn ? "On" : "Off"}
          </button>
          <button
            data-testid="toggle-beat-btn"
            onClick={() => setBeatActive((v) => !v)}
            className={`flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border transition-colors ${
              beatActive
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-transparent text-zinc-400 border-zinc-700 hover:border-white hover:text-white"
            }`}
          >
            <Activity size={15} />
            Show {beatActive ? "On" : "Off"}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-zinc-400">
              <MoveVertical size={13} /> Truss Height
            </span>
            <span className="text-[11px] text-yellow-400 tabular-nums">
              {(trussHeight).toFixed(1)} m
            </span>
          </div>
          <input
            data-testid="truss-height-slider"
            type="range"
            min={3.5}
            max={8}
            step={0.1}
            value={trussHeight}
            onChange={(e) => setTrussHeight(parseFloat(e.target.value))}
            className="w-full accent-yellow-400 cursor-pointer"
          />
        </div>

        <p className="text-[10px] leading-relaxed text-zinc-600">
          Drag to orbit · scroll to zoom · adjust the rig in real time
        </p>
      </div>
    </div>
  );
}

/* ---------------- Hero / Stage ---------------- */
function Hero() {
  const [lightsOn, setLightsOn] = useState(true);
  const [beatActive, setBeatActive] = useState(true);
  const [trussHeight, setTrussHeight] = useState(7);

  return (
    <section id="stage" data-testid="hero-section" className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StageScene trussHeight={trussHeight} lightsOn={lightsOn} beatActive={beatActive} />
      </div>

      {/* gradient vignettes */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]" />

      {/* headline */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center">
        <div className="mx-auto max-w-[1400px] w-full px-6">
          <motion.p
            {...fadeUp(0.1)}
            className="text-xs uppercase tracking-[0.3em] text-yellow-400 mb-4"
          >
            Live Event Rigging & Structures
          </motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            className="font-display font-black uppercase tracking-tighter leading-[0.85] text-5xl md:text-7xl lg:text-8xl max-w-4xl"
          >
            We Build The
            <br />
            <span className="text-yellow-400">Sky</span> Above
            <br />
            The Show.
          </motion.h1>
          <motion.p
            {...fadeUp(0.35)}
            className="mt-6 max-w-md text-sm md:text-base text-zinc-400 leading-relaxed"
          >
            Certified stagehands, riggers and structural crews for tours,
            festivals and broadcast. Orbit the rig, then move it.
          </motion.p>
          <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
            <a
              href="#quote"
              data-testid="hero-quote-btn"
              className="bg-yellow-400 text-black text-sm font-bold uppercase tracking-[0.15em] px-7 py-4 hover:bg-yellow-500 transition-colors"
            >
              Request a Quote
            </a>
            <a
              href="#work"
              data-testid="hero-work-btn"
              className="border-2 border-zinc-700 text-white text-sm font-bold uppercase tracking-[0.15em] px-7 py-4 hover:border-white transition-colors"
            >
              See Our Work
            </a>
          </motion.div>
        </div>
      </div>

      <ControlPanel
        lightsOn={lightsOn}
        setLightsOn={setLightsOn}
        beatActive={beatActive}
        setBeatActive={setBeatActive}
        trussHeight={trussHeight}
        setTrussHeight={setTrussHeight}
      />
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
    <section className="border-y border-zinc-900 bg-[#0c0c0d]">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-900">
        {items.map(([n, l], i) => (
          <motion.div key={i} {...fadeUp(i * 0.08)} className="px-6 py-8">
            <div className="font-display font-black text-3xl md:text-5xl tracking-tighter text-white">
              {n}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">{l}</div>
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
        <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-yellow-400">
          // Capabilities
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3 max-w-3xl"
        >
          Everything Overhead, Engineered.
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                data-testid={`service-card-${i}`}
                className={`group bg-[#0d0d0d] hover:bg-[#141414] transition-colors p-8 ${s.span}`}
              >
                <div className="flex items-start justify-between">
                  <Icon className="text-yellow-400" size={28} strokeWidth={1.5} />
                  <span className="font-mono text-xs text-zinc-700">0{i + 1}</span>
                </div>
                <h3 className="font-display font-bold uppercase tracking-tight text-xl md:text-2xl mt-6">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-md">{s.desc}</p>
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
    <section id="work" data-testid="work-section" className="bg-[#0c0c0d] border-y border-zinc-900">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-yellow-400">
              // Selected Work
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3"
            >
              On The Truss.
            </motion.h2>
          </div>
          <motion.span {...fadeUp(0.2)} className="font-mono text-xs text-zinc-600">
            2019 — 2026
          </motion.span>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
          {GALLERY.map((g, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.08)}
              data-testid={`work-item-${i}`}
              className="group relative overflow-hidden bg-black aspect-[16/10]"
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
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400">
                    {g.meta}
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-xl mt-1">
                    {g.title}
                  </h3>
                </div>
                <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
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
  return (
    <section id="about" data-testid="about-section">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-yellow-400">
            // The Crew
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3 leading-[0.9]"
          >
            Steel, Rope
            <br />& Discipline.
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="mt-6 text-zinc-400 leading-relaxed max-w-lg">
            Apex Stage Riggers is a crew of certified riggers, structural engineers
            and stagehands who treat the air above a show as a load-bearing
            workspace. Every point is calculated, signed and double-checked.
          </motion.p>
          <motion.p {...fadeUp(0.3)} className="mt-4 text-zinc-400 leading-relaxed max-w-lg">
            From a 200-cap club to a stadium headline, we deliver rigging plots,
            ground-support and flown systems that pass inspection the first time.
          </motion.p>
          <motion.div {...fadeUp(0.4)} className="mt-8 flex gap-px bg-zinc-900 border border-zinc-900">
            {[
              ["ETCP", "Certified"],
              ["LOLER", "Compliant"],
              ["24/7", "On Call"],
            ].map(([a, b], i) => (
              <div key={i} className="bg-[#0d0d0d] px-6 py-4 flex-1">
                <div className="font-display font-black text-xl text-yellow-400">{a}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">{b}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.2)} className="relative">
          <div className="border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1755925193287-275aa7fe64f0"
              alt="Rigging safety equipment"
              loading="lazy"
              className="w-full h-[440px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-yellow-400 text-black px-5 py-4 flex items-center gap-3">
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
    <section id="quote" data-testid="quote-section" className="bg-[#0c0c0d] border-t border-zinc-900">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <motion.p {...fadeUp()} className="text-xs uppercase tracking-[0.3em] text-yellow-400">
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
          <motion.p {...fadeUp(0.2)} className="mt-6 text-zinc-400 leading-relaxed max-w-md">
            Send the basics and our rigging lead will reply with a scope and a
            number — usually within one working day.
          </motion.p>
        </div>

        <motion.form
          {...fadeUp(0.2)}
          onSubmit={onSubmit}
          data-testid="quote-form"
          className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900"
        >
          <div className="bg-[#0a0a0a] p-6">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Name</label>
            <input
              data-testid="quote-name-input"
              value={form.name}
              onChange={onChange("name")}
              placeholder="Jane Doe"
              className="mt-2 w-full bg-transparent border-b border-zinc-700 focus:border-yellow-400 outline-none py-2 text-white placeholder:text-zinc-700"
            />
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Email</label>
            <input
              data-testid="quote-email-input"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              placeholder="jane@venue.com"
              className="mt-2 w-full bg-transparent border-b border-zinc-700 focus:border-yellow-400 outline-none py-2 text-white placeholder:text-zinc-700"
            />
          </div>
          <div className="bg-[#0a0a0a] p-6 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Event Type</label>
            <select
              data-testid="quote-type-select"
              value={form.type}
              onChange={onChange("type")}
              className="mt-2 w-full bg-[#0a0a0a] border-b border-zinc-700 focus:border-yellow-400 outline-none py-2 text-white"
            >
              {["Concert / Tour", "Festival", "Corporate / Conference", "Theatre", "Broadcast / Film", "Other"].map(
                (o) => (
                  <option key={o} className="bg-[#0a0a0a]">
                    {o}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="bg-[#0a0a0a] p-6 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Project Details</label>
            <textarea
              data-testid="quote-details-input"
              value={form.details}
              onChange={onChange("details")}
              rows={4}
              placeholder="Venue, dates, flown weight, deck size…"
              className="mt-2 w-full bg-transparent border-b border-zinc-700 focus:border-yellow-400 outline-none py-2 text-white placeholder:text-zinc-700 resize-none"
            />
          </div>
          <div className="bg-[#0a0a0a] p-6 md:col-span-2 flex items-center justify-between flex-wrap gap-4">
            <span className="font-mono text-[11px] text-zinc-600">
              {submitted ? "✓ Request logged (prototype)" : "We reply within 1 working day"}
            </span>
            <button
              type="submit"
              data-testid="quote-submit-btn"
              className="bg-yellow-400 text-black text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-yellow-500 transition-colors"
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
function Footer() {
  return (
    <footer data-testid="footer" className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1400px] px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-zinc-900">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center w-8 h-8 bg-yellow-400 text-black font-display font-black text-lg">
            A
          </span>
          <span className="font-display font-black tracking-tighter uppercase text-lg">
            Apex<span className="text-yellow-400">/</span>Rig
          </span>
        </div>
        <p className="font-mono text-xs text-zinc-600">
          © 2026 Apex Stage Riggers — Prototype experience. Built with three.js.
        </p>
        <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-zinc-500">
          <a href="#stage" className="hover:text-yellow-400 transition-colors">Top</a>
          <a href="#quote" className="hover:text-yellow-400 transition-colors">Quote</a>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Toaster theme="dark" position="top-right" />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Work />
        <About />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}
