import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrandWordmark from "@/components/BrandWordmark";
import { useBrandLink } from "@/hooks/useBrandLink";
import { SHOWSECURITY_NAV } from "@/constants/showsecurity-routes";

function NavPill({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`glass-nav inline-flex items-center rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] whitespace-nowrap transition-colors ${
        active
          ? "text-brand-text bg-brand-accent/20 border-brand-accent/40"
          : "text-brand-muted hover:text-brand-text"
      }`}
    >
      {children}
    </Link>
  );
}

export default function DemoPageShell({
  overline,
  title,
  description,
  children,
  showBack = true,
}) {
  const homeLink = useBrandLink("/");
  const location = useLocation();

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <header className="border-b border-brand-border bg-brand-bg sticky top-0 z-40">
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between gap-4">
          <Link to={homeLink} className="inline-flex items-center shrink-0">
            <BrandWordmark size="nav" />
          </Link>
          {showBack && (
            <Link
              to={homeLink}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-muted hover:text-brand-text transition-colors md:hidden"
            >
              <ArrowLeft size={16} />
              Home
            </Link>
          )}
        </div>

        <nav
          aria-label="Show Security demo pages"
          className="mx-auto max-w-[1400px] px-6 pb-4 overflow-x-auto snap-x snap-mandatory"
        >
          <ul className="flex gap-2 min-w-max">
            {SHOWSECURITY_NAV.map((item) => (
              <li key={item.path} className="snap-start">
                <NavPillLink path={item.path} label={item.label} currentPath={location.pathname} />
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
        {showBack && (
          <Link
            to={homeLink}
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-muted hover:text-brand-text transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        )}

        <div className="max-w-3xl mb-12 md:mb-16">
          {overline && (
            <p className="text-xs uppercase tracking-[0.3em] text-brand-text">{overline}</p>
          )}
          <h1 className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3 leading-[0.9]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-brand-muted leading-relaxed">{description}</p>
          )}
        </div>

        {children}
      </main>
    </div>
  );
}

function NavPillLink({ path, label, currentPath }) {
  const to = useBrandLink(path);
  return (
    <NavPill to={to} active={currentPath === path}>
      {label}
    </NavPill>
  );
}
