import { Facebook, Linkedin, MessageCircle, Twitter } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

const shareNetworks = [
  {
    name: "Twitter",
    Icon: Twitter,
    buildUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  },
  {
    name: "LinkedIn",
    Icon: Linkedin,
    buildUrl: (url: string, title: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  },
  {
    name: "Facebook",
    Icon: Facebook,
    buildUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    name: "WhatsApp",
    Icon: MessageCircle,
    buildUrl: (url: string, title: string) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`
  }
];

export function ShareButtons({ title, url, className = "" }: ShareButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {shareNetworks.map(({ name, Icon, buildUrl }) => (
        <a
          key={name}
          href={buildUrl(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-600 shadow-sm transition hover:bg-emerald-50 dark:border-emerald-700 dark:bg-gray-900 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
          aria-label={`Share on ${name}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {name}
        </a>
      ))}
    </div>
  );
}
