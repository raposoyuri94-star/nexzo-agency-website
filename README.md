# Nexzo

A responsive React website for an independent website design and development agency, built with Vite, React, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Included

- Custom Nexzo wordmark and favicon.
- Three original, clearly labeled concept projects with detailed project dialogs.
- Filterable portfolio, services, studio story, process, and accessible FAQs.
- Mobile navigation, keyboard-accessible native dialogs, and reduced-motion support.
- Project brief form with browser-local drafts and a downloadable text file.
- Editable privacy information and a control to clear stored drafts.

## Contact configuration

Copy `.env.example` to `.env` and set `VITE_CONTACT_EMAIL` to the studio's actual email address. Rebuild after changing the value. With an address configured, the form opens the visitor's email application with their project brief; the visitor sends the email themselves. Without an address, the form downloads a brief and clearly states that nothing has been submitted. There is no submission backend.

The budget choices are prospective client budget ranges, not published agency prices. Portfolio work is illustrative; no client endorsements, testimonials, or performance claims are implied.

## Images and fonts

Photographs are bundled locally in `public/images`:

- Architecture: https://images.unsplash.com/photo-1600607687939-ce8a6c25118c
- Mountains: https://images.unsplash.com/photo-1464822759023-fed622ff2c3b
- Coffee: https://images.unsplash.com/photo-1447933601403-0c6688de566e
- Workspace: https://images.unsplash.com/photo-1497366754035-f200968a6e72

The workspace image illustrates the studio's creative atmosphere; it is not represented as an actual Nexzo office. Manrope, DM Sans, and Kalam load from Google Fonts, with system fallbacks. The portfolio brand identities and website mockups are made in HTML/CSS.
