import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  HeartPulse,
  MessageSquare,
  Scissors,
  ShieldCheck,
  SmilePlus,
  Stethoscope,
  Syringe,
  WandSparkles
} from "lucide-react";

export type LandingTarget = "barber" | "doctor" | "dentist";

interface HeroContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  bulletPoints: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

interface StatHighlight {
  label: string;
  value: string;
  description: string;
}

interface FeatureHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WorkflowStep {
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface CallToAction {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

interface SeoCopy {
  title: string;
  description: string;
}

export interface TargetLandingContent {
  hero: HeroContent;
  stats: StatHighlight[];
  features: FeatureHighlight[];
  workflow: WorkflowStep[];
  testimonials: Testimonial[];
  cta: CallToAction;
  seo: SeoCopy;
}

const sharedMailTo = (subject: string, body: string) =>
  `mailto:info@asyncz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const TARGET_LANDING_CONTENT: Record<LandingTarget, TargetLandingContent> = {
  barber: {
    hero: {
      eyebrow: "For barbershops & grooming studios",
      title: "Keep every chair booked with",
      highlight: "AI scheduling for barbers",
      description:
        "asyncz automates walk-ins, recurring appointments, and staff scheduling so your barbers can focus on perfect fades and client experience.",
      bulletPoints: [
        "Smart queueing for walk-ins and VIP clients",
        "Automatic WhatsApp and SMS reminders",
        "Upsell add-ons and memberships during booking"
      ],
      primaryCtaLabel: "Book a barber demo",
      primaryCtaHref: sharedMailTo(
        "asyncz demo for barbers",
        "Hi asyncz team,%0A%0AI'm interested in asyncz for our barbershop. Can we schedule a quick walkthrough tailored to grooming businesses?%0A%0AThanks!"
      ),
      secondaryCtaLabel: "See the workflow",
      secondaryCtaHref: "#workflow"
    },
    stats: [
      {
        label: "Fewer no-shows",
        value: "-35%",
        description: "Automated confirmations and payment rules keep every appointment on track."
      },
      {
        label: "More chair time",
        value: "+22%",
        description: "AI waitlists fill last-minute gaps with clients who match the right barber."
      },
      {
        label: "Team efficiency",
        value: "3h saved",
        description: "Eliminate manual scheduling across stylists, rooms, and services each week."
      }
    ],
    features: [
      {
        icon: Scissors,
        title: "Barber-first service menus",
        description: "Bundle cuts, color, grooming, and retail add-ons with flexible pricing and upsells."
      },
      {
        icon: CalendarCheck,
        title: "AI booking concierge",
        description: "Let clients self-book 24/7 while asyncz routes services to the right barber and chair."
      },
      {
        icon: MessageSquare,
        title: "Two-way client messaging",
        description: "Manage WhatsApp, SMS, and email reminders from one inbox to reduce no-shows."
      },
      {
        icon: WandSparkles,
        title: "Loyalty and memberships",
        description: "Reward repeat visits with automated memberships, pre-paid packages, and gift cards."
      }
    ],
    workflow: [
      {
        title: "Launch your booking hub",
        description: "Publish a branded booking site or embed links across Instagram, Google, and walk-in kiosks."
      },
      {
        title: "Customize staff & chairs",
        description: "Sync barber schedules, chair availability, and service durations in minutes."
      },
      {
        title: "Automate reminders",
        description: "asyncz handles confirmations, reschedules, and upsell prompts over WhatsApp and SMS."
      },
      {
        title: "Track performance",
        description: "See revenue per chair, top-selling services, and retention across every barber."
      }
    ],
    testimonials: [
      {
        quote:
          "Before asyncz we manually juggled bookings from Instagram DMs, WhatsApp, and walk-ins. Now clients pick a barber online and we stay fully booked without the chaos.",
        author: "Luis Fernández",
        role: "Owner, Fade Society Studio"
      },
      {
        quote:
          "The AI waitlist alone pays for asyncz. Empty slots get filled instantly and our barbers never wonder who is coming next.",
        author: "Samantha Brooks",
        role: "General Manager, MetroGroom"
      }
    ],
    cta: {
      title: "Power your barbershop with asyncz",
      description: "See how our AI scheduling stack increases rebookings, retail sales, and loyalty for grooming businesses.",
      buttonLabel: "Talk to an expert",
      buttonHref: sharedMailTo(
        "asyncz barber follow-up",
        "Hi asyncz team,%0A%0AWe'd like to explore asyncz for our barbershop and discuss pricing. Please contact me with the next steps.%0A%0ABest regards,"
      )
    },
    seo: {
      title: "asyncz for Barbershops | AI Scheduling for Grooming Businesses",
      description:
        "Transform your barbershop operations with asyncz. Automate bookings, waitlists, and loyalty programs with AI built for grooming teams."
    }
  },
  doctor: {
    hero: {
      eyebrow: "For clinics & medical practices",
      title: "Deliver patient-first care with",
      highlight: "AI scheduling for doctors",
      description:
        "asyncz orchestrates multi-provider calendars, triage rules, and patient communications so your care teams stay focused on outcomes, not admin.",
      bulletPoints: [
        "Intake forms and triage workflows",
        "HIPAA-ready communications and reminders",
        "Sync in-person, telehealth, and procedure schedules"
      ],
      primaryCtaLabel: "Schedule a clinic demo",
      primaryCtaHref: sharedMailTo(
        "asyncz demo for medical clinics",
        "Hello asyncz,%0A%0AWe're evaluating scheduling platforms for our clinic. Please arrange a personalized demo showcasing medical workflows.%0A%0AThank you!"
      ),
      secondaryCtaLabel: "Explore the workflow",
      secondaryCtaHref: "#workflow"
    },
    stats: [
      {
        label: "Patient wait times",
        value: "-28%",
        description: "Route appointments by specialty, insurance, and urgency without manual coordination."
      },
      {
        label: "Staff productivity",
        value: "+4.5h",
        description: "Automate confirmations, pre-visit instructions, and follow-ups across every provider."
      },
      {
        label: "Visit completion",
        value: "+18%",
        description: "Automated reminders and digital check-ins keep patients prepared and on time."
      }
    ],
    features: [
      {
        icon: Stethoscope,
        title: "Multi-specialty scheduling",
        description: "Coordinate providers, rooms, and equipment with AI suggestions for optimal slot utilization."
      },
      {
        icon: ClipboardCheck,
        title: "Digital intake & consents",
        description: "Collect insurance, triage data, and forms before the visit with automated routing to the right team."
      },
      {
        icon: MessageSquare,
        title: "Secure patient messaging",
        description: "Deliver reminders, instructions, and follow-ups over encrypted channels that patients actually read."
      },
      {
        icon: ShieldCheck,
        title: "Compliance-ready controls",
        description: "Granular permissions, audit trails, and hosting options aligned with healthcare regulations."
      }
    ],
    workflow: [
      {
        title: "Design specialty workflows",
        description: "Configure appointment types, triage questionnaires, and routing rules for every provider."
      },
      {
        title: "Automate patient communications",
        description: "asyncz sends personalized reminders, pre-visit checklists, and lab follow-ups automatically."
      },
      {
        title: "Coordinate rooms & equipment",
        description: "Reserve procedure rooms, diagnostic devices, and support staff with a single calendar view."
      },
      {
        title: "Measure clinical impact",
        description: "Track utilization, patient satisfaction, and revenue indicators across the entire practice."
      }
    ],
    testimonials: [
      {
        quote:
          "Our providers juggled three different calendars before asyncz. Now triage rules route patients instantly and every visit starts prepared.",
        author: "Dr. Ana Patel",
        role: "Medical Director, Urban Health Clinic"
      },
      {
        quote:
          "asyncz automates intake, reminders, and post-visit care. We reclaimed hours weekly that now go back to patient support.",
        author: "Morgan Lee",
        role: "Operations Lead, Northside Family Practice"
      }
    ],
    cta: {
      title: "Run a smarter clinic with asyncz",
      description: "Modernize scheduling, intake, and follow-up care with AI workflows built for medical teams.",
      buttonLabel: "Request pricing",
      buttonHref: sharedMailTo(
        "asyncz for doctors",
        "Hello asyncz,%0A%0APlease share pricing and onboarding details for using asyncz in our medical practice.%0A%0ABest,"
      )
    },
    seo: {
      title: "asyncz for Medical Clinics | AI Scheduling for Doctors",
      description:
        "Upgrade your clinic with asyncz. Coordinate providers, automate patient communications, and reduce wait times with healthcare-ready scheduling."
    }
  },
  dentist: {
    hero: {
      eyebrow: "For dental practices & orthodontists",
      title: "Deliver a five-star patient journey with",
      highlight: "AI scheduling for dentists",
      description:
        "asyncz streamlines chair assignments, hygiene recalls, and treatment plans so your team can focus on smiles, not scheduling spreadsheets.",
      bulletPoints: [
        "Recall campaigns that rebook automatically",
        "Chair-level scheduling for doctors and hygienists",
        "Pre-visit forms, x-ray uploads, and insurance capture"
      ],
      primaryCtaLabel: "See the dental demo",
      primaryCtaHref: sharedMailTo(
        "asyncz demo for dental practices",
        "Hi asyncz,%0A%0AWe're interested in asyncz for our dental office. Could we schedule a tailored walkthrough for dental workflows?%0A%0AThanks!"
      ),
      secondaryCtaLabel: "Review the workflow",
      secondaryCtaHref: "#workflow"
    },
    stats: [
      {
        label: "Recall completion",
        value: "+31%",
        description: "Automated hygiene reminders and membership offers bring patients back on schedule."
      },
      {
        label: "Front desk workload",
        value: "-45%",
        description: "Self-serve booking and digital forms remove repetitive intake calls and paperwork."
      },
      {
        label: "Treatment acceptance",
        value: "+19%",
        description: "Present plans with automated follow-ups, financing options, and nudges to accept online."
      }
    ],
    features: [
      {
        icon: SmilePlus,
        title: "Chair optimization",
        description: "Balance dentist and hygienist calendars with visibility into operatory availability."
      },
      {
        icon: Syringe,
        title: "Procedure-aware scheduling",
        description: "Plan multi-step treatments, lab work, and imaging with automated buffer and prep times."
      },
      {
        icon: ClipboardList,
        title: "Digital forms & insurance",
        description: "Collect medical history, consent signatures, and insurance details before every visit."
      },
      {
        icon: HeartPulse,
        title: "Automated recalls",
        description: "Trigger SMS, WhatsApp, and email campaigns that rebook hygiene visits and cosmetic follow-ups."
      }
    ],
    workflow: [
      {
        title: "Configure providers & operatories",
        description: "Map dentists, hygienists, and chairs with service-specific availability and handoffs."
      },
      {
        title: "Launch smart booking",
        description: "Offer personalized booking links for new patients, hygiene recalls, and specialist procedures."
      },
      {
        title: "Automate paperwork",
        description: "asyncz requests forms, x-rays, and insurance uploads so the front desk can focus on patient care."
      },
      {
        title: "Grow lifetime value",
        description: "Send treatment plan reminders, membership offers, and payment prompts automatically."
      }
    ],
    testimonials: [
      {
        quote:
          "asyncz keeps our dentists, hygienists, and specialists aligned. Patients love the reminders and we love the time we get back.",
        author: "Dr. Evelyn Carter",
        role: "Founder, BrightSide Dental"
      },
      {
        quote:
          "We rebook hygiene visits without chasing patients. asyncz handles recalls and treatment plan follow-ups automatically.",
        author: "Michael Chen",
        role: "Operations Manager, Pacific Smiles Group"
      }
    ],
    cta: {
      title: "Give every patient a seamless experience",
      description: "Combine bookings, recalls, and payment follow-ups in one AI-powered dental platform.",
      buttonLabel: "Connect with sales",
      buttonHref: sharedMailTo(
        "asyncz for dentists",
        "Hello asyncz,%0A%0AWe'd like to discuss how asyncz can support our dental practice and next steps to get started.%0A%0ARegards,"
      )
    },
    seo: {
      title: "asyncz for Dentists | AI Scheduling for Dental Practices",
      description:
        "Automate recalls, intake, and treatment scheduling with asyncz. Purpose-built AI workflows that keep dental teams productive and patients delighted."
    }
  }
};
