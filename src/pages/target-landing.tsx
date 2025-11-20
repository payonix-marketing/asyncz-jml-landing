import { useMemo } from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { TrustedBy } from "src/components/sections/trusted-by";
import { Button } from "src/components/ui/button";
import { CheckCircle2, ArrowRight, Quote } from "lucide-react";
import {
  TARGET_LANDING_CONTENT,
  type LandingTarget,
  type TargetLandingContent,
} from "src/config/targetLanding";
import { useSeo } from "src/hooks/useSeo";
import { organizationSchema, productSchema } from "src/config/schema";

const TARGET_LABELS: Record<
  LandingTarget,
  { industry: string; teamLabel: string; testimonials: string }
> = {
  barber: {
    industry: "barbershops",
    teamLabel: "grooming teams",
    testimonials: "Grooming leaders growing with asyncz",
  },
  doctor: {
    industry: "medical practices",
    teamLabel: "medical teams",
    testimonials: "Clinics delivering modern patient experiences",
  },
  dentist: {
    industry: "dental practices",
    teamLabel: "dental teams",
    testimonials: "Dental groups scaling with asyncz",
  },
};

interface TargetLandingPageProps {
  target: LandingTarget;
  content: TargetLandingContent;
}

export function TargetLandingPage({ target, content }: TargetLandingPageProps) {
  const seoConfig = useMemo(
    () => ({
      title: content.seo.title,
      description: content.seo.description,
      path: "/",
      keywords: [
        `${target} scheduling`,
        `asyncz for ${target}s`,
        "asyncz industry workflows",
      ],
      structuredData: [organizationSchema, productSchema],
    }),
    [content, target]
  );

  useSeo(seoConfig);

  const labels = TARGET_LABELS[target];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-gray-200">
      <Header />
      <main>
        <section className="bg-white dark:bg-gray-900 pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 text-sm font-semibold uppercase tracking-wide">
                  {content.hero.eyebrow}
                </span>
                <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {content.hero.title}{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-lime-500 bg-clip-text text-transparent">
                    {content.hero.highlight}
                  </span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                  {content.hero.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {content.hero.bulletPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-base sm:text-lg text-gray-700 dark:text-gray-200"
                    >
                      <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href={content.hero.primaryCtaHref}
                    className="w-full sm:w-auto"
                  >
                    <Button className="brand-gradient text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl transition-all transform hover:scale-105 w-full">
                      {content.hero.primaryCtaLabel}
                    </Button>
                  </a>
                  <a
                    href={content.hero.secondaryCtaHref}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-300 transition-all w-full"
                    >
                      {content.hero.secondaryCtaLabel}
                    </Button>
                  </a>
                </div>
              </div>
              <div>
                <div className="bg-gray-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
                  <p className="text-sm uppercase tracking-wide text-gray-400">
                    Results asyncz drives
                  </p>
                  <div className="space-y-6">
                    {content.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:pb-0 last:border-none"
                      >
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {stat.label}
                          </p>
                          <p className="mt-2 text-sm text-gray-300">
                            {stat.description}
                          </p>
                        </div>
                        <span className="text-3xl font-bold text-emerald-300">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/10 rounded-2xl px-4 py-3">
                    <ArrowRight className="h-4 w-4" />
                    <span>Built with {labels.teamLabel} in mind</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustedBy />

        <section className="py-16 sm:py-20 lg:py-24 bg-slate-100 dark:bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Automation built for modern {labels.industry}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                asyncz connects every customer touchpoint – from discovery to
                repeat visits – with workflows tuned for {labels.teamLabel}.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {content.features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                A connected workflow for {labels.teamLabel}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Every step is customizable, no engineering required. Launch
                industry-grade automations in minutes.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {content.workflow.map((step) => (
                <div
                  key={step.title}
                  className="bg-slate-100 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/10 rounded-2xl p-6 sm:p-7"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-slate-100 dark:bg-slate-900/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                {labels.testimonials}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Hear how teams like yours scale revenue and retention with
                asyncz automation.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {content.testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-slate-200/70 dark:border-white/10"
                >
                  <Quote className="h-10 w-10 text-emerald-400" />
                  <p className="mt-6 text-lg text-gray-700 dark:text-gray-200">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-emerald-500 to-lime-500">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold">
              {content.cta.title}
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-emerald-50">
              {content.cta.description}
            </p>
            <div className="mt-8">
              <a href={content.cta.buttonHref}>
                <Button
                  variant="secondary"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold"
                >
                  {content.cta.buttonLabel}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const resolveTargetLanding = (
  value: string | null
): TargetLandingPageProps | null => {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (!(normalized in TARGET_LANDING_CONTENT)) {
    return null;
  }

  const target = normalized as LandingTarget;
  const content = TARGET_LANDING_CONTENT[target];
  return {
    target,
    content,
  };
};
