# Apex Stage Riggers — 3D Interactive Web Experience

## Original Problem Statement
"Generate a 3D web experience for a stagehands & riggers company. Web should be interactive with a real animated stage."

## User Choices
- Animated concert stage (orbit/zoom) with moving trusses, lights & rigging + interactive controls (toggle lights, raise/lower truss).
- Sections: Hero (3D stage) + Services + Projects/Gallery + About + Request a Quote form (single-page landing).
- Theme: agent's choice → dark obsidian + safety-yellow industrial aesthetic.
- Prototype, NO backend at this stage. Company name placeholder: "Apex Stage Riggers".

## Architecture / Tech
- Frontend only: React 19 + React Router, Tailwind, framer-motion, sonner.
- 3D: three.js 0.185, @react-three/fiber 9, @react-three/drei 10 (volumetric SpotLights, OrbitControls).
- No backend used; quote form is client-side (toast confirmation), data NOT persisted.

## User Personas
- Event producers / promoters evaluating a rigging vendor.
- Venue & production managers requesting quotes.

## Core Requirements (static)
- Interactive WebGL stage with moving heads, haze, raise/lower truss, light & show toggles.
- Marketing sections + lead-capture quote form.

## Implemented (2026-06-28)
- Hero with full-screen R3F stage: rig (4 box-truss beams), 4 corner towers, 6 colored moving heads with volumetric beams, haze particles, fog, fake-beat pulse, auto-orbit + restricted OrbitControls.
- Rig Control overlay: Lights toggle, Show (beat) toggle, Truss Height slider (live-mapped to 3D rig Y).
- Sections: Stats strip, Services (5-card bento), Work/Gallery (4 real images), About (image + certs), Quote form (validation + success toast), Footer, responsive Navbar.
- Verified by testing agent: 100% (11/11) frontend behaviours, no console errors, all images 200.

## Backlog
- P1: Persist quote submissions (FastAPI + Mongo) + admin inbox.
- P2: Replace placeholder name/branding with real company; add real project case studies.
- P2: Pause auto-rotate during user drag; add SEO/meta tags; loading screen for 3D.
- P2: Add glTF rigging models / draggable rig points; sound-reactive beat from real audio.

## Next Tasks
- Await user feedback (real company name, content, whether to add backend for quote storage).
