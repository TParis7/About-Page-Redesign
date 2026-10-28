(function() {
  /* ══════════════════════════════════════════════════════════════
     about-combined.js v1.0.14 — About page rebuild.
     v1.0.14 (Apr 17, 2026): added cache-buster `?v=20260417b` to the
     Orelia Lawdins-Trent team-card image so browsers + GitHub Pages CDN
     fetch the newly uploaded headshot instead of the cached prior file.
     v1.0.13 (Apr 17, 2026): (a) in "Knowledge & Industry Partners" row,
     replaced Sneakers to Scrubs logo with 3Advance logo; (b) removed
     duplicate 3Advance logo from "Media & Recognition" row.
     v1.0.12: mirror homepage footer exactly — About column order is now
     Our Story / Team / Annual Report / Press (Annual Report BEFORE Press).
     Bottom row rewritten as flex container with flex-wrap + centered +
     24px gap + 1px top divider, so desktop shows © and T&C inline with gap,
     and mobile wraps them to centered rows (matches homepage Footer V2).
     v1.0.11: footer cleanup — removed duplicate Donate (kept in Connect),
     added "Annual Report" link (GDrive PDF) to About column, rewrote bottom
     row to match homepage p3footerfix pattern. Replaced "Partner With Us"
     CTA button with "Annual Report 2025" pointing to same GDrive PDF.
     v1.0.10: added id="press" to Press section so /about/about#press anchors
     to it (used by the /about/in-the-press redirect).
     v1.0.9: hardened scrollToHash — scopes id lookup to injected #ab-root
     (legacy Webflow DOM may contain a duplicate #team), offsets fixed nav,
     retries after window.load for image-driven layout shifts.
     v1.0.8: (a) added .p3-nav / .p3-footer overrides (logo max-height 36px,
     mobile 2-col footer grid) mirroring hp-shared-sections.js since About page
     doesn't load that script; (b) added post-inject scrollToHash() so
     /about/about#team scrolls to Leadership after dynamic content is built.
     v1.0.7: added id="team" to Leadership section so footer "Team" link
     (/about/about#team) anchors to the visible Leadership Team in the redesign.
     Strategy: hide the page's legacy Webflow body content entirely, then
     inject the SAME #p3nav and .p3-footer HTML the homepage uses. Webflow's
     site-wide stylesheet already compiles .p3-nav and .p3-footer rules, so
     these elements render identically to the homepage with zero custom CSS.
     The companion script `p3hpshared` (hp-shared-sections.js) runs alongside
     to add the hamburger + scroll-darken behavior, just like on the homepage.
     Source HTML: tparis7/About-Page-Redesign/About/About/index.html
     Image assets: https://tparis7.github.io/About-Page-Redesign/About-Page-Assets/
     ══════════════════════════════════════════════════════════════ */

  // Guard against double execution (site-level + page-level script loading)
  if (document.getElementById('ab-root')) return;

  // ═══ 0. CANCEL WEBFLOW IX2 BODY ANIMATION ═══
  function cancelBodyAnimations() {
    if (document.body && document.body.getAnimations) {
      document.body.getAnimations().forEach(function(a) { a.cancel(); });
    }
    if (document.body) document.body.style.setProperty('opacity', '1', 'important');
  }
  cancelBodyAnimations();
  document.addEventListener('DOMContentLoaded', cancelBodyAnimations);
  window.addEventListener('load', cancelBodyAnimations);
  setTimeout(cancelBodyAnimations, 100);
  setTimeout(cancelBodyAnimations, 500);
  setTimeout(cancelBodyAnimations, 1500);

  // ═══ 1. ASSET BASE (GitHub Pages CDN) ═══
  var ASSETS = 'https://tparis7.github.io/About-Page-Redesign/About-Page-Assets/';
  // Webflow-hosted brand assets (re-used across all P3 pages, exact same files as homepage)
  var WF_NAV_LOGO = 'https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b02f65f0068e9fb16f0df1_P3%20Logo.svg';
  var WF_FOOTER_LOGO = 'https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b04a49d86c8d9ea145304a_p3-logo-horizontal.png';

  // ═══ 2. INJECT GLOBAL FONTS ═══
  if (!document.querySelector('link[data-ab-fonts]')) {
    var fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:wght@400..800&display=swap';
    fonts.setAttribute('data-ab-fonts', '1');
    document.head.appendChild(fonts);
  }

  // ═══ 3. INJECT CSS — copied verbatim from About/About/index.html (scoped to #ab-root) ═══
  var style = document.createElement('style');
  style.setAttribute('data-ab-css', '1');
  style.innerHTML = `
:root {
  --ab-crimson: #D93A3A; --ab-crimson-dark: #B82E2E;
  --ab-maroon: #4A1020; --ab-maroon-deep: #2e0614;
  --ab-warm-gray: #FAF7F4; --ab-warm-gray-2: #F0EBE5;
  --ab-dark: #111; --ab-light-text: #666;
  --ab-radius: 14px; --ab-radius-lg: 20px; --ab-radius-xl: 28px;
  --ab-shadow-card: 0 8px 32px rgba(0,0,0,0.06);
  --ab-transition: 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
body.ab-active { background: #fff; margin: 0; padding: 0; opacity: 1 !important; overflow-x: hidden; }
#ab-root *, #ab-root *::before, #ab-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
#ab-root { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; line-height: 1.6; -webkit-font-smoothing: antialiased; }
#ab-root img { max-width: 100%; display: block; box-shadow: none; background: transparent; border: 0; border-radius: 0; }
#ab-root a { text-decoration: none; color: inherit; }
#ab-root h1, #ab-root h2, #ab-root h3, #ab-root h4 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; }
#ab-root h1 { font-size: clamp(34px, 4.2vw, 52px); line-height: 1.15; font-weight: 700; }
#ab-root h2 { font-size: clamp(28px, 3.5vw, 44px); line-height: 1.2; letter-spacing: -0.01em; }
#ab-root h3 { font-size: 22px; line-height: 1.3; letter-spacing: -0.005em; }
#ab-root h4 { font-size: 18px; line-height: 1.4; }
#ab-root p  { font-size: 16px; line-height: 1.7; }
#ab-root html { scroll-behavior: smooth; }

/* NAV + FOOTER intentionally omitted — Webflow's native V2 Nav Light + Footer V2 components render directly. */

/* ─── Shared section helpers ─── */
#ab-root .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
#ab-root .section-tag { display: inline-block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 6px 16px; border-radius: 50px; background: rgba(217,58,58,0.08); color: var(--ab-crimson); margin-bottom: 16px; }
#ab-root .section-tag-light { display: inline-block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 6px 16px; border-radius: 50px; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); margin-bottom: 16px; }
#ab-root .section-header { text-align: center; margin-bottom: 36px; }
#ab-root .section-header p { color: var(--ab-light-text); max-width: 640px; margin: 12px auto 0; font-size: 17px; }
#ab-root .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
#ab-root .reveal.visible { opacity: 1; transform: translateY(0); }

/* ─── HERO ─── */
#ab-root .about-hero { position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center; background: linear-gradient(135deg, #1a0510 0%, var(--ab-maroon) 35%, #2a0a14 60%, #140510 100%); padding: 130px 32px 64px; }
#ab-root .about-hero-bg { position: absolute; inset: 0; z-index: 0; background-image: url('${ASSETS}group-shot.avif'); background-size: cover; background-position: center; opacity: 0.12; }
#ab-root .about-hero::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 40px; background: linear-gradient(to bottom, transparent, #fff); pointer-events: none; z-index: 1; }
#ab-root .about-hero-inner { max-width: 800px; position: relative; z-index: 2; }
#ab-root .about-hero h1 { color: #fff; margin-bottom: 16px; letter-spacing: -0.02em; }
#ab-root .about-hero h1 .highlight { color: var(--ab-crimson); }
#ab-root .about-hero p.sub { color: rgba(255,255,255,0.75); font-size: 18px; line-height: 1.7; max-width: 640px; margin: 0 auto; }

/* ─── FOUNDERS ─── */
#ab-root .founders { background: #fff; padding: 48px 0 40px; }
#ab-root .founders-inner { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
#ab-root .founders-text-block { text-align: center; max-width: 780px; margin: 0 auto 36px; }
#ab-root .founders-text-block h2 { margin-bottom: 14px; }
#ab-root .founders-text-block h2 .highlight { color: var(--ab-crimson); }
#ab-root .founders-text-block p { color: var(--ab-light-text); margin-bottom: 12px; }
#ab-root .founders-photos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 900px; margin: 0 auto; }
#ab-root .founder-photo { border-radius: var(--ab-radius-lg); overflow: hidden; aspect-ratio: 3/4; position: relative; box-shadow: var(--ab-shadow-card); transition: transform var(--ab-transition); }
#ab-root .founder-photo:hover { transform: translateY(-4px); }
#ab-root .founder-photo img { width: 100%; height: 100%; object-fit: cover; }
#ab-root .founder-photo .caption { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); padding: 24px 14px 14px; color: #fff; font-size: 13px; font-weight: 600; text-align: center; }
#ab-root .founder-photo .caption span { display: block; font-weight: 400; font-size: 11px; opacity: 0.8; margin-top: 2px; }

/* ─── TRACTION / STATS ─── */
#ab-root .traction { background: linear-gradient(135deg, var(--ab-maroon-deep) 0%, var(--ab-maroon) 100%); padding: 48px 0; }
#ab-root .traction .section-header h2 { color: #fff; }
#ab-root .traction .section-header p { color: rgba(255,255,255,0.65); }
#ab-root .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; max-width: 1000px; margin: 0 auto; padding: 0 32px; }
#ab-root .stat-item { text-align: center; }
#ab-root .stat-number { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(36px, 5vw, 56px); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 8px; }
#ab-root .stat-number .accent { color: var(--ab-crimson); }
#ab-root .stat-label { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 500; line-height: 1.5; }
#ab-root .stat-divider { width: 40px; height: 2px; background: rgba(255,255,255,0.15); margin: 10px auto 8px; border-radius: 1px; }

/* ─── TEAM CARDS ─── */
#ab-root .leadership { background: var(--ab-warm-gray); padding: 48px 0 40px; }
#ab-root .board-section { background: #fff; padding: 48px 0 40px; }
#ab-root .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
#ab-root .team-grid.three-col { grid-template-columns: repeat(3, 1fr); }
#ab-root .team-card { background: #fff; border-radius: var(--ab-radius-lg); overflow: hidden; box-shadow: var(--ab-shadow-card); transition: transform var(--ab-transition), box-shadow var(--ab-transition); }
#ab-root .team-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
#ab-root .leadership .team-card { background: #fff; }
#ab-root .board-section .team-card { background: var(--ab-warm-gray); }
#ab-root .team-card-photo { width: 100%; aspect-ratio: 1/1; overflow: hidden; background: var(--ab-warm-gray-2); }
#ab-root .team-card-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
#ab-root .team-card.team-card-text-only { display: flex; flex-direction: column; justify-content: flex-start; padding: 24px 22px; }
#ab-root .team-card.team-card-text-only .team-card-photo { display: none; }
#ab-root .team-card.team-card-text-only .team-card-info { padding: 0; }
#ab-root .team-card-text-only .tcf-badge { font-size: 11px; font-weight: 600; color: var(--ab-light-text); letter-spacing: 0.5px; margin-bottom: 16px; display: block; }
#ab-root .team-card-text-only .tcf-list { list-style: none; padding: 0; margin: 14px 0 0; display: flex; flex-direction: column; gap: 8px; }
#ab-root .team-card-text-only .tcf-list li { font-size: 13px; color: var(--ab-dark); line-height: 1.45; padding-left: 14px; position: relative; }
#ab-root .team-card-text-only .tcf-list li::before { content: '–'; position: absolute; left: 0; color: var(--ab-crimson); }
#ab-root .team-card-text-only .tcf-list li em { font-style: normal; color: var(--ab-light-text); font-size: 12px; }
#ab-root .team-card-info { padding: 20px 20px 24px; }
#ab-root .team-card-name { font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; font-weight: 700; color: var(--ab-dark); margin-bottom: 2px; }
#ab-root .team-card-role { font-size: 13px; font-weight: 600; color: var(--ab-crimson); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
#ab-root .team-card-bio { font-size: 13.5px; color: var(--ab-light-text); line-height: 1.6; }

/* ─── PRESS ─── */
#ab-root .press { background: var(--ab-warm-gray); padding: 48px 0 40px; }
#ab-root .press-big-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 32px; }
#ab-root .press-card-big { background: #fff; border-radius: var(--ab-radius-lg); overflow: hidden; display: flex; flex-direction: column; box-shadow: var(--ab-shadow-card); transition: transform var(--ab-transition), box-shadow var(--ab-transition); color: inherit; }
#ab-root .press-card-big:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
#ab-root .press-card-big-visual { height: 200px; display: flex; align-items: center; justify-content: center; padding: 32px; background: #fafafa; position: relative; overflow: hidden; }
#ab-root .press-card-big-visual img { max-height: 60px; max-width: 200px; object-fit: contain; position: relative; z-index: 2; }
#ab-root .press-card-big-visual .press-thumb-bg { position: absolute; inset: 0; z-index: 0; background-size: cover; background-position: center; opacity: 0.1; transition: opacity 0.4s ease; }
#ab-root .press-card-big:hover .press-thumb-bg { opacity: 0.18; }
#ab-root .press-card-big-visual.dark-bg { background: var(--ab-dark); }
#ab-root .press-card-big-visual.dark-bg img { filter: brightness(0) invert(1); }
#ab-root .press-card-big-visual.blue-bg { background: linear-gradient(135deg, #0a1628, #1a3a6a); }
#ab-root .press-card-big-visual.blue-bg img { filter: brightness(0) invert(1); }
#ab-root .press-card-big-visual.orange-bg { background: linear-gradient(135deg, rgba(200,100,20,0.65), rgba(230,140,50,0.7)); }
#ab-root .press-card-big-visual.orange-bg img { max-height: 60px; }
#ab-root .press-card-big-visual.gray-bg { background: linear-gradient(135deg, #404040, #6a6a6a); }
#ab-root .press-card-big-visual.gray-bg img { filter: brightness(0) invert(1); max-height: 120px; max-width: 380px; }
#ab-root .press-card-big-visual.maroon-bg { background: linear-gradient(135deg, var(--ab-maroon-deep), var(--ab-maroon)); }
#ab-root .press-card-big-visual.maroon-bg img { filter: brightness(10) saturate(0); }
#ab-root .press-card-big-visual .press-logos-row { display: flex; align-items: center; gap: 16px; position: relative; z-index: 2; }
#ab-root .press-card-big-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
#ab-root .press-card-big-body h3 { font-size: 18px; margin-bottom: 8px; }
#ab-root .press-card-big-body p { font-size: 14px; color: var(--ab-light-text); line-height: 1.6; flex: 1; }
#ab-root .press-card-big-body .press-type { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--ab-crimson); margin-bottom: 8px; }
#ab-root .press-small-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
#ab-root .press-card-small { background: #fff; border-radius: var(--ab-radius); padding: 20px; box-shadow: var(--ab-shadow-card); text-align: center; transition: transform var(--ab-transition), box-shadow var(--ab-transition); color: inherit; display: flex; flex-direction: column; align-items: center; gap: 12px; position: relative; overflow: hidden; }
#ab-root .press-card-small .press-thumb-bg { position: absolute; inset: 0; z-index: 0; background-size: cover; background-position: center; opacity: 0.06; transition: opacity 0.4s ease; }
#ab-root .press-card-small:hover .press-thumb-bg { opacity: 0.12; }
#ab-root .press-card-small > * { position: relative; z-index: 1; }
#ab-root .press-card-small:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.08); }
#ab-root .press-card-small-logo { height: 36px; display: flex; align-items: center; justify-content: center; }
#ab-root .press-card-small-logo img { max-height: 36px; max-width: 120px; object-fit: contain; }
#ab-root .press-card-small h4 { font-size: 14px; font-weight: 600; line-height: 1.4; }
#ab-root .press-card-small .press-type { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--ab-crimson); }

/* ─── PARTNERS ─── */
#ab-root .partners { background: #fff; padding: 48px 0 40px; }
#ab-root .partner-category { margin-bottom: 40px; }
#ab-root .partner-category:last-child { margin-bottom: 0; }
#ab-root .partner-category h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--ab-light-text); margin-bottom: 20px; text-align: center; }
#ab-root .partner-logos { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 32px; background: transparent !important; box-shadow: none !important; border: none !important; padding: 0 !important; }
#ab-root .partner-logos img { height: 52px; width: auto; object-fit: contain; transition: transform var(--ab-transition); background: transparent !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; padding: 0 !important; margin: 0 !important; filter: none !important; }
#ab-root .partner-logos img:hover { transform: scale(1.05); box-shadow: none !important; }
#ab-root .partner-logos.media-logos img { height: 44px; }

/* ─── FINAL CTA ─── */
#ab-root .final-cta { background: linear-gradient(135deg, #1a0510 0%, var(--ab-maroon) 50%, #2a0a14 100%); padding: 56px 32px; text-align: center; }
#ab-root .final-cta h2 { color: #fff; margin-bottom: 14px; }
#ab-root .final-cta h2 .highlight { color: var(--ab-crimson); }
#ab-root .final-cta p { color: rgba(255,255,255,0.7); max-width: 540px; margin: 0 auto 32px; }
#ab-root .cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
#ab-root .cta-btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 16px 36px; border-radius: 100px; background: var(--ab-crimson); color: #fff; font-weight: 700; font-size: 16px; transition: opacity var(--ab-transition), transform var(--ab-transition); }
#ab-root .cta-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
#ab-root .cta-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 16px 36px; border-radius: 100px; border: 2px solid rgba(255,255,255,0.3); color: #fff; font-weight: 600; font-size: 16px; transition: border-color var(--ab-transition), transform var(--ab-transition); }
#ab-root .cta-btn-outline:hover { border-color: #fff; transform: translateY(-2px); }


/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  #ab-root .founders-photos { max-width: 700px; }
  #ab-root .team-grid { grid-template-columns: repeat(3, 1fr); }
  #ab-root .team-grid.three-col { grid-template-columns: repeat(3, 1fr); }
  #ab-root .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 40px 32px; }
  #ab-root .press-big-grid { grid-template-columns: repeat(2, 1fr); }
  #ab-root .press-small-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  #ab-root .about-hero { padding: 110px 20px 48px; }
  #ab-root .about-hero h1 { font-size: clamp(28px, 8vw, 40px); }
  #ab-root .about-hero p.sub { font-size: 15px; }
  #ab-root .founders { padding: 40px 0 32px; }
  #ab-root .founders-inner { padding: 0 20px; }
  #ab-root .founders-photos { gap: 12px; }
  #ab-root .traction { padding: 40px 0; }
  #ab-root .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 16px; padding: 0 20px; }
  #ab-root .stat-number { font-size: clamp(28px, 8vw, 40px); }
  #ab-root .leadership, #ab-root .board-section { padding: 40px 0 32px; }
  #ab-root .team-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  #ab-root .team-grid.three-col { grid-template-columns: repeat(2, 1fr); }
  #ab-root .team-card-info { padding: 16px 14px 18px; }
  #ab-root .team-card-name { font-size: 16px; }
  #ab-root .team-card-bio { font-size: 12.5px; }
  #ab-root .press { padding: 40px 0 32px; }
  #ab-root .press-big-grid { grid-template-columns: 1fr; }
  #ab-root .press-card-big-visual { height: 140px; }
  #ab-root .press-small-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  #ab-root .partners { padding: 40px 0 32px; }
  #ab-root .partner-logos { gap: 20px; }
  #ab-root .partner-logos img { height: 40px; }
  #ab-root .partner-logos.media-logos img { height: 34px; }
  #ab-root .final-cta { padding: 48px 20px; }
  #ab-root .cta-buttons { flex-direction: column; align-items: center; }
}
@media (max-width: 420px) {
  #ab-root .team-grid { grid-template-columns: 1fr; max-width: 320px; margin-left: auto; margin-right: auto; }
  #ab-root .team-grid.three-col { grid-template-columns: 1fr; }
  #ab-root .press-small-grid { grid-template-columns: 1fr; }
  #ab-root .stats-grid { grid-template-columns: 1fr 1fr; }
  #ab-root .founders-photos { grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
}

/* ─── NAV + FOOTER overrides (mirror hp-shared-sections.js so About page matches homepage) ─── */
.p3-nav { padding: 16px 40px !important; height: auto !important; transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s; }
/* Scroll-darkened nav — pixel-match of the FS/homepage rule (the JS toggle existed but this rule was missing) */
.p3-nav.scrolled { background: rgba(26, 26, 26, 0.95) !important; backdrop-filter: blur(20px) !important; box-shadow: 0 2px 20px rgba(0,0,0,0.15); }
.p3-nav .p3-nav-logo img { max-height: 36px !important; width: auto !important; height: auto !important; object-fit: contain; }
.p3-nav .p3-nav-link { color: rgba(255,255,255,0.85) !important; }
@media(max-width: 991px) {
  .p3-nav { padding: 16px !important; height: 64px !important; }
  .p3-nav .p3-nav-logo img { max-height: 36px !important; height: 36px !important; }
}
@media(max-width: 768px) {
  .p3-footer-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 24px 16px !important; }
  .p3-footer-brand { grid-column: 1 / -1; }
  .p3-footer-bottom { flex-wrap: wrap; justify-content: center; text-align: center; }
}

/* ─── HAMBURGER + MOBILE OVERLAY (mirror hp-shared-sections.js) ─── */
.pp-home-desktop-hide { display: none; }
@media(max-width: 991px) { .pp-home-desktop-hide { display: block; } }
.pp-mob-menu { display: none; cursor: pointer; padding: 8px; z-index: 100; flex-direction: column; gap: 5px; }
@media(max-width: 991px) {
  .pp-mob-menu { display: flex; }
  .p3-nav .p3-nav-links { display: none !important; }
  .p3-nav .p3-nav-cta { display: none !important; }
}
.pp-mob-menu span { display: block; width: 22px; height: 2px; background-color: #fff; border-radius: 2px; transition: all .3s ease; }
.pp-mob-menu.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 6px); }
.pp-mob-menu.open span:nth-child(2) { opacity: 0; }
.pp-mob-menu.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -6px); }
.pp-mob-overlay { display: none; position: fixed; inset: 0; z-index: 99; background: rgba(26,26,26,0.98); flex-direction: column; align-items: center; justify-content: center; gap: 24px; }
.pp-mob-overlay.open { display: flex !important; }
.pp-mob-overlay-link { color: #fff; font-size: 1.4rem; font-weight: 600; text-decoration: none; opacity: 0.8; transition: opacity .3s; font-family: "Bricolage Grotesque", sans-serif; }
.pp-mob-overlay-link:hover { opacity: 1; }
.pp-mob-overlay-cta { display: inline-flex; padding: 12px 28px; border-radius: 100px; background: #D93A3A; color: #fff; font-weight: 600; font-size: 1rem; text-decoration: none; margin-top: 12px; transition: opacity .3s; }
.pp-mob-overlay-cta:hover { opacity: 0.9; }

/* Chrome family (Sep 2026 parity pass). Family only: the nav, overlay and footer are body-level siblings that inherit Webflow's body line-height (30.006px), the value every nav measurement depends on, so line-height is never set here. Element selectors as well as the containers, because Webflow's compiled stylesheet sets Inter directly on .p3-nav-cta, .p3-footer-col-title, .p3-footer-tagline and .pp-mob-overlay-link, and a direct rule beats inheritance. */
.p3-nav, .pp-mob-overlay, .p3-footer, .p3-nav .p3-nav-links a, .p3-nav .p3-nav-link, .p3-nav .p3-nav-cta, .pp-mob-overlay a, .pp-mob-overlay .pp-mob-overlay-link, .pp-mob-overlay .pp-mob-overlay-cta, .p3-footer h4, .p3-footer p, .p3-footer a, .p3-footer .p3-footer-col-title, .p3-footer .p3-footer-tagline, .p3-footer .p3-footer-location, .p3-footer .p3-footer-link { font-family: 'Plus Jakarta Sans', sans-serif; }

/* ═══ Public-site nav v2 (Sep 2026). Shared by the nine public pages; source of truth is Website Folder/site-chrome/apply-nav.py, re-run it rather than editing this block by hand. Selectors carry three classes on purpose: pages own rules like .pp-mob-overlay a:last-child (0,2,1) and .dl-page a (0,1,1) that would otherwise win. ═══ */
.p3-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; gap: 0; height: auto; padding: 16px 40px; background: transparent; transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s; }
.p3-nav.scrolled { background: rgba(26, 26, 26, 0.95) !important; -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px) !important; box-shadow: 0 2px 20px rgba(0,0,0,0.15); }
/* height on the anchor: the compiled Webflow stylesheet sets .p3-nav-logo { height: 30px } below 768px at (0,1,0). The 36px logo then overflows a 30px box and flex-centering lands it 3px low, which was the phone-width difference against the Enterprise bar. This selector is (0,2,0) and wins. */
.p3-nav .p3-nav-logo { display: block; height: 36px; flex: none; margin: 0; padding: 0; text-decoration: none; z-index: 10; }
.p3-nav .p3-nav-logo-img, .p3-nav .p3-nav-logo img { height: 36px; max-height: 36px; width: auto; display: block; }
.p3-nav .p3-nav-links { display: flex; align-items: center; gap: 32px; margin-left: auto; }
.p3-nav .p3-nav-links a, .p3-nav .p3-nav-links .p3-nav-link { margin: 0; padding: 0; background: none; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.85); text-decoration: none; white-space: nowrap; opacity: 1; transition: color 0.2s; }
.p3-nav .p3-nav-links a:hover, .p3-nav .p3-nav-links a[aria-current='page'] { color: #fff; }
.p3-nav .p3-nav-links .pp-home-desktop-hide { display: none !important; } /* the legacy homepage script (p3hpshared) still injects a Home link; keep it hidden until that script is unregistered */
.p3-nav .p3-nav-actions { display: flex; align-items: center; gap: 10px; margin-left: 32px; flex: none; }
.p3-nav .p3-nav-actions .p3-nav-btn, .pp-mob-overlay .p3-menu .p3-menu-actions .p3-nav-btn { display: inline-flex; align-items: center; justify-content: center; height: 36px; margin: 0; padding: 0 18px; border-radius: 999px; border: 1px solid transparent; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; font-weight: 600; line-height: 1; letter-spacing: 0.01em; text-decoration: none; white-space: nowrap; opacity: 1; cursor: pointer; transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
.p3-nav .p3-nav-actions .p3-nav-btn:focus-visible, .pp-mob-overlay .p3-menu .p3-nav-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.p3-nav .p3-nav-actions .p3-nav-btn-enterprise, .pp-mob-overlay .p3-menu .p3-menu-actions .p3-nav-btn-enterprise { background: #FAF8F6; border-color: #FAF8F6; color: #4A1020; }
.p3-nav .p3-nav-actions .p3-nav-btn-enterprise:hover, .pp-mob-overlay .p3-menu .p3-menu-actions .p3-nav-btn-enterprise:hover { background: #fff; border-color: #fff; color: #2E0614; transform: translateY(-1px); box-shadow: 0 8px 20px -6px rgba(0,0,0,0.5); }
.p3-nav .p3-nav-actions .p3-nav-btn-login, .pp-mob-overlay .p3-menu .p3-menu-actions .p3-nav-btn-login { background: #D93A3A; border-color: #D93A3A; color: #fff; }
.p3-nav .p3-nav-actions .p3-nav-btn-login:hover, .pp-mob-overlay .p3-menu .p3-menu-actions .p3-nav-btn-login:hover { background: #C33232; border-color: #C33232; color: #fff; transform: translateY(-1px); box-shadow: 0 8px 20px -6px rgba(217,58,58,0.7); }
.p3-nav .p3-nav-actions .p3-nav-btn:active, .pp-mob-overlay .p3-menu .p3-menu-actions .p3-nav-btn:active { transform: translateY(0); box-shadow: none; }
.p3-nav .pp-mob-menu { display: none; flex-direction: column; align-items: center; justify-content: center; gap: 4px; width: 44px; height: 44px; margin: -4px -12px -4px 0; padding: 0; background: none; border: 0; color: #fff; cursor: pointer; z-index: 1001; }
.p3-nav .pp-mob-menu span { display: block; width: 18px; height: 2px; margin: 0; border-radius: 2px; background: currentColor; transition: transform 0.25s ease, opacity 0.2s ease; }
.p3-nav .pp-mob-menu.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.p3-nav .pp-mob-menu.open span:nth-child(2) { opacity: 0; }
.p3-nav .pp-mob-menu.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
/* !important on the drawer layout: the still-registered legacy homepage script (p3hpshared) injects its own .pp-mob-overlay rules AFTER this file, centered and at z-index 99, which is how the drawer came out centered and under the bar there. */
.pp-mob-overlay { position: fixed !important; inset: 0 !important; z-index: 1002 !important; display: none; flex-direction: row !important; justify-content: flex-end !important; align-items: stretch !important; gap: 0 !important; padding: 0 !important; background: rgba(12, 4, 8, 0.62) !important; opacity: 1 !important; transform: none !important; transition: none !important; }
.pp-mob-overlay.open { display: flex !important; }
.pp-mob-overlay .p3-menu-scrim, .pp-mob-overlay a.p3-menu-scrim:last-child { position: absolute; inset: 0; display: block; margin: 0; padding: 0; background: none; }
.pp-mob-overlay .p3-menu { position: relative; width: min(88vw, 340px); height: 100%; display: flex; flex-direction: column; gap: 22px; padding: 20px 20px 28px; overflow-y: auto; color: #fff; background: linear-gradient(178deg, #3a0c18 0%, #4a1020 42%, #220810 100%); box-shadow: -12px 0 40px rgba(0,0,0,0.35); animation: p3-menu-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
@keyframes p3-menu-in { from { transform: translateX(24px); opacity: 0; } to { transform: none; opacity: 1; } }
.pp-mob-overlay .p3-menu .p3-menu-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.pp-mob-overlay .p3-menu .p3-menu-logo { height: 36px; width: auto; display: block; }
.pp-mob-overlay .p3-menu .p3-menu-top .p3-menu-close { display: inline-flex; align-items: center; min-height: 40px; margin: 0; padding: 0 16px; border: 1px solid rgba(255,255,255,0.24); border-radius: 999px; background: none; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; opacity: 1; }
.pp-mob-overlay .p3-menu .p3-menu-nav { display: flex; flex-direction: column; }
.pp-mob-overlay .p3-menu .p3-menu-nav a { display: flex; align-items: center; min-height: 52px; margin: 0; padding: 0; border: 0; border-bottom: 1px solid rgba(255,255,255,0.12); border-radius: 0; background: none; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.9); text-decoration: none; opacity: 1; }
.pp-mob-overlay .p3-menu .p3-menu-nav a:hover, .pp-mob-overlay .p3-menu .p3-menu-nav a[aria-current='page'] { color: #fff; }
.pp-mob-overlay .p3-menu .p3-menu-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.pp-mob-overlay .p3-menu .p3-menu-actions .p3-nav-btn { height: 44px; font-size: 14px; }
.pp-mob-overlay .p3-menu .p3-menu-download { margin: auto 0 0; display: grid; grid-template-columns: 56px 1fr; column-gap: 14px; align-items: center; padding: 16px 18px; border: 1px solid rgba(255,255,255,0.16); border-radius: 14px; background: rgba(255,255,255,0.07); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500; line-height: 1.4; text-decoration: none; opacity: 1; }
/* the app icon, App Store style, so people know what to look for in the store (Pulse Launch, Oct 2026). A grid rather than a float: the title can wrap, and the text column has to stay beside the icon when it does. */
.pp-mob-overlay .p3-menu .p3-menu-download-icon { grid-row: 1 / span 3; display: block; width: 56px; height: 56px; max-width: none; margin: 0; border-radius: 13px; box-shadow: 0 6px 16px -4px rgba(0,0,0,0.5); }
.pp-mob-overlay .p3-menu .p3-menu-download-eyebrow, .pp-mob-overlay .p3-menu .p3-menu-download-title, .pp-mob-overlay .p3-menu .p3-menu-download-cta { grid-column: 2; min-width: 0; }
.pp-mob-overlay .p3-menu .p3-menu-download-eyebrow { display: block; margin-bottom: 6px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.6); }
.pp-mob-overlay .p3-menu .p3-menu-download-title { display: block; margin-bottom: 4px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; font-weight: 600; letter-spacing: -0.005em; color: #fff; }
.pp-mob-overlay .p3-menu .p3-menu-download-cta { display: inline-block; justify-self: start; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; color: #ff8a8a; }
@media (max-width: 991px) {
  .p3-nav .pp-mob-menu { display: flex; }
  .p3-nav .p3-nav-links, .p3-nav .p3-nav-actions { display: none !important; }
  .p3-nav { padding: 16px !important; height: 64px !important; }
  .p3-nav .p3-nav-logo-img, .p3-nav .p3-nav-logo img { max-height: 36px !important; height: 36px !important; }
}
`;
  document.head.appendChild(style);

  // ═══ 4. BUILD BODY HTML ═══
  document.body.classList.add('ab-active');

  // Hide ALL existing Webflow body content (including the page's legacy `header-wrapper` nav and
  // any old footer). We re-inject our own #p3nav and .p3-footer below — same HTML the homepage uses.
  Array.prototype.forEach.call(document.body.children, function(child) {
    if (child.id !== 'ab-root') {
      child.style.setProperty('display', 'none', 'important');
    }
  });

  var root = document.createElement('div');
  root.id = 'ab-root';

  root.innerHTML = `
<!-- HERO -->
<section class="about-hero">
  <div class="about-hero-bg"></div>
  <div class="about-hero-inner reveal">
    <span class="section-tag-light">Our Story</span>
    <h1>Three Doctors. One <span class="highlight">Mission.</span></h1>
    <p class="sub">Founded by physicians who overcame the very barriers they now work to dismantle, P3 connects overlooked students with mentors who can open the right doors.</p>
  </div>
</section>

<!-- FOUNDERS -->
<section class="founders reveal">
  <div class="founders-inner">
    <div class="founders-text-block">
      <span class="section-tag">The Beginning</span>
      <h2>Born from <span class="highlight">lived experience</span></h2>
      <p>In 2018, three board-certified physicians — Dr. Maxime Madhere, Dr. Joseph Semien, and Dr. Pierre Johnson — launched the Pulse of Perseverance Project. What began as a memoir about perseverance became a movement — a free mobile platform that gives every ambitious student access to the mentors, guidance, and opportunities they deserve.</p>
      <p>Their shared journey from underserved communities to the top of medicine revealed a systemic truth: talent is universal, but access is not.</p>
    </div>
    <div class="founders-photos">
      <div class="founder-photo">
        <img src="${ASSETS}max_casual.png" alt="Dr. Maxime Madhere">
        <div class="caption">Dr. Maxime Madhere<span>CEO &amp; Co-Founder</span></div>
      </div>
      <div class="founder-photo">
        <img src="${ASSETS}joe_casual.png" alt="Dr. Joseph Semien">
        <div class="caption">Dr. Joseph Semien<span>Co-Founder</span></div>
      </div>
      <div class="founder-photo">
        <img src="${ASSETS}pierre_casual.png" alt="Dr. Pierre Johnson">
        <div class="caption">Dr. Pierre Johnson<span>Co-Founder</span></div>
      </div>
    </div>
  </div>
</section>

<!-- TRACTION -->
<section class="traction reveal">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-tag-light">Traction &amp; Proof</span>
      <h2>The numbers <span style="color: var(--ab-crimson);">speak</span></h2>
      <p>Real impact, measured in the outcomes that matter.</p>
    </div>
    <div class="stats-grid">
      <div class="stat-item"><div class="stat-number">1,200<span class="accent">+</span></div><div class="stat-divider"></div><div class="stat-label">Students &amp; mentors connected on the platform</div></div>
      <div class="stat-item"><div class="stat-number"><span class="accent">+</span>90<span class="accent">%</span></div><div class="stat-divider"></div><div class="stat-label">Mentorship retention rate after 90 days</div></div>
      <div class="stat-item"><div class="stat-number">4.6<span class="accent">★</span></div><div class="stat-divider"></div><div class="stat-label">App Store rating from real students</div></div>
      <div class="stat-item"><div class="stat-number"><span class="accent">$</span>2M</div><div class="stat-divider"></div><div class="stat-label">Raised since inception through grants &amp; donations</div></div>
    </div>
  </div>
</section>

<!-- LEADERSHIP -->
<section id="team" class="leadership reveal">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-tag">Leadership Team</span>
      <h2>The people <span style="color: var(--ab-crimson);">behind P3</span></h2>
      <p>Operators, builders, and mission-driven leaders working to close the access gap.</p>
    </div>
    <div class="team-grid">
      <div class="team-card">
        <div class="team-card-photo"><img src="${ASSETS}max_exec.png" alt="Dr. Maxime Madhere"></div>
        <div class="team-card-info">
          <div class="team-card-name">Dr. Maxime Madhere</div>
          <div class="team-card-role">CEO &amp; Co-Founder</div>
          <div class="team-card-bio">Leader dedicated to expanding access to mentorship &amp; opportunity via tech/partnerships. Board member of 100 Black Men of Metro Baton Rouge.</div>
        </div>
      </div>
      <div class="team-card">
        <div class="team-card-photo"><img src="${ASSETS}thomas_exec.png" alt="Thomas Paris"></div>
        <div class="team-card-info">
          <div class="team-card-name">Thomas Paris</div>
          <div class="team-card-role">Chief Operating Officer</div>
          <div class="team-card-bio">15 years scaling EdTech platforms across the US, Asia, and EU. Leads operations, partnerships, and grant strategy at P3.</div>
        </div>
      </div>
      <div class="team-card">
        <div class="team-card-photo"><img src="${ASSETS}alex.png" alt="Alex Strand"></div>
        <div class="team-card-info">
          <div class="team-card-name">Alex Strand</div>
          <div class="team-card-role">Chief Revenue Officer</div>
          <div class="team-card-bio">BD leader with experience scaling startups from pre-seed to Series B. Leads all four revenue pillars driving P3's sustainability.</div>
        </div>
      </div>
      <div class="team-card team-card-text-only">
        <div class="team-card-info">
          <div class="team-card-name">Platform Team</div>
          <span class="tcf-badge">3Advance</span>
          <div class="team-card-bio">Full-stack product team that owns day-to-day engineering and delivery for the P3 mobile platform.</div>
          <ul class="tcf-list">
            <li>Darren Gibney, <em>Chief Technology Officer</em></li>
            <li>Mark Evans, <em>Senior Director of Delivery</em></li>
            <li>Heather Hayes, <em>Product Manager</em></li>
            <li>Kieran Holden, <em>Design Lead</em></li>
            <li>Paul Swail, <em>Director of Engineering</em></li>
            <li>Sandip Chaulagain, <em>Mobile Lead</em></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- BOARD -->
<section class="board-section reveal">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-tag">Board of Directors</span>
      <h2>Guided by <span style="color: var(--ab-crimson);">purpose</span></h2>
      <p>Advisors, advocates, and co-founders who keep P3 mission-aligned and growth-ready.</p>
    </div>
    <div class="team-grid">
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}joe_board.avif" alt="Dr. Joseph Semien"></div><div class="team-card-info"><div class="team-card-name">Dr. Joseph Semien</div><div class="team-card-role">Co-Founder</div><div class="team-card-bio">Board Certified OB/GYN. Youth advocate, fatherhood speaker, and health equity leader in Louisiana.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}pierre_board.avif" alt="Dr. Pierre Johnson"></div><div class="team-card-info"><div class="team-card-name">Dr. Pierre Johnson</div><div class="team-card-role">Co-Founder</div><div class="team-card-bio">Board Certified OB/GYN. Community health volunteer, mentor pipeline builder, and Chicago civic leader.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}george_board.png" alt="George Christo-Baker"></div><div class="team-card-info"><div class="team-card-name">George Christo-Baker</div><div class="team-card-role">Board Member</div><div class="team-card-bio">Financial Advisor at Wells Fargo. Chicago youth development advocate dedicated to expanding P3's commercial impact.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}vondale_board.avif" alt="Vondale Singleton"></div><div class="team-card-info"><div class="team-card-name">Vondale Singleton</div><div class="team-card-role">Board Member</div><div class="team-card-bio">Founder of CHAMPS Male Mentoring. CEO, Brilliance &amp; Excellence NFP. MBK Chicago backbone leader.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}kristen-v-carter-headshot.jpg" alt="Kristen Carter"></div><div class="team-card-info"><div class="team-card-name">Kristen Carter</div><div class="team-card-role">Board Member</div><div class="team-card-bio">Award-winning TV executive producer. Founder of Trust Your Magic. Hofstra University.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}orelia.jpg?v=20260417b" alt="Orelia Lawdins-Trent"></div><div class="team-card-info"><div class="team-card-name">Orelia Lawdins-Trent</div><div class="team-card-role">Legal Liaison</div><div class="team-card-bio">Litigation Attorney, Lawdins Law &amp; Associates. Ensures P3 operates with legal integrity and compliance.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}andrea-madhere-headshot.jpg" alt="Dr. Andrea Madhere"></div><div class="team-card-info"><div class="team-card-name">Dr. Andrea Madhere</div><div class="team-card-role">Secretary</div><div class="team-card-bio">Owner, Chiropractic Concierge. Foundation Chair, Jack and Jill of America, Baton Rouge chapter.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}stan_board.avif" alt="Stanley Savage"></div><div class="team-card-info"><div class="team-card-name">Stanley Savage</div><div class="team-card-role">Treasurer</div><div class="team-card-bio">Manager of Financial Audit at Blue Cross Blue Shield. VP Finance, 100 Black Men of Metro Baton Rouge.</div></div></div>
    </div>
  </div>
</section>

<!-- PRESS -->
<section id="press" class="press reveal">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-tag">In the Press</span>
      <h2>Making <span style="color: var(--ab-crimson);">headlines</span></h2>
      <p>National coverage from outlets that recognize P3's impact on the next generation.</p>
    </div>

    <div class="press-big-grid">
      <a class="press-card-big" href="https://youtu.be/JxD4yL8hCvA?si=FbDKZMGYGtPjKQM6" target="_blank" rel="noopener">
        <div class="press-card-big-visual orange-bg">
          <div class="press-thumb-bg" style="background-image: url('${ASSETS}the-today-show-thumb.webp');"></div>
          <img src="${ASSETS}today-show.png" alt="TODAY Show">
        </div>
        <div class="press-card-big-body">
          <div class="press-type">TV Feature</div>
          <h3>3 Doctors Share Journey from Poverty to Practicing Medicine</h3>
          <p>The P3 founders share their powerful story of perseverance on the TODAY Show, inspiring millions of viewers nationwide.</p>
        </div>
      </a>
      <a class="press-card-big" href="https://vote.webbyawards.com/PublicVoting#/2026/advertising-media-pr/branded-content/belonging-inclusion" target="_blank" rel="noopener">
        <div class="press-card-big-visual blue-bg">
          <div class="press-thumb-bg" style="background-image: url('${ASSETS}300x250-02.png');"></div>
          <img src="${ASSETS}webby-logo-transparent.svg" alt="The Webby Awards">
        </div>
        <div class="press-card-big-body">
          <div class="press-type">Nomination</div>
          <h3>2026 Webby Awards — Belonging &amp; Inclusion</h3>
          <p>P3's Impact Film nominated for a Webby Award in the Branded Content category for Belonging &amp; Inclusion.</p>
        </div>
      </a>
      <a class="press-card-big" href="https://www.nytimes.com/2019/03/07/science/black-doctors-book-pulse-perseverance.html" target="_blank" rel="noopener">
        <div class="press-card-big-visual gray-bg">
          <div class="press-thumb-bg" style="background-image: url('${ASSETS}nyc-thumb.webp');"></div>
          <img src="${ASSETS}new-york-times.png" alt="The New York Times">
        </div>
        <div class="press-card-big-body">
          <div class="press-type">Feature Article</div>
          <h3>Three Black Doctors Tell Their Story of Perseverance</h3>
          <p>The New York Times covers the P3 founders' memoir and mission to break barriers in healthcare and education.</p>
        </div>
      </a>
      <a class="press-card-big" href="https://www.adweek.com/brand-marketing/why-kevin-bacons-sixdegreesorg-is-matching-nonprofits-with-agencies/" target="_blank" rel="noopener">
        <div class="press-card-big-visual maroon-bg">
          <div class="press-thumb-bg" style="background-image: url('${ASSETS}adweek-group.jpeg');"></div>
          <div class="press-logos-row">
            <img src="${ASSETS}versus.png" alt="VERSUS" style="filter: none; max-height: 50px;">
            <span style="color: rgba(255,255,255,0.5); font-size: 20px; position: relative; z-index: 2;">+</span>
            <img src="${ASSETS}adweek-nyc.png" alt="Advertising Week NYC">
          </div>
        </div>
        <div class="press-card-big-body">
          <div class="press-type">Feature / Partnership</div>
          <h3>VERSUS &amp; SixDegrees.org — Matching Nonprofits with Emmy-Winning Agencies</h3>
          <p>AdWeek covers how Kevin Bacon's SixDegrees.org connected P3 with VERSUS to produce their Emmy-winning Impact Film.</p>
        </div>
      </a>
    </div>

    <div class="press-small-grid">
      <a class="press-card-small" href="https://abcnews.com/video/61046557/" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><img src="${ASSETS}abc-news.png" alt="ABC News"></div>
        <div class="press-type">TV Feature</div><h4>Doctors Share Their Pulse of Perseverance</h4>
      </a>
      <a class="press-card-small" href="https://www.adweek.com/brand-marketing/why-kevin-bacons-sixdegreesorg-is-matching-nonprofits-with-agencies/" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><img src="${ASSETS}adweek-nyc.png" alt="Advertising Week NYC"></div>
        <div class="press-type">Campaign</div><h4>P3 at Advertising Week New York</h4>
      </a>
      <a class="press-card-small" href="https://youtu.be/hNIf9UQSYjg?si=ti_K1qAkP_iw7rXd" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 16px; font-weight: 700; color: var(--ab-dark);">Steve Harvey Show</div></div>
        <div class="press-type">TV Appearance</div><h4>P3 Founders on Steve Harvey</h4>
      </a>
      <a class="press-card-small" href="https://advertisingweek.com/advertising-weeks-six-degrees/" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><img src="${ASSETS}sixdegrees.png" alt="SixDegrees.org"></div>
        <div class="press-type">Partnership</div><h4>Kevin Bacon's SixDegrees.org Partner</h4>
      </a>
      <a class="press-card-small" href="https://www.goodmorningamerica.com/amp/video/61046557" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 700; color: var(--ab-dark);">Good Morning America</div></div>
        <div class="press-type">TV Feature</div><h4>P3 Founders Featured on GMA</h4>
      </a>
      <a class="press-card-small" href="https://youtu.be/V7VHW17jrEM?si=Qczuy7zbzU6assg7" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 16px; font-weight: 700; color: var(--ab-dark);">Sister Circle</div></div>
        <div class="press-type">TV Appearance</div><h4>P3 Founders on Sister Circle</h4>
      </a>
      <a class="press-card-small" href="https://www.blackenterprise.com/pulse-perseverance-three-black-men-become-doctors-odds/" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 700; color: var(--ab-dark);">Black Enterprise</div></div>
        <div class="press-type">Feature Article</div><h4>Three Black Men Become Doctors Against the Odds</h4>
      </a>
      <a class="press-card-small" href="https://youtu.be/BXI1EHdVHX0?si=hA2Mw4NaTRNvEQPc" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 700; color: var(--ab-dark);">Windy City Live</div></div>
        <div class="press-type">TV Appearance</div><h4>P3 Founders on Windy City Live</h4>
      </a>
    </div>
  </div>
</section>

<!-- PARTNERS -->
<section class="partners reveal">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-tag">Our Partners</span>
      <h2>Powered by <span style="color: var(--ab-crimson);">community</span></h2>
      <p>Institutions, organizations, and industry leaders who fuel the P3 mission.</p>
    </div>

    <div class="partner-category">
      <h4>Academic Partners</h4>
      <div class="partner-logos">
        <img src="${ASSETS}chicago-public-schools.png" alt="Chicago Public Schools">
        <img src="${ASSETS}chicago-state-university.png" alt="Chicago State University">
        <img src="${ASSETS}langston-university.png" alt="Langston University">
        <img src="${ASSETS}xavier-university.png" alt="Xavier University of Louisiana">
        <img src="${ASSETS}nyu.png" alt="NYU">
        <img src="${ASSETS}leo-high-school.png" alt="LEO Catholic High School">
        <img src="${ASSETS}olive-harvey.png" alt="Olive-Harvey College" style="height: 36px;">
      </div>
    </div>

    <div class="partner-category">
      <h4>Community &amp; Foundation Partners</h4>
      <div class="partner-logos">
        <img src="${ASSETS}mbk-chicago.png" alt="MBK Chicago">
        <img src="${ASSETS}champs-mentoring.png" alt="CHAMPS Male Mentoring">
        <img src="${ASSETS}100-black-men.png" alt="100 Black Men">
        <img src="${ASSETS}build-chicago.png" alt="BUILD Chicago">
        <img src="${ASSETS}project-hood.png" alt="Project H.O.O.D.">
        <img src="${ASSETS}salute-1st.png" alt="Salute 1st">
        <img src="${ASSETS}gilead-foundation.png" alt="Gilead Foundation">
      </div>
    </div>

    <div class="partner-category">
      <h4>Knowledge &amp; Industry Partners</h4>
      <div class="partner-logos">
        <img src="${ASSETS}google.png" alt="Google">
        <img src="${ASSETS}mentor.png" alt="MENTOR">
        <img src="${ASSETS}lsu.png" alt="Louisiana State University">
        <img src="${ASSETS}ut-austin.png" alt="University of Texas at Austin">
        <img src="${ASSETS}u-of-michigan.png" alt="University of Michigan">
        <img src="${ASSETS}unt.png" alt="University of North Texas">
        <img src="${ASSETS}lurie-hospital.png" alt="Lurie Children's Hospital" style="height: 85px;">
        <img src="${ASSETS}3advance.png" alt="3Advance">
      </div>
    </div>

    <div class="partner-category">
      <h4>Media &amp; Recognition</h4>
      <div class="partner-logos media-logos">
        <img src="${ASSETS}versus.png" alt="VERSUS">
        <img src="${ASSETS}abc-news.png" alt="ABC News">
        <img src="${ASSETS}new-york-times.png" alt="The New York Times" style="height: 72px;">
        <img src="${ASSETS}today-show.png" alt="TODAY Show">
        <img src="${ASSETS}sixdegrees.png" alt="SixDegrees.org">
        <img src="${ASSETS}adweek-nyc.png" alt="Advertising Week NYC">
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta reveal">
  <h2>Ready to <span class="highlight">Re:Frame</span> what's possible?</h2>
  <p>Whether you're a student seeking mentorship, a professional ready to give back, or an institution looking to drive outcomes — there's a place for you at P3.</p>
  <div class="cta-buttons">
    <a href="https://www.pulseofp3.org/download" class="cta-btn-primary">Get the App →</a>
    <a href="https://drive.google.com/file/d/1IrFocCsboO6mLZsG3GAlHjmKv_V7a9Sn/view?usp=drive_link" target="_blank" rel="noopener" class="cta-btn-outline">Annual Report 2025</a>
  </div>
</section>

`;

  // Build NAV (siblings of #ab-root, NOT inside it — keeps Webflow's .p3-nav styles untouched
  // by our #ab-root universal reset).
  var navWrap = document.createElement('div');
  navWrap.innerHTML = `
<div class="p3-nav" id="p3nav">
  <a href="https://www.pulseofp3.org/" class="p3-nav-logo" aria-label="Pulse of Perseverance Project"><img src="https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b02f65f0068e9fb16f0df1_P3%20Logo.svg" alt="P3 - Pulse of Perseverance" class="p3-nav-logo-img"></a>
  <div class="p3-nav-links">
    <a href="https://www.pulseofp3.org/for-students" class="p3-nav-link">For Students</a>
    <a href="https://www.pulseofp3.org/for-mentors" class="p3-nav-link">For Mentors</a>
    <a href="https://www.pulseofp3.org/platform" class="p3-nav-link">Platform</a>
    <a href="https://www.pulseofp3.org/about/about" class="p3-nav-link" aria-current="page">About</a>
  </div>
  <div class="p3-nav-actions">
    <a href="https://enterprise.pulseofp3.org/overview" class="p3-nav-btn p3-nav-btn-enterprise">Enterprise</a>
    <a href="https://platform.pulseofp3.org/" class="p3-nav-btn p3-nav-btn-login">Login</a>
  </div>
  <button type="button" class="pp-mob-menu" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
</div>`;
  var navEl = navWrap.firstElementChild;

  // Build FOOTER (also a body sibling).
  var footWrap = document.createElement('div');
  footWrap.innerHTML = `
<section class="p3-footer">
  <div class="p3-footer-grid">
    <div class="p3-footer-brand">
      <img src="${WF_FOOTER_LOGO}" alt="Pulse of Perseverance Project" class="p3-footer-logo">
      <p>Unlocking life-changing opportunities for young visionaries. Free on iOS &amp; Android.</p>
      <p>Chicago, IL · Founded 2018</p><a href="https://www.pulseofp3.org/about/contact" class="p3-footer-link p3-footer-contact" style="align-self:flex-start">Contact Us</a>
    </div>
    <div class="p3-footer-col">
      <h4>Platform</h4>
      <a href="/for-students">For Students</a>
      <a href="/for-mentors">For Mentors</a>
      <a href="https://enterprise.pulseofp3.org/overview">For Institutions</a>
      <a href="/scholarships">Scholarships</a>
    </div>
    <div class="p3-footer-col">
      <h4>About</h4>
      <a href="/about/about">Our Story</a>
      <a href="/about/about#team">Team</a>
      <a href="https://drive.google.com/file/d/1IrFocCsboO6mLZsG3GAlHjmKv_V7a9Sn/view?usp=drive_link" target="_blank" rel="noopener">Annual Report</a>
      <a href="/about/about#press">Press</a>
    </div>
    <div class="p3-footer-col">
      <h4>Connect</h4>
      <a href="https://www.instagram.com/pulseofp3/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.linkedin.com/company/pulseofperseverance" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://www.youtube.com/@PulseofPerseverance" target="_blank" rel="noopener">YouTube</a>
      <a href="/donate">Donate</a>
    </div>
  </div>
  <div class="p3-footer-bottom" style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:24px;margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);">
    <span>© 2026 Pulse of Perseverance Project. All rights reserved.</span>
    <a href="https://www.pulseofp3.org/app-terms-conditions" style="text-decoration:underline;color:inherit;">Terms &amp; Policies</a>
  </div>
</section>`;
  var footEl = footWrap.firstElementChild;

  // Mount: nav → ab-root content → footer
  document.body.appendChild(navEl);
  document.body.appendChild(root);
  document.body.appendChild(footEl);

  /*
    Legacy-script guard for the footer (Sep 9 2026). p3footerfix 1.4.0 is still
    registered on this page. After we run it (a) rewrites the footer's
    "For Institutions" link back to /partner and (b) appends its own
    "Terms & Conditions" anchor inside the copyright line. Both are undone here,
    on a schedule and again whenever the footer changes, so the outcome does not
    depend on which script runs last. Delete once the legacy scripts are gone.
  */
  function guardFooter() {
    var footer = document.querySelector('.p3-footer');
    if (!footer) return;
    footer.querySelectorAll('a').forEach(function (a) {
      var h = a.getAttribute('href') || '';
      /* no backslashes in these regexes: the homepage build carries this block through a template literal, which drops them */
      if (h === '/partner' || /pulseofp3[.]org[/]partner[/]?$/.test(h)) a.setAttribute('href', 'https://enterprise.pulseofp3.org/overview');
      if (/^Terms[ ]*&[ ]*Conditions$/i.test((a.textContent || '').trim())) {
        var host = a.parentElement;
        a.remove();
        if (host && host.tagName === 'P' && !host.textContent.trim() && !host.querySelector('a')) host.remove();
      }
    });
  }
  guardFooter();
  document.addEventListener('DOMContentLoaded', guardFooter);
  window.addEventListener('load', guardFooter);
  [300, 1200, 3000].forEach(function (ms) { setTimeout(guardFooter, ms); });
  if (window.MutationObserver) {
    var guarded = document.querySelector('.p3-footer');
    if (guarded) new MutationObserver(guardFooter).observe(guarded, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
  }

  // ═══ HAMBURGER OVERLAY + WIRE-UP (mirror hp-shared-sections.js) ═══
  if (!document.getElementById('pp-mob-overlay')) {
    var ovl = document.createElement('div');
    ovl.id = 'pp-mob-overlay';
    ovl.className = 'pp-mob-overlay';
    ovl.innerHTML = `<a class="p3-menu-scrim" href="javascript:void(0)" aria-hidden="true" tabindex="-1"></a>
  <div class="p3-menu" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="p3-menu-top">
      <img src="https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b02f65f0068e9fb16f0df1_P3%20Logo.svg" alt="P3" class="p3-menu-logo">
      <a class="p3-menu-close" href="javascript:void(0)" role="button">Close</a>
    </div>
    <nav class="p3-menu-nav" aria-label="Site">
      <a href="https://www.pulseofp3.org/for-students">For Students</a>
      <a href="https://www.pulseofp3.org/for-mentors">For Mentors</a>
      <a href="https://www.pulseofp3.org/platform">Platform</a>
      <a href="https://www.pulseofp3.org/about/about" aria-current="page">About</a>
    </nav>
    <div class="p3-menu-actions">
      <a href="https://enterprise.pulseofp3.org/overview" class="p3-nav-btn p3-nav-btn-enterprise">Enterprise</a>
      <a href="https://platform.pulseofp3.org/" class="p3-nav-btn p3-nav-btn-login">Login</a>
    </div>
    <a class="p3-menu-download" href="https://www.pulseofp3.org/download">
      <img src="data:image/jpeg;base64,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" alt="" class="p3-menu-download-icon">
      <span class="p3-menu-download-eyebrow">Free on iOS and Android</span>
      <span class="p3-menu-download-title">Pulse Launch</span>
      <span class="p3-menu-download-cta">Download the app</span>
    </a>
  </div>`;
    document.body.appendChild(ovl);
  }
  (function wireAboutHamburger() {
    var mob = navEl.querySelector('.pp-mob-menu');
    var ov = document.getElementById('pp-mob-overlay');
    if (!mob || !ov || mob.dataset.wired) return;
    mob.dataset.wired = '1';
    mob.addEventListener('click', function() {
      mob.classList.toggle('open');
      ov.classList.toggle('open');
      document.body.style.overflow = ov.classList.contains('open') ? 'hidden' : '';
    });
    ov.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        mob.classList.remove('open');
        ov.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  })();
  // Nav scroll-darken effect
  window.addEventListener('scroll', function() {
    navEl.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ═══ 5. WIRE UP BEHAVIORS ═══
  // Intro reveal
  requestAnimationFrame(function() { document.body.classList.add('ab-intro-done'); });

  // Scroll-reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
  } else {
    root.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
  }

  // Post-inject hash scroll — browser's initial hash scroll ran before #team existed,
  // and a legacy Webflow element with the same id may still exist in the hidden DOM,
  // so query inside #ab-root specifically and retry after images/layout settle.
  function scrollToHash() {
    var h = window.location.hash;
    if (!h || h.length < 2) return;
    var id = h.slice(1);
    var el = root.querySelector('#' + CSS.escape(id)) || document.querySelector('#ab-root #' + CSS.escape(id));
    if (el) {
      var y = el.getBoundingClientRect().top + window.pageYOffset - 80; // offset for fixed nav
      window.scrollTo({ top: y, behavior: 'auto' });
    }
  }
  setTimeout(scrollToHash, 50);
  setTimeout(scrollToHash, 400);
  setTimeout(scrollToHash, 1200);
  window.addEventListener('load', function(){ setTimeout(scrollToHash, 100); });
})();
