import ShowSecurityGate from "@/components/showsecurity/ShowSecurityGate";
import DemoPageShell from "@/components/showsecurity/DemoPageShell";
import ServiceScrollShowcase from "@/components/showsecurity/ServiceScrollShowcase";
import { SHOWSECURITY_SERVICES } from "@/brands/showsecurity-content";

export default function ShowSecurityServices() {
  return (
    <ShowSecurityGate>
      <DemoPageShell
        overline="// Our Services"
        title="Everything Your Event Needs"
        description="A full security and production solution — from planning and permits to guards, stage crew, and medical staff on show day."
      >
        <ServiceScrollShowcase services={SHOWSECURITY_SERVICES} />
      </DemoPageShell>
    </ShowSecurityGate>
  );
}
