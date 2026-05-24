
# Layer 1 Ecosystem Gateway Upgrade

Keep all existing Supabase auth logic (signUp / signInWithPassword / onAuthStateChange / redirect to `/`), profiles table, and `handle_new_user` trigger intact. This is a visual + feature expansion only.

---

## 1. Split-Screen Auth Portal (`src/routes/auth.tsx`)

Rewrite the layout, preserve all handlers/state.

```text
┌──────────────────────┬──────────────────────┐
│  LEFT (auth panel)   │  RIGHT (ecosystem)   │
│  logo + headline     │  Global Network      │
│  signup/login form   │  social cards grid   │
│  compliance footer   │  cross-border strip  │
└──────────────────────┴──────────────────────┘
```

- Mobile (<lg): right panel collapses below; on very small screens it becomes a compact horizontal scroll strip.
- Left: existing form (Full Name, Email, Country, Role, Password, Sign Up / Login toggle) + new "Forgot password?" link.
- Add animated particle background (lightweight canvas, 40–60 nodes with connection lines) behind whole page.
- Gold radial sweep + animated grid retained.

## 2. Ecosystem Communication Panel (new component `src/components/auth/EcosystemPanel.tsx`)

- Headline "Global Ecosystem Network" + subtext.
- 14 social cards (YouTube, Discord, X, Reddit, Linktree, GitHub, TikTok, Instagram, Calendly, Facebook, Telegram, LinkedIn, Medium, WhatsApp Channel) in a responsive 3-col grid.
- Per-card: institutional icon (lucide where available, inline SVG for X/TikTok/Discord/Reddit/Telegram/WhatsApp/Medium/Linktree), platform name, handle, "LIVE" pulse dot, animated gold gradient border on hover, glow blur, ecosystem pulse ring.
- SVG layer with animated connection lines + floating particle nodes between cards (framer-motion).
- Bottom strip: "Cross-Border Institutional Communication Infrastructure" + Malaysia • Dubai • Switzerland • Hong Kong • London with status dots.

## 3. Forgot Password Flow

- Add "Forgot password?" link on auth form → opens inline reset mode that calls:
  `supabase.auth.resetPasswordForEmail(email, { redirectTo: ${origin}/reset-password })`
- New route `src/routes/reset-password.tsx` (public): detects `type=recovery` hash, form to set new password via `supabase.auth.updateUser({ password })`, then redirect to `/`.

## 4. Email Verification

- Turn OFF `auto_confirm_email` (currently true) via `configure_auth` so Supabase sends verification mail.
- After signup, show "Check your email to verify" state instead of waiting for session.
- Existing `emailRedirectTo: window.location.origin` already wired.

## 5. Role-Based Access

DB migration:
- Create `app_role` enum: `admin`, `institution`, `investor`.
- Create `user_roles` table (`user_id`, `role`, unique pair) with RLS.
- Create `has_role(_user_id, _role)` SECURITY DEFINER function.
- Update `handle_new_user` to also insert default `'investor'` role into `user_roles`.
- Keep `profiles.role` (free-text role label from form) for display; enum role governs access.

Frontend:
- New hook `src/hooks/useUserRole.ts` → fetches role from `user_roles`.
- Wrap `/` index to check role; show admin-only sections conditionally.

## 6. Profile Edit Page (`src/routes/profile.tsx`)

- Protected route (redirect to `/auth` if no session).
- Loads from `profiles` table for current user.
- Editable: full_name, country, role (display label), with disabled email.
- Save via `supabase.from('profiles').update().eq('id', user.id)`.
- Institutional card UI consistent with Layer 1; "Back to Infrastructure" link.
- Add profile link in Navbar next to logout button.

---

## Technical notes

- Files created: `src/components/auth/EcosystemPanel.tsx`, `src/components/auth/ParticleField.tsx`, `src/routes/reset-password.tsx`, `src/routes/profile.tsx`, `src/hooks/useUserRole.ts`.
- Files edited: `src/routes/auth.tsx`, `src/components/sections/Navbar.tsx`, `src/styles.css` (add ecosystem-pulse, gold-border-sweep keyframes).
- Migrations: `app_role` enum, `user_roles` table + RLS + `has_role`, update `handle_new_user`.
- Auth config: `auto_confirm_email: false`, keep HIBP on.
- No changes to existing signup/login submit logic, redirect to `/`, or profiles columns.
