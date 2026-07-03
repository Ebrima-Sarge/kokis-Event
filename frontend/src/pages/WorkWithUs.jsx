import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useBrand } from "@/hooks/useBrand";
import { useBrandLink } from "@/hooks/useBrandLink";
import ShowSecurityGate from "@/components/showsecurity/ShowSecurityGate";
import DemoPageShell from "@/components/showsecurity/DemoPageShell";
import ApplicationWizard from "@/components/showsecurity/ApplicationWizard";

export default function WorkWithUs() {
  const { brand, brandId } = useBrand();
  const homeLink = useBrandLink("/");

  if (brandId === "showsecurity") {
    return (
      <ShowSecurityGate>
        <DemoPageShell
          overline="// Careers"
          title="Work With Us"
          description={`Apply to join ${brand.legalName} — choose open shifts or register for future job offers.`}
          showBack
        >
          <ApplicationWizard />
        </DemoPageShell>
        <Toaster theme="dark" position="top-right" />
      </ShowSecurityGate>
    );
  }

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <Link
          to={homeLink}
          data-testid="work-with-us-back"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-muted hover:text-brand-text transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-brand-text">
            // Careers
          </p>
          <h1
            data-testid="work-with-us-heading"
            className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl mt-3 leading-[0.9]"
          >
            Work With Us
          </h1>
          <p className="mt-6 text-brand-muted leading-relaxed">
            Open roles and job applications are coming soon. This page will host
            current openings and a form to submit your application to join the{" "}
            {brand.legalName} crew.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-subtle">
            // Placeholder — build application flow here
          </p>
        </motion.div>
      </div>
    </div>
  );
}
