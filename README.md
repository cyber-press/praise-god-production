# Praise God Productions PWA

Launch-hardened mobile and tablet-first web app for Praise God Productions.

## Current release

**V4.1** · production URL: `https://praise-god-productions.press-amadu.chatgpt.site/`

## What is included

- Five true app screens: Home, Events, Submit, Media, and Connect
- Animated tab navigation with hash deep links
- Rotating premium hero messaging
- Production category explorer
- Upcoming-event cards with non-fabricated TBA states
- Artist submission workflow with native form validation
- Media gallery and preview testimonial carousel
- Install-to-home-screen handling for Chromium and iOS guidance
- PWA manifest with shortcuts, categories, language, and tablet-friendly orientation
- Splash transition, service worker, offline banner, and branded offline page
- Embedded optimized flyer and QR campaign assets
- Click-to-call, click-to-email, artist submission, and inquiry email flows
- WCAG-focused keyboard states, reduced-motion support, 44px touch targets, and iOS safe-area handling
- Desktop behavior that keeps the 1024px tablet app centered instead of introducing a desktop layout

## Scripts

```bash
npm run dev
npm run build
npm start
```

`npm run build` creates a deployable `dist/` folder.

## Launch verification

Before promoting a release:

1. Run `npm run build`.
2. Test Home, Events, Submit, Media, and Connect on phone and tablet.
3. Verify Android/Chromium Install App and iPhone/iPad Add to Home Screen.
4. Test offline fallback after the service worker has cached the app shell.
5. Verify form validation and mailto handoff.
6. Replace preview testimonial copy only with approved real testimonials.

## Contact

- Phone: +1 805-500-6860
- Email: PraiseGodProduction101@gmail.com
