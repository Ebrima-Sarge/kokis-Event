import ShowSecurityGate from "@/components/showsecurity/ShowSecurityGate";
import DemoPageShell from "@/components/showsecurity/DemoPageShell";
import SwipeCarousel from "@/components/showsecurity/SwipeCarousel";
import { SHOWSECURITY_PARTNERS } from "@/brands/showsecurity-content";

function PartnerLogo({ partner }) {
  return (
    <div className="h-full min-h-[160px] bg-brand-surface-alt border border-brand-border flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 border-2 border-dashed border-brand-border flex items-center justify-center font-display font-black text-xl text-brand-subtle">
        {partner.initials}
      </div>
      <p className="mt-4 text-sm uppercase tracking-[0.15em] text-brand-muted">{partner.name}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle">
        Logo placeholder
      </p>
    </div>
  );
}

export default function ShowSecurityPartners() {
  return (
    <ShowSecurityGate>
      <DemoPageShell
        overline="// Our Partners"
        title="Trusted By Venues & Promoters"
        description="From amusement parks to arenas and football clubs — placeholder logos for future partner assets."
      >
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border border border-brand-border">
          {SHOWSECURITY_PARTNERS.map((partner) => (
            <PartnerLogo key={partner.id} partner={partner} />
          ))}
        </div>

        <div className="md:hidden">
          <SwipeCarousel itemClassName="basis-[75%] sm:basis-1/2">
            {SHOWSECURITY_PARTNERS.map((partner) => (
              <PartnerLogo key={partner.id} partner={partner} />
            ))}
          </SwipeCarousel>
        </div>
      </DemoPageShell>
    </ShowSecurityGate>
  );
}
