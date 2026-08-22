# Praise God Productions PWA · GitHub Launch Audit

Audit baseline: V4.1 launch-hardened mobile/tablet build.

## Repository audit summary

The GitHub repository used a lightweight static PWA architecture rather than the earlier Next.js source package. The architecture was preserved because it is dependency-light, already configured for static deployment, and still supports the intended screen-based PWA experience.

## Gaps found and patched

- Production URL metadata was incomplete; canonical and Open Graph URL now point to the live Praise God Productions site.
- Manifest was missing V4.1 language, direction, categories, shortcuts, display override, and tablet-friendly orientation behavior.
- Intentional tablet ceiling was 900px instead of 1024px.
- Service worker used an older cache name and cache-first navigation strategy; navigation is now network-first with offline fallback.
- There was no visible in-app offline status indicator.
- Safe-area handling did not cover all horizontal and bottom app surfaces.
- Production category tabs were below the 44px touch-target target.
- Form validation/status handling did not match the V4.1 hardening baseline.
- Contact workflow did not collect an email address.
- Dialogs lacked explicit Escape-key handling in app logic.
- Installed-state handling did not respond to the `appinstalled` event.
- Home screen was missing the V4.1 rotating hero, production explorer, vision module, and install card.
- Events lacked the V4.1 stacked experience presentation and first-notice CTA.
- Submit lacked progress/privacy guidance.
- Media lacked the expanded gallery and testimonial carousel.
- Repository instructions and release manifest were behind the launch-hardening baseline.

## Preserved safeguards

- Five-screen architecture: Home, Events, Submit, Media, Connect.
- Mobile/tablet-first product intent with a centered tablet shell on wider screens.
- No invented confirmed event dates or venues.
- Testimonials remain explicitly labeled as preview content until approved real quotes are supplied.
- Embedded flyer and QR assets remain local to the repository.
- Reduced-motion support remains enabled.

## Remaining physical-device verification

These checks require the deployed build on real devices:

1. Android Chrome/Chromium native Install App prompt.
2. iPhone/iPad Safari Add to Home Screen flow.
3. Installed icon and splash appearance.
4. Service-worker refresh/update after deployment.
5. Visual QA at 320, 375, 390, 430, 768, 820, and 1024 CSS px.
6. Tablet landscape behavior.
7. Offline navigation after the first successful online load.
8. Email handoff from both forms.

## Required build command

```bash
npm run build
```

The build should produce the deployable `dist/` directory.
