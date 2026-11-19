# BeamPoint BP-1 site v4

Static site, no build step. Open index.html, or run `python3 -m http.server` in this folder.
Modes: light (default), dark, auto. Switch in the header; saved in this browser (bp-mode). The hero and the demo screen stay dark in both modes.

Pages: index.html (Device), business.html (Business), project.html (Project), 404.html. A chip bar lists each page's sections.

Tools that serve the project objectives
- Interactive demo (scan, rank, dial, rising tone, lock and log, CSV export): objectives 1, 3, 4.
- Bearing planner (site and tower coordinates to distance, bearing, elevation; use my location): objective 2.
- Pilot tracker (manual vs BP-1 minutes, correct tower, scoreboard vs the 20 min, 30% and 85% targets, CSV export): objective 5.
- ROI calculator, break-even calculator, pricing, dashboard preview: objective 6.

Input and error handling
- js/validate.js: shared field checks (number ranges, whole numbers, text length, Ugandan phone numbers), inline errors with aria-invalid, toasts, CSV export that blocks spreadsheet formula injection, global error and offline notices.
- Every input checks before it calculates or saves. Storage, audio, clipboard and location failures show a message instead of breaking.

Files
- js/data.js all text and numbers (including footer). js/art.js pictures. js/render.js header, footer, cards.
- js/theme.js modes. js/demo.js, planner.js, tracker.js, tools.js. js/store.js localStorage. js/motion.js scroll effects.
- css/base.css (light and dark tokens), components.css, motion.css (transitions), features.css.

Saved in the visitor's browser only: bp-jobs, bp-leads, bp-pilot, bp-mode. There is no server.

Open issues
1. Survey bars are labelled ILLUSTRATIVE SAMPLE; the proposal text still says responses were received. Relabel or replace with real data.
2. Dashboard numbers, towers and the 5 tracker examples are sample data. Delete the examples before logging real jobs.
3. Proposal: Appendix B heading missing, Appendix C figures are captions only, check unit contribution 773,000 vs 800,000 and the 70 minute baseline.
