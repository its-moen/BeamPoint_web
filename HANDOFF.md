# BeamPoint BP-1 site handoff

Three pages (nav): index.html (Device), business.html (Business), project.html (Project). Each page has a chip bar for its inner sections.

Files
- js/data.js: all text and numbers. Edit here first.
- js/art.js: SVG illustrations (hero scene, device screen, icons).
- js/render.js: builds header, footer, chips and cards from data.
- js/motion.js: reveal, counters, parallax, horizontal pinned scroll, scroll morph of the device, savings calculator.
- css/base.css, components.css, motion.css: theme, parts, animation. Dark teal #071619, accent #2fd0c2, amber #f5b84b.

Motion: page transitions use the View Transitions API (Chromium), other browsers just load normally. prefers-reduced-motion is respected.
Run: open index.html, or `python3 -m http.server` in this folder.

Open issues
1. Survey data in the proposal is a teaching sample but the text says responses were received. Relabel or replace with real data. The site shows no survey stats on purpose.
2. Proposal: Appendix B heading missing, Appendix C figures are captions only, check unit contribution 773,000 vs 800,000 and the 70 minute baseline.
3. Add real photos later by dropping files in an img/ folder and using <img> in the pages.
