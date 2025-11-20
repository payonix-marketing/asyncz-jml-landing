import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Card, CardContent } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Label } from "src/components/ui/label";
import { MapPin, Phone, Mail, Clock, Building2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "src/context/LanguageContext";
import { Seo } from "src/components/Seo";
import {
  BUSINESS_HOURS,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE
} from "src/config/seo";
import { localBusinessSchema } from "src/config/schema";

const createContactSchema = (answer: number) =>
  z
    .object({
      name: z.string().trim().min(2, "Please enter your name"),
      email: z.string().trim().email("Enter a valid email"),
      company: z.string().trim().max(120).optional().or(z.literal("")),
      phone: z.string().trim().max(40).optional().or(z.literal("")),
      topic: z.string().trim().min(2, "Select a topic"),
      message: z.string().trim().min(20, "Please share more details"),
      mathChallenge: z.string().trim(),
      honeypot: z.string().optional().or(z.literal(""))
    })
    .superRefine((values, ctx) => {
      if (values.honeypot) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Spam detected", path: ["name"] });
      }
      if (parseInt(values.mathChallenge, 10) !== answer) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Answer is incorrect", path: ["mathChallenge"] });
      }
    });

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

export default function ContactPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const mathChallenge = useMemo(() => {
    const a = Math.floor(Math.random() * 6) + 2;
    const b = Math.floor(Math.random() * 5) + 1;
    return { a, b, answer: a + b };
  }, []);

  const contactSchema = useMemo(() => createContactSchema(mathChallenge.answer), [mathChallenge.answer]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      topic: "",
      message: "",
      mathChallenge: "",
      honeypot: ""
    }
  });

  const seoConfig = useMemo(
    () => ({
      title: t("contactPage.pageTitle"),
      description: t("contactPage.metaDescription"),
      path: "/contact",
      keywords: t("contactPage.keywords"),
      structuredData: localBusinessSchema
    }),
    [t]
  );

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setStatus("idle");
      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 800));
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Failed to submit contact form", error);
      setStatus("error");
    }
  });

  const topics = t("contactPage.topics");

  const securityQuestion = useMemo<string>(() => {
    const template = t("contactPage.form.securityQuestion");
    if (typeof template === "string") {
      return template.replace("{a}", String(mathChallenge.a)).replace("{b}", String(mathChallenge.b));
    }
    return `What is ${mathChallenge.a} + ${mathChallenge.b}?`;
  }, [mathChallenge.a, mathChallenge.b, t]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <Seo {...seoConfig} />
      <Header />
      <main className="pt-24 pb-20 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
            {t("contactPage.tagline")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t("contactPage.heroTitle")}</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("contactPage.heroSubtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Card className="border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-300">
                  {t("contactPage.formTitle")}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("contactPage.formSubtitle")}
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">{t("contactPage.form.name")}</Label>
                    <Input id="name" placeholder={t("contactPage.form.namePlaceholder")}
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">{t("contactPage.form.email")}</Label>
                    <Input id="email" type="email" placeholder={t("contactPage.form.emailPlaceholder")}
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="company">{t("contactPage.form.company")}</Label>
                    <Input id="company" placeholder={t("contactPage.form.companyPlaceholder")}
                      {...form.register("company")}
                    />
                    {form.formState.errors.company && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.company.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("contactPage.form.phone")}</Label>
                    <Input id="phone" placeholder={t("contactPage.form.phonePlaceholder")}
                      {...form.register("phone")}
                    />
                    {form.formState.errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="topic">{t("contactPage.form.topic")}</Label>
                  <select
                    id="topic"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
                    {...form.register("topic")}
                  >
                    <option value="">{t("contactPage.form.topicPlaceholder")}</option>
                    {Array.isArray(topics) &&
                      topics.map((topic: string) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                  </select>
                  {form.formState.errors.topic && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.topic.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">{t("contactPage.form.message")}</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={t("contactPage.form.messagePlaceholder")}
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="mathChallenge">{securityQuestion}</Label>
                    <Input id="mathChallenge" {...form.register("mathChallenge")}
                      placeholder={t("contactPage.form.securityPlaceholder")}
                    />
                    {form.formState.errors.mathChallenge && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.mathChallenge.message}</p>
                    )}
                  </div>
                  <div className="hidden">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" autoComplete="off" tabIndex={-1} {...form.register("honeypot")} />
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" className="brand-gradient text-white px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition">
                    {t("contactPage.form.submit")}
                  </Button>
                  {status === "success" && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      {t("contactPage.form.success")}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-500">{t("contactPage.form.error")}</p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-300">
                  {t("contactPage.infoTitle")}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-emerald-500" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">{CONTACT_ADDRESS.street}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {CONTACT_ADDRESS.city}, {CONTACT_ADDRESS.state} {CONTACT_ADDRESS.postalCode}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{CONTACT_ADDRESS.country}</p>
                    </div>
                  </div>
                  {/*<div className="flex items-start gap-3">*/}
                  {/*  <Phone className="mt-1 h-5 w-5 text-emerald-500" aria-hidden="true" />*/}
                  {/*  <a className="text-sm text-emerald-600 dark:text-emerald-300" href={`tel:${CONTACT_PHONE}`}>*/}
                  {/*    {CONTACT_PHONE}*/}
                  {/*  </a>*/}
                  {/*</div>*/}
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-emerald-500" aria-hidden="true" />
                    <a className="text-sm text-emerald-600 dark:text-emerald-300" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-emerald-200 bg-emerald-50 shadow-lg dark:border-emerald-900/40 dark:bg-emerald-950/40">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-200">
                  {t("contactPage.hoursTitle")}
                </h2>
                <ul className="space-y-2 text-sm text-emerald-900/90 dark:text-emerald-100">
                  {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                    <li key={day} className="flex items-center gap-2">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      <span className="capitalize">{t(`contactPage.days.${day}`)}:</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-300">
                  {t("contactPage.supportTitle")}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("contactPage.supportDescription")}
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    <span>{t("contactPage.supportItems.enterprise")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    <span>{t("contactPage.supportItems.email")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    <span>{t("contactPage.supportItems.training")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}