# Agent Notes

This repository contains the Praise God Productions mobile/tablet PWA.

## Product rules

- Keep the experience screen-based, not a long-scroll marketing page.
- Preserve the five main screens: Home, Events, Submit, Media, and Connect.
- Preserve install support, `manifest.webmanifest`, `sw.js`, `offline.html`, splash behavior, icons, and the embedded flyer/QR assets in `src/assets.js`.
- Mobile and tablet are the intentional product layouts. Desktop widths should show the centered tablet app shell, capped at 1024 CSS px.
- Preserve iPhone/iPad safe-area handling and touch targets of at least 44x44 CSS px.
- Maintain WCAG 2.2 AA contrast, keyboard focus visibility, form labels/validation, and `prefers-reduced-motion` support.
- Do not invent confirmed event dates, venues, or real testimonials without approved source material.
- Keep preview testimonials explicitly labeled as preview copy until approved replacements are supplied.
- Keep the production URL aligned to `https://praise-god-productions.press-amadu.chatgpt.site/` unless the public domain changes.

## Verification

Run:

```bash
npm run build
```

For local preview:

```bash
npm run dev
```

Before completing a meaningful release, verify the manifest JSON, service-worker JavaScript, mobile navigation, install flow, offline fallback, and form validation.
