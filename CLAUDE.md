# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing site for Crown Executive Transportation, a luxury black car/SUV service. Plain HTML/CSS/JS — no build step, no package manager, no dependencies.

## Commands

There is no build, lint, or test tooling in this repo. To preview changes, open `index.html` directly in a browser (or serve the folder with any static file server). Deployment is drag-and-drop of the whole folder to a static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.) — there is no server-side code.

## Architecture

- `index.html` — all page markup, in section order: Hero → Services → Why Choose Us → Fleet → Service Areas → Testimonials → Quote Form → Contact → Footer, each as a `<section id="...">`. Also contains the pickup date/time picker markup and the call popover markup (both hidden overlays toggled by JS), and a JSON-LD `LimousineService` schema block in `<head>`.
- `css/style.css` — all styles. Colors/fonts are defined as CSS variables under `:root` at the top of the file; theme changes (brass/gold, background tones) should go there.
- `js/main.js` — vanilla JS, no modules/bundler, loaded as a single script at the end of `index.html`. Handles: sticky header, mobile nav toggle, scroll-reveal via `IntersectionObserver`, the testimonial carousel, the custom pickup date/time picker (calendar + clock-face time selector), the quote form submission, and the "direct call" popover that intercepts `tel:` links.
- `images/` — fleet vehicle photos (`suburban.jpg`, `escalade.jpg`, `navigator.jpg`, `expedition.jpg`), shot with consistent dark-background/side-angle lighting.
- `robots.txt`, `sitemap.xml` — at repo root for SEO crawling.

### Quote form submission

The quote form posts to Formspree via `fetch` — the endpoint is the `FORM_ENDPOINT` constant near the top of the "Send quote request via Formspree" section in `js/main.js`. On success it swaps in `#thanksPanel` and fires a Google Ads conversion event (`gtag('event', 'conversion', ...)`); the gtag snippet and conversion ID live in `index.html`'s `<head>`. There is no backend in this repo.

### Content that still needs real values before launch

- Phone (`(747)363 -5708`) and email (`hashimpollob@gmail.com` / `info@crownexecutivetransportation.com`) appear in multiple places in `index.html` (header, hero, contact, footer, floating buttons, call popover) — all instances need to change together if these are updated.
- Fleet cards (`.fleet-card-body`) have no pricing yet.
- Testimonials section (`#testimonials`) uses placeholder reviews, flagged with an on-page disclaimer.
- Footer social links (Instagram/Facebook/LinkedIn) point to `#`.

## Git workflow

- Never commit directly to `main`/`master`. Always create a new branch off `main` first, using a `feature/x` or `fix/x` naming convention.
- Ask before pushing to remote, force-pushing, rebasing, deleting branches, or merging.
- Ask before modifying CI/CD config, `.env` files, secrets, or dependency versions.
- Ask before deleting files or running destructive commands.
- Before proposing a push, run any available tests/lint and show the results; show a diff or file-list summary of changes before pushing (not just before merging).
