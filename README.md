# Crown Executive Transportation — Website

A single-page marketing site for Crown Executive Transportation. Plain HTML/CSS/JS — no build step, no dependencies. Open `index.html` in a browser to preview, or upload the whole folder to any web host.

## Folder structure

```
crown-executive-transportation/
├── index.html          All page content/markup
├── css/
│   └── style.css       All styles
├── js/
│   └── main.js         Mobile nav, scroll reveal, testimonial carousel,
│                        the pickup date/time picker, the call popover,
│                        and the quote form
└── images/
    ├── suburban.jpg
    ├── escalade.jpg
    ├── navigator.jpg
    └── expedition.jpg
```

## Before you launch

**1. Quote form doesn't send anywhere yet.** Right now, submitting the form just shows the "Request Received" message in the browser — it doesn't email or store anything. To make it functional, the easiest options are:
   - [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com) — add a few lines to `js/main.js`, no backend needed
   - Your own backend endpoint, if you have one

**2. Phone number and email.** Search `index.html` for `3475479667` and `hashimpollob@gmail.com` to find every place they appear (header, hero, contact section, footer, floating button, the call popover) and swap in your final numbers/address.

**3. Fleet pricing.** The fleet cards don't show rates yet. Open `index.html`, find `class="fleet-card-body"`, and add a price line near the "Get a Free Quote" button once you've settled on rates.

**4. Testimonials are placeholders.** Marked with a small disclaimer on the page itself — swap in real client reviews before launch, or remove the section.

**5. Social links** in the footer (Instagram/Facebook/LinkedIn icons) currently point to `#`. Update with your real profile URLs.

## Editing tips

- All colors/fonts are defined as CSS variables at the top of `css/style.css` (look for `:root`) — change the brass/gold or background tones there and it updates everywhere.
- Section order on the page: Hero → Services → Why Choose Us → Fleet → Service Areas → Testimonials → Quote Form → Contact → Footer. Each is a `<section id="...">` in `index.html`, so you can reorder by moving whole sections.
- The fleet vehicle photos are sized/cropped consistently — if you swap in new vehicle photos, similar lighting (dark background, side or 3/4 angle) will match the existing set best.

## Hosting

Any static host works since there's no server-side code: Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a plain shared-hosting account all support drag-and-drop of this folder as-is.
