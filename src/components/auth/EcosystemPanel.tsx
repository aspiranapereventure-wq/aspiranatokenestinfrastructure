import { motion } from "framer-motion";
import { Youtube, Github, Instagram, Linkedin, Calendar, Facebook, Send, MessageCircle, Link as LinkIcon, BookOpen } from "lucide-react";
import ParticleField from "./ParticleField";

type Platform = {
  name: string;
  handle: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  hue: string;
};

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.93l-5.43-7.1L4.4 22H1.14l8.04-9.19L1 2h7.1l4.9 6.49L18.244 2Zm-1.21 18h1.93L7.06 4H5.04l12 16Z" />
  </svg>
);
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M16 3v3.2a4.8 4.8 0 0 0 4.8 4.8V14a8 8 0 0 1-4.8-1.6V17a5 5 0 1 1-5-5v3.2a1.8 1.8 0 1 0 1.8 1.8V3H16Z"/>
  </svg>
);
const RedditIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M22 12.1c0-1.2-1-2.2-2.2-2.2-.6 0-1.1.2-1.5.6-1.5-1-3.5-1.7-5.7-1.8l1-4.4 3.1.7c0 .8.7 1.4 1.5 1.4.8 0 1.5-.7 1.5-1.5S19 3.4 18.2 3.4c-.6 0-1.1.3-1.3.8L13.4 3.5c-.2 0-.4.1-.4.3l-1.1 4.9c-2.2.1-4.2.7-5.7 1.8-.4-.4-1-.6-1.6-.6C3.3 9.9 2.3 10.9 2.3 12.1c0 .9.5 1.6 1.3 2-.1.3-.1.7-.1 1 0 3.4 3.9 6.2 8.6 6.2s8.6-2.8 8.6-6.2c0-.3 0-.6-.1-1 .8-.3 1.4-1.1 1.4-2zM7.4 13.6c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5zm8 4c-1 1-2.5 1.4-3.4 1.4-1 0-2.5-.4-3.4-1.4-.2-.2-.2-.5 0-.6.2-.2.5-.2.6 0 .6.6 1.9 1 2.8 1s2.2-.4 2.8-1c.2-.2.5-.2.6 0 .2.1.2.4 0 .6zm-.5-2.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
  </svg>
);
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M20 4.5A17 17 0 0 0 15.7 3l-.2.4a13 13 0 0 0-4.9 0L10.3 3A17 17 0 0 0 6 4.5C3.1 8.7 2.3 12.8 2.7 16.8a17 17 0 0 0 5.2 2.6l1-1.6a11 11 0 0 1-1.7-.8l.4-.3a12 12 0 0 0 10.7 0l.4.3a11 11 0 0 1-1.7.8l1 1.6a17 17 0 0 0 5.2-2.6c.5-4.7-.7-8.8-3.5-12.3zM9.5 14.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm5 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/>
  </svg>
);
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm5.6 14.3c-.2.7-1.2 1.3-1.8 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.3-5.1-4.5-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.2c.1.2.2.4 0 .7-.1.2-.2.3-.4.5l-.4.4c-.1.1-.2.3-.1.5.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6 0l.7-.9c.2-.3.5-.2.7-.1l1.9 1c.3.1.5.2.6.4.1.1.1.8-.1 1.4z"/>
  </svg>
);

const PLATFORMS: Platform[] = [
  { name: "YouTube", handle: "@aspiranatokenest", href: "https://youtube.com/@aspiranatokenest?si=-Gqg7WvFUo0MRNCP", Icon: Youtube, hue: "#FF0033" },
  { name: "Discord", handle: "discord.gg", href: "https://discord.gg/aMxJhJ2UW", Icon: DiscordIcon, hue: "#5865F2" },
  { name: "X", handle: "@aspirana98548", href: "https://x.com/aspirana98548", Icon: XIcon, hue: "#FFFFFF" },
  { name: "Reddit", handle: "u/AspiranaTokenets", href: "https://www.reddit.com/u/AspiranaTokenets/s/mijgOZoLgw", Icon: RedditIcon, hue: "#FF4500" },
  { name: "Linktree", handle: "aspiranapereventure", href: "https://linktr.ee/aspiranapereventure", Icon: LinkIcon, hue: "#39E09B" },
  { name: "GitHub", handle: "aspiranapereventure-wq", href: "https://github.com/aspiranapereventure-wq", Icon: Github, hue: "#FFFFFF" },
  { name: "TikTok", handle: "@aspiranatokenest", href: "https://www.tiktok.com/@aspiranatokenest?_r=1&_t=ZS-96A23w78BXj", Icon: TikTokIcon, hue: "#69C9D0" },
  { name: "Instagram", handle: "@aspiranatokenest", href: "https://www.instagram.com/aspiranatokenest?igsh=MW45dXBodjcyY2l0cw==", Icon: Instagram, hue: "#E1306C" },
  { name: "Calendly", handle: "Book 30min", href: "https://calendly.com/aspiranapereventure/30min", Icon: Calendar, hue: "#006BFF" },
  { name: "Facebook", handle: "Aspirana", href: "https://www.facebook.com/share/1Dm5esiNds/", Icon: Facebook, hue: "#1877F2" },
  { name: "Telegram", handle: "@AspiranaTokenest", href: "https://t.me/AspiranaTokenest", Icon: Send, hue: "#229ED9" },
  { name: "LinkedIn", handle: "Aspirana Tokenest", href: "https://www.linkedin.com/in/aspirana-tokenets-ab9619408?utm_source=share_via&utm_content=profile&utm_medium=member_android", Icon: Linkedin, hue: "#0A66C2" },
  { name: "Medium", handle: "@aspiranapereventure", href: "https://medium.com/@aspiranapereventure", Icon: BookOpen, hue: "#FFFFFF" },
  { name: "WhatsApp", handle: "Channel", href: "https://whatsapp.com/channel/0029Vb84aJe7tkj18yDxhd0P", Icon: WhatsAppIcon, hue: "#25D366" },
];

const NODES = ["Malaysia", "Dubai", "Switzerland", "Hong Kong", "London"];

export default function EcosystemPanel() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden p-8 lg:p-10">
      <ParticleField density={45} />
      <div
        className="pointer-events-none absolute inset-0 institutional-grid-live opacity-30"
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/3 h-[420px] w-[420px] rounded-full bg-[var(--gold)]/8 blur-[140px]"
      />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--gold-line)] bg-[var(--surface)]/60 px-3 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-green)] animate-pulse-dot" />
          <span className="font-mono-tab text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Network · Online · 14 Channels
          </span>
        </div>
        <h2 className="font-display text-3xl leading-tight text-[var(--text)] sm:text-4xl">
          Global Ecosystem <span className="italic text-gold">Network</span>
        </h2>
        <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
          Connected communication and institutional intelligence infrastructure.
        </p>
      </div>

      {/* Grid */}
      <div className="relative z-10 grid flex-1 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 xl:grid-cols-4">
        {PLATFORMS.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-lg border border-[var(--gold-line)] bg-[var(--surface)]/60 p-3 backdrop-blur-sm transition-colors hover:border-[var(--gold)]/60"
          >
            {/* gradient glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 30% 0%, ${p.hue}22, transparent 60%)`,
              }}
            />
            {/* sweep border */}
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--gold-line)] bg-[var(--bg-deep)] transition-colors group-hover:border-[var(--gold)]/40"
                style={{ color: p.hue }}
              >
                <p.Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold tracking-wide text-[var(--text)]">
                    {p.name}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[var(--status-green)] animate-pulse-dot" />
                </div>
                <div className="truncate font-mono-tab text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {p.handle}
                </div>
              </div>
            </div>

            {/* pulse ring */}
            <span className="pointer-events-none absolute bottom-2 right-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: p.hue }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: p.hue }} />
            </span>
          </motion.a>
        ))}
      </div>

      {/* Bottom cross-border strip */}
      <div className="relative z-10 mt-6 rounded-lg border border-[var(--gold-line)] bg-[var(--surface)]/70 p-4 backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono-tab text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Cross-Border Institutional Communication Infrastructure
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-3 w-3 text-[var(--gold)]" />
            <span className="font-mono-tab text-[10px] uppercase tracking-[0.18em] text-gold">
              SYNCED
            </span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {NODES.map((n, i) => (
            <div key={n} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-green)] animate-pulse-dot" style={{ animationDelay: `${i * 0.3}s` }} />
              <span className="text-xs font-medium text-[var(--text)]">{n}</span>
              {i < NODES.length - 1 && <span className="text-[var(--text-muted)]/40">·</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}