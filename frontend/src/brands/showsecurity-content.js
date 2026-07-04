import {
  Shield,
  ShieldCheck,
  HardHat,
  HeartPulse,
  Package,
  ClipboardList,
} from "lucide-react";

export const SHOWSECURITY_SERVICES = [
  {
    id: "security-guards",
    icon: Shield,
    title: "Security Guards",
    desc: "Experienced säkerhetsvärdar with high service levels across Stockholm, Göteborg, and Malmö.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "order-guards",
    icon: ShieldCheck,
    title: "Order Guards",
    desc: "Authorized ordningsvakter — a key part of our full event security solution nationwide.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "stage-crew",
    icon: HardHat,
    title: "Stage Crew",
    desc: "Scenpersonal for build and strike — from club rooms to arena main stages.",
    image:
      "https://images.pexels.com/photos/2747443/pexels-photo-2747443.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "medical",
    icon: HeartPulse,
    title: "Medical Staff",
    desc: "Licensed nurses and doctors with dedicated event-medicine experience on site.",
    image:
      "https://images.unsplash.com/photo-1576765608535-156900045759?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "rental",
    icon: Package,
    title: "Equipment Rental",
    desc: "EPS GIGS stage barriers — internationally certified crowd-control and stage fencing.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "consulting",
    icon: ClipboardList,
    title: "Consulting",
    desc: "Planning, analyses, permit applications, and operational leadership from desk to show day.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export const SHOWSECURITY_EVENTS = [
  {
    id: "zara-larsson",
    title: "Zara Larsson — Midnight Sun Tour",
    category: "Concert",
    date: "Oct 2025 — Mar 2026",
    venue: "Avicii Arena, Malmö, Göteborg",
  },
  {
    id: "nhl-global",
    title: "NHL Global Series 2025",
    category: "Sport",
    date: "14 & 16 Nov 2025",
    venue: "Avicii Arena, Stockholm",
  },
  {
    id: "guns-n-roses",
    title: "Guns N' Roses",
    category: "Concert",
    date: "4 Jul 2025",
    venue: "Strawberry Arena",
  },
  {
    id: "pitbull",
    title: "Pitbull — Party After Dark Tour",
    category: "Concert",
    date: "29 Jun 2025",
    venue: "Avicii Arena",
  },
  {
    id: "kylie",
    title: "Kylie Minogue — Tension Tour",
    category: "Concert",
    date: "25 Jun 2025",
    venue: "Avicii Arena",
  },
  {
    id: "muse",
    title: "MUSE",
    category: "Festival",
    date: "27 Jun 2025",
    venue: "STHLM Fields",
  },
];

export const SHOWSECURITY_PARTNERS = [
  { id: "grona-lund", name: "Gröna Lund", initials: "GL" },
  { id: "polar", name: "Polar Music Prize", initials: "PM" },
  { id: "ifk", name: "IFK Göteborg", initials: "IFK" },
  { id: "hacken", name: "BK Häcken", initials: "BK" },
  { id: "avicii", name: "Avicii Arena", initials: "AA" },
  { id: "sthlm", name: "STHLM Fields", initials: "SF" },
  { id: "gothia", name: "Gothia Cup", initials: "GC" },
  { id: "partner", name: "Future Partner", initials: "FP" },
];

export const SHOWSECURITY_HISTORY_STATS = [
  { value: "550+", label: "Events Per Year" },
  { value: "Nationwide", label: "Coverage Across Sweden" },
  { value: "Authorized", label: "Security Company" },
  { value: "2016+", label: "Years Of Operations" },
];

export const SHOWSECURITY_HISTORY_MILESTONES = [
  {
    id: "founded",
    year: "2016",
    title: "Operations Established",
    desc: "Show Security begins delivering event security and stage production personnel across Sweden.",
  },
  {
    id: "scale",
    year: "550+",
    title: "Annual Event Volume",
    desc: "From club gigs to arena headline shows and major festivals — over 550 events secured each year.",
  },
  {
    id: "international",
    year: "Global",
    title: "International Experience",
    desc: "Crews and leadership with experience on tours and events beyond Sweden's borders.",
  },
  {
    id: "full-service",
    year: "Today",
    title: "Full-Service Security",
    desc: "Guards, ordningsvakter, stage crew, medical staff, barriers, and consulting under one roof.",
  },
];

export const SHOWSECURITY_APPLICATION_PATHS = [
  {
    id: "shifts",
    title: "Apply for Open Shifts",
    desc: "Log in and apply to posted work passes — ideal for flexible extra work at events.",
  },
  {
    id: "member",
    title: "Become a Member",
    desc: "Register for job offers and get matched to upcoming event assignments across Sweden.",
  },
];

export const SHOWSECURITY_ROLES = [
  "Security Guard",
  "Order Guard",
  "Stage Crew",
  "Medical Staff",
];
