(function() {
  /* ══════════════════════════════════════════════════════════════
     about-combined.js v1.0.8 — About page rebuild.
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
    fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap';
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
#ab-root { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; line-height: 1.6; -webkit-font-smoothing: antialiased; }
#ab-root img { max-width: 100%; display: block; box-shadow: none; background: transparent; border: 0; border-radius: 0; }
#ab-root a { text-decoration: none; color: inherit; }
#ab-root h1, #ab-root h2, #ab-root h3, #ab-root h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; }
#ab-root h1 { font-size: clamp(34px, 4.2vw, 52px); line-height: 1.15; }
#ab-root h2 { font-size: clamp(28px, 3.5vw, 44px); line-height: 1.2; }
#ab-root h3 { font-size: 22px; line-height: 1.3; }
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
#ab-root .stat-number { font-family: 'Space Grotesk', sans-serif; font-size: clamp(36px, 5vw, 56px); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 8px; }
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
#ab-root .team-card-name { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: var(--ab-dark); margin-bottom: 2px; }
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
#ab-root .partner-category h4 { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--ab-light-text); margin-bottom: 20px; text-align: center; }
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
.p3-nav { padding: 16px 40px !important; height: auto !important; }
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
      <div class="stat-item"><div class="stat-number">900<span class="accent">+</span></div><div class="stat-divider"></div><div class="stat-label">Students &amp; mentors connected on the platform</div></div>
      <div class="stat-item"><div class="stat-number">99<span class="accent">%</span></div><div class="stat-divider"></div><div class="stat-label">Mentorship retention rate after 90 days</div></div>
      <div class="stat-item"><div class="stat-number">4.9<span class="accent">★</span></div><div class="stat-divider"></div><div class="stat-label">App Store rating from real students</div></div>
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
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}orelia.jpg" alt="Orelia Lawdins-Trent"></div><div class="team-card-info"><div class="team-card-name">Orelia Lawdins-Trent</div><div class="team-card-role">Legal Liaison</div><div class="team-card-bio">Litigation Attorney, Lawdins Law &amp; Associates. Ensures P3 operates with legal integrity and compliance.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}andrea-madhere-headshot.jpg" alt="Dr. Andrea Madhere"></div><div class="team-card-info"><div class="team-card-name">Dr. Andrea Madhere</div><div class="team-card-role">Secretary</div><div class="team-card-bio">Owner, Chiropractic Concierge. Foundation Chair, Jack and Jill of America, Baton Rouge chapter.</div></div></div>
      <div class="team-card"><div class="team-card-photo"><img src="${ASSETS}stan_board.avif" alt="Stanley Savage"></div><div class="team-card-info"><div class="team-card-name">Stanley Savage</div><div class="team-card-role">Treasurer</div><div class="team-card-bio">Manager of Financial Audit at Blue Cross Blue Shield. VP Finance, 100 Black Men of Metro Baton Rouge.</div></div></div>
    </div>
  </div>
</section>

<!-- PRESS -->
<section class="press reveal">
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
        <div class="press-card-small-logo"><div style="font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 700; color: var(--ab-dark);">Steve Harvey Show</div></div>
        <div class="press-type">TV Appearance</div><h4>P3 Founders on Steve Harvey</h4>
      </a>
      <a class="press-card-small" href="https://advertisingweek.com/advertising-weeks-six-degrees/" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><img src="${ASSETS}sixdegrees.png" alt="SixDegrees.org"></div>
        <div class="press-type">Partnership</div><h4>Kevin Bacon's SixDegrees.org Partner</h4>
      </a>
      <a class="press-card-small" href="https://www.goodmorningamerica.com/amp/video/61046557" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; color: var(--ab-dark);">Good Morning America</div></div>
        <div class="press-type">TV Feature</div><h4>P3 Founders Featured on GMA</h4>
      </a>
      <a class="press-card-small" href="https://youtu.be/V7VHW17jrEM?si=Qczuy7zbzU6assg7" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 700; color: var(--ab-dark);">Sister Circle</div></div>
        <div class="press-type">TV Appearance</div><h4>P3 Founders on Sister Circle</h4>
      </a>
      <a class="press-card-small" href="https://www.blackenterprise.com/pulse-perseverance-three-black-men-become-doctors-odds/" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; color: var(--ab-dark);">Black Enterprise</div></div>
        <div class="press-type">Feature Article</div><h4>Three Black Men Become Doctors Against the Odds</h4>
      </a>
      <a class="press-card-small" href="https://youtu.be/BXI1EHdVHX0?si=hA2Mw4NaTRNvEQPc" target="_blank" rel="noopener">
        <div class="press-card-small-logo"><div style="font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; color: var(--ab-dark);">Windy City Live</div></div>
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
        <img src="${ASSETS}sneakers-to-scrubs.png" alt="Sneakers to Scrubs">
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
        <img src="${ASSETS}3advance.png" alt="3Advance">
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
    <a href="https://www.pulseofp3.org/partner" class="cta-btn-outline">Partner With Us</a>
  </div>
</section>

`;

  // Build NAV (siblings of #ab-root, NOT inside it — keeps Webflow's .p3-nav styles untouched
  // by our #ab-root universal reset).
  var navWrap = document.createElement('div');
  navWrap.innerHTML = `
<div class="p3-nav" id="p3nav">
  <a class="p3-nav-logo w-inline-block" href="/">
    <img src="${WF_NAV_LOGO}" alt="Pulse of Perseverance Project">
  </a>
  <div class="p3-nav-links">
    <a class="pp-home-desktop-hide" href="/">Home</a>
    <a class="p3-nav-link" href="/for-students">For Students</a>
    <a class="p3-nav-link" href="/partner">For Institutions</a>
    <a class="p3-nav-link" href="/for-mentors">For Mentors</a>
    <a class="p3-nav-link" href="/about/about">About</a>
  </div>
  <a class="p3-nav-cta" href="/download">Get the App</a>
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
      <p>Chicago, IL · Founded 2018</p>
    </div>
    <div class="p3-footer-col">
      <h4>Platform</h4>
      <a href="/for-students">For Students</a>
      <a href="/for-mentors">For Mentors</a>
      <a href="/partner">For Institutions</a>
      <a href="/scholarships">Scholarships</a>
    </div>
    <div class="p3-footer-col">
      <h4>About</h4>
      <a href="/about/about">Our Story</a>
      <a href="/about/about#team">Team</a>
      <a href="/about/in-the-press">Press</a>
      <a href="/donate">Donate</a>
    </div>
    <div class="p3-footer-col">
      <h4>Connect</h4>
      <a href="https://www.instagram.com/pulseofp3/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.linkedin.com/company/pulseofperseverance" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://www.youtube.com/@PulseofPerseveranceProject" target="_blank" rel="noopener">YouTube</a>
      <a href="/donate">Donate</a>
    </div>
  </div>
  <div class="p3-footer-bottom">
    <span>© 2026 Pulse of Perseverance Project. All rights reserved.</span>
    <span aria-hidden="true">·</span>
    <a href="/app-terms-conditions">Terms &amp; Conditions</a>
  </div>
</section>`;
  var footEl = footWrap.firstElementChild;

  // Mount: nav → ab-root content → footer
  document.body.appendChild(navEl);
  document.body.appendChild(root);
  document.body.appendChild(footEl);

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
  // so re-trigger after DOM is built.
  function scrollToHash() {
    var h = window.location.hash;
    if (!h || h.length < 2) return;
    var el = document.getElementById(h.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  setTimeout(scrollToHash, 50);
  setTimeout(scrollToHash, 400);
})();
