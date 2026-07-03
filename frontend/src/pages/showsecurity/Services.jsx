import ShowSecurityGate from "@/components/showsecurity/ShowSecurityGate";
import DemoPageShell from "@/components/showsecurity/DemoPageShell";
import SwipeCarousel from "@/components/showsecurity/SwipeCarousel";
import { SHOWSECURITY_SERVICES } from "@/brands/showsecurity-content";

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <div className="h-full bg-brand-surface-alt border border-brand-border p-8 flex flex-col">
      <Icon className="text-brand-accent" size={28} strokeWidth={1.5} />
      <h3 className="font-display font-bold uppercase tracking-tight text-xl mt-6">
        {service.title}
      </h3>
      <p className="mt-3 text-sm text-brand-muted leading-relaxed flex-1">{service.desc}</p>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle">
        // Placeholder service
      </p>
    </div>
  );
}

export default function ShowSecurityServices() {
  return (
    <ShowSecurityGate>
      <DemoPageShell
        overline="// Our Services"
        title="Everything Your Event Needs"
        description="A full security and production solution — from planning and permits to guards, stage crew, and medical staff on show day."
      >
        <div className="hidden lg:grid grid-cols-3 gap-px bg-brand-border border border-brand-border">
          {SHOWSECURITY_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="lg:hidden">
          <SwipeCarousel itemClassName="basis-full sm:basis-[85%]">
            {SHOWSECURITY_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </SwipeCarousel>
        </div>
      </DemoPageShell>
    </ShowSecurityGate>
  );
}
