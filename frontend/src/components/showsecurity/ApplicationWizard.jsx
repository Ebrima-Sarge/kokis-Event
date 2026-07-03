import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  SHOWSECURITY_APPLICATION_PATHS,
  SHOWSECURITY_ROLES,
} from "@/brands/showsecurity-content";

const STEPS = ["Welcome", "Personal Info", "Role & Experience", "Review"];

const initialForm = {
  path: "",
  name: "",
  email: "",
  phone: "",
  role: SHOWSECURITY_ROLES[0],
  availability: "",
};

export default function ApplicationWizard() {
  const [api, setApi] = useState(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);

  const onSelect = useCallback(() => {
    if (!api) return;
    setStep(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, onSelect]);

  const goNext = () => {
    if (step === 1 && (!form.name.trim() || !form.email.trim())) {
      toast.error("Name and email are required.");
      return;
    }
    if (step === 0 && !form.path) {
      toast.error("Please choose an application path.");
      return;
    }
    api?.scrollNext();
  };

  const goPrev = () => api?.scrollPrev();

  const onSubmit = () => {
    toast.success("Application received — we'll be in touch.", {
      description: "Prototype: data is not stored yet.",
    });
  };

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-brand-subtle font-mono mb-3">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
          <span>{STEPS[step]}</span>
        </div>
        <div className="h-1 bg-brand-border overflow-hidden">
          <div
            className="h-full bg-brand-accent transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", watchDrag: false, draggable: false }}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border border border-brand-border">
              {SHOWSECURITY_APPLICATION_PATHS.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, path: path.id }))}
                  className={`text-left p-8 transition-colors ${
                    form.path === path.id
                      ? "bg-brand-surface-hover ring-1 ring-inset ring-brand-accent"
                      : "bg-brand-surface-alt hover:bg-brand-surface-hover"
                  }`}
                >
                  <h3 className="font-display font-bold uppercase tracking-tight text-xl">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-sm text-brand-muted leading-relaxed">{path.desc}</p>
                </button>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-subtle">
              // Demo — no login required
            </p>
          </CarouselItem>

          <CarouselItem>
            <div className="grid grid-cols-1 gap-px bg-brand-border border border-brand-border max-w-xl">
              <Field label="Full Name">
                <input
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Jane Doe"
                  className="w-full bg-brand-bg border-b border-brand-border focus:border-brand-accent outline-none py-3 text-brand-text placeholder:text-brand-subtle"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="jane@example.com"
                  className="w-full bg-brand-bg border-b border-brand-border focus:border-brand-accent outline-none py-3 text-brand-text placeholder:text-brand-subtle"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+46 70 000 00 00"
                  className="w-full bg-brand-bg border-b border-brand-border focus:border-brand-accent outline-none py-3 text-brand-text placeholder:text-brand-subtle"
                />
              </Field>
            </div>
          </CarouselItem>

          <CarouselItem>
            <div className="grid grid-cols-1 gap-px bg-brand-border border border-brand-border max-w-xl">
              <Field label="Preferred Role">
                <select
                  value={form.role}
                  onChange={update("role")}
                  className="w-full bg-brand-bg border-b border-brand-border focus:border-brand-accent outline-none py-3 text-brand-text"
                >
                  {SHOWSECURITY_ROLES.map((role) => (
                    <option key={role} value={role} className="bg-brand-bg">
                      {role}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Availability & Experience">
                <textarea
                  value={form.availability}
                  onChange={update("availability")}
                  rows={4}
                  placeholder="Weekends, evenings, prior event experience…"
                  className="w-full bg-brand-bg border-b border-brand-border focus:border-brand-accent outline-none py-3 text-brand-text placeholder:text-brand-subtle resize-none"
                />
              </Field>
            </div>
          </CarouselItem>

          <CarouselItem>
            <div className="max-w-xl border border-brand-border bg-brand-surface-alt p-8 space-y-4">
              <ReviewRow label="Application type">
                {SHOWSECURITY_APPLICATION_PATHS.find((p) => p.id === form.path)?.title ||
                  "—"}
              </ReviewRow>
              <ReviewRow label="Name">{form.name || "—"}</ReviewRow>
              <ReviewRow label="Email">{form.email || "—"}</ReviewRow>
              <ReviewRow label="Phone">{form.phone || "—"}</ReviewRow>
              <ReviewRow label="Role">{form.role}</ReviewRow>
              <ReviewRow label="Availability">{form.availability || "—"}</ReviewRow>
            </div>
            <p className="mt-4 font-mono text-[11px] text-brand-subtle">
              Prototype submission — data is not stored.
            </p>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {step > 0 && (
          <button
            type="button"
            onClick={goPrev}
            className="border-2 border-brand-border text-brand-text text-sm font-bold uppercase tracking-[0.15em] px-7 py-4 hover:border-brand-accent transition-colors"
          >
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="bg-brand-accent text-brand-accent-fg text-sm font-bold uppercase tracking-[0.15em] px-7 py-4 hover:bg-brand-accent-hover transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className="bg-brand-accent text-brand-accent-fg text-sm font-bold uppercase tracking-[0.15em] px-7 py-4 hover:bg-brand-accent-hover transition-colors"
          >
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="bg-brand-bg p-6">
      <label className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-brand-border pb-3 last:border-0 last:pb-0">
      <span className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle shrink-0 w-36">
        {label}
      </span>
      <span className="text-sm text-brand-text">{children}</span>
    </div>
  );
}
