(function() {
  /* ═══════════════════════════════════════════════════════════════════
     contact-combined.js — P3 Contact

     Repo:  TParis7/About-Page-Redesign (beside about-combined.js; the page
            lives under /about)
     CDN:   https://tparis7.github.io/About-Page-Redesign/contact-combined.js
     Page:  /about/contact (Webflow page 69b02f65f0068e9fb16f0ad3). /contact
            301s here, and it is the Support URL on the App Store listing.

     Why this exists: the contact page was the last public page still on the
     old Webflow template (old nav, the cart, a 2025 copyright). Built Oct 26
     2026 for the Pulse Launch go-live, the way the Terms page was built.

     THE FORM KEEPS WORKING THE WAY IT DID. It posts to Webflow's form
     endpoint as the page's own native form, with the native field names, so
     messages land in the Webflow Forms panel and the team's email as before.
     Changed on purpose: Phone and School or organization are optional, the
     message is required, and the news checkbox is no longer required (it
     was a condition of sending, which is not consent).

     Architecture mirrors terms-combined.js: the nav, the mobile overlay and
     the footer are BODY-LEVEL SIBLINGS of #ct-root, never nested inside it,
     so they inherit Webflow's site-level body font like every other page's
     chrome. Their markup and CSS are copied from terms-combined.js verbatim;
     the nav v2 block is owned by Website Folder/site-chrome/apply-nav.py.
     ═══════════════════════════════════════════════════════════════════ */

  if (document.getElementById('ct-root')) return;

  /* Webflow IX2 fades the body in with the Web Animations API, which beats
     any CSS. Cancel it, the way every rebuilt page does. */
  function cancelBodyAnimations() {
    if (document.body.getAnimations) {
      document.body.getAnimations().forEach(function(a) { a.cancel(); });
    }
    document.body.style.setProperty('opacity', '1', 'important');
  }
  cancelBodyAnimations();
  document.addEventListener('DOMContentLoaded', cancelBodyAnimations);
  window.addEventListener('load', cancelBodyAnimations);
  setTimeout(cancelBodyAnimations, 100);
  setTimeout(cancelBodyAnimations, 500);
  setTimeout(cancelBodyAnimations, 1500);

  document.body.classList.add('ct-active');

  /* ── 1. CSS ─────────────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.innerHTML = `
/* Chrome (nav, mobile overlay, footer) copied verbatim from fs-combined.js.
   Top-level rules and their media blocks are kept separate on purpose: pulled
   flat, the 991px rules would hide the nav links at every width. */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
.p3-nav { position: fixed; top: 0; left: 0; right: 0; height: auto; padding: 16px 40px; display: flex; align-items: center; justify-content: space-between; background: transparent; transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s; z-index: 1000; }
.p3-nav.scrolled { background: rgba(26, 26, 26, 0.95) !important; backdrop-filter: blur(20px) !important; box-shadow: 0 2px 20px rgba(0,0,0,0.15); }
.p3-nav-logo { text-decoration: none; z-index: 10; }
.p3-nav-logo-img { height: 36px; max-height: 36px; }
.p3-nav-links { display: flex; align-items: center; gap: 32px; margin-left: auto; }
.p3-nav-links a { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; }
.p3-nav-links a.w--current, .p3-nav-links a.p3-nav-link.w--current { color: rgba(255,255,255,0.85) !important; font-weight: 500 !important; }
.p3-nav.scrolled .p3-nav-links a.w--current { color: rgba(255,255,255,0.85) !important; font-weight: 500 !important; }
.p3-nav-cta { background: #D93A3A; color: #fff !important; padding: 10px 24px; border-radius: 50px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; transition: background 0.2s, transform 0.2s; margin-left: 0; }
.p3-nav-cta:hover { background: #b52f2f; transform: translateY(-1px); }
.pp-mob-menu { display: none; flex-direction: column; gap: 5px; cursor: pointer; z-index: 1001; }
.pp-mob-menu span { width: 24px; height: 2.5px; background: #fff; border-radius: 2px; transition: all 0.3s; }
.pp-mob-menu.open span:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }
.pp-mob-menu.open span:nth-child(2) { opacity: 0; }
.pp-mob-menu.open span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }
.pp-mob-overlay { position: fixed; inset: 0; background-color: rgba(26, 10, 16, 0.97); z-index: 999; display: none; flex-direction: column; justify-content: center; align-items: center; gap: 28px; opacity: 0; transform: translateY(-100%); transition: opacity 0.3s, transform 0.3s; overflow-y: auto; }
.pp-mob-overlay.open { display: flex !important; opacity: 1; transform: translateY(0); }
.pp-mob-overlay-link, .pp-mob-overlay-cta { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 500; color: #fff; opacity: 0.85; text-decoration: none; transition: color 0.2s; }
.pp-mob-overlay-link.w--current { opacity: 0.85 !important; font-weight: 500 !important; }
.pp-mob-overlay-cta { opacity: 1; background: #D93A3A; color: #fff; padding: 12px 32px; border-radius: 100px; display: inline-block; text-align: center; margin-top: 8px; font-size: 1rem; font-weight: 600; }
.p3-footer { background: #0a0a0a; padding: 64px 40px 32px; color: #fff; }
.p3-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; max-width: 1180px; margin: 0 auto; }
.p3-footer-brand p { color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.6; margin-top: 12px; }
.p3-footer-logo { height: 36px; margin-bottom: 8px; }
.p3-footer-tagline { color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.6; margin-top: 12px; }
.p3-footer-location { color: rgba(255,255,255,0.5); font-size: 13px; margin-top: 4px; }
.p3-footer-col-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.8); margin-bottom: 16px; }
.p3-footer-col { display: flex; flex-direction: column; gap: 10px; }
.p3-footer-link { color: rgba(255,255,255,0.6); font-size: 13px; text-decoration: none; transition: color 0.2s; }
.p3-footer-link:hover { color: #fff; }
.p3-footer-bottom { margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); }

@media (max-width: 991px) {
  .pp-mob-menu { display: flex; }
  .p3-nav-links, .p3-nav-cta { display: none !important; }
  .p3-nav { padding: 16px !important; height: 64px !important; }
  .p3-nav .p3-nav-logo-img { max-height: 36px !important; height: 36px !important; }
}

@media (max-width: 768px) {
  .p3-footer-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 24px 16px !important; }
  .p3-footer-brand { grid-column: 1 / -1; }
  .p3-footer-bottom { flex-wrap: wrap; justify-content: center; text-align: center; }
}

/* body.ct-active is this page's equivalent of body.fm-active. */
body.ct-active { background: #fff; margin: 0; padding: 0; opacity: 1 !important; }
/* Hide the old template's own page content; ours replaces it. */
body.ct-active > *:not(#ct-root):not(#p3nav):not(#pp-mob-overlay):not(.p3-footer):not(script):not(style):not(link) { display: none !important; }

/* ── Page ────────────────────────────────────────────────────────────── */
/* fs-combined.js leans on Webflow's base CSS for the space between the last
   nav link and the CTA. This page states it, so the two never collide. */
.p3-nav { gap: 32px; }

#ct-root { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; color: #1a1a1a; -webkit-font-smoothing: antialiased; line-height: 1.6; background: #FAF7F4; }
#ct-root img { max-width: 100%; display: block; }
#ct-root a { color: inherit; }
#ct-root h1, #ct-root h2 { font-family: 'Bricolage Grotesque', sans-serif; line-height: 1.2; }
/* Webflow's compiled stylesheet uppercases labels and sets its own button and input looks on this page; state ours. */
#ct-root label, #ct-root button, #ct-root input, #ct-root select, #ct-root textarea { text-transform: none; letter-spacing: normal; }

/* Hero: the same maroon band the Terms page opens on, kept short (Thomas, Oct 28 2026: title, one line, and on phones the email). */
.ct-hero { background: linear-gradient(135deg, #2e0614 0%, #4A1020 55%, #5a1226 100%); color: #fff; padding: 124px 40px 52px; position: relative; overflow: hidden; }
.ct-hero::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 85% 20%, rgba(217,58,58,0.42), transparent 55%); pointer-events: none; }
.ct-hero-inner { max-width: 1180px; margin: 0 auto; position: relative; z-index: 1; }
.ct-hero h1 { font-size: clamp(2.1rem, 5vw, 3.2rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 10px; color: #fff; }
.ct-hero h1 .accent { color: #D93A3A; }
.ct-hero p { font-size: 1.05rem; color: rgba(255,255,255,0.8); max-width: 58ch; text-wrap: pretty; }
/* Phones only: the email sits in the hero, so someone arriving from the App Store's App Support link sees it without scrolling past the form. Desktop has the email card beside the form instead. */
#ct-root .ct-hero-mail { display: none; align-items: center; min-height: 44px; margin-top: 18px; padding: 0 18px; border: 1px solid rgba(255,255,255,0.28); border-radius: 999px; background: rgba(255,255,255,0.08); color: #fff; font-size: 15px; font-weight: 600; text-decoration: none; }

/* Form on the left, the other ways in on the right. */
/* 1260 = the hero's 1180 plus this padding, so the form lines up with the hero text. */
.ct-body { max-width: 1260px; margin: 0 auto; padding: 56px 40px 96px; display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 40px; align-items: start; }

.ct-card { background: #fff; border: 1px solid #ECE9E6; border-radius: 18px; padding: 40px 44px; box-shadow: 0 18px 40px -24px rgba(74,16,32,0.25); }
.ct-card h2 { font-size: 1.5rem; font-weight: 600; color: #4A1020; letter-spacing: -0.01em; margin-bottom: 24px; }
.ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 18px; }
.ct-field { display: flex; flex-direction: column; min-width: 0; }
.ct-field.full { grid-column: 1 / -1; }
.ct-label { font-size: 0.82rem; font-weight: 600; color: #1a1a1a; margin-bottom: 7px; }
.ct-label .ct-opt { font-weight: 500; color: #8A8580; }
/* 16px text in every field: below 16px, iPhone Safari zooms the page in when a field is tapped. */
.ct-input, .ct-select, .ct-textarea { width: 100%; height: auto; margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; line-height: 1.5; color: #1a1a1a; background: #fdfbfa; border: 1px solid #E2DDD8; border-radius: 10px; padding: 12px 14px; box-shadow: none; transition: border-color .18s, box-shadow .18s, background .18s; }
.ct-select { appearance: none; -webkit-appearance: none; padding-right: 40px; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%234A1020' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 15px center; }
.ct-textarea { min-height: 150px; resize: vertical; }
.ct-input::placeholder, .ct-textarea::placeholder { color: #b8aeab; }
.ct-input:focus, .ct-select:focus, .ct-textarea:focus { outline: none; border-color: #D93A3A; background-color: #fff; box-shadow: 0 0 0 3px rgba(217,58,58,0.12); }

.ct-checks { display: flex; flex-direction: column; gap: 10px; margin-top: 22px; }
.ct-check { display: flex; align-items: flex-start; gap: 10px; margin: 0; font-size: 0.9rem; font-weight: 400; color: #4A4540; line-height: 1.55; cursor: pointer; }
.ct-check input[type=checkbox] { flex: none; width: 18px; height: 18px; margin: 2px 0 0; accent-color: #D93A3A; }
#ct-root .ct-check a { color: #D93A3A; text-decoration: underline; }

.ct-submit-row { margin-top: 26px; padding-top: 24px; border-top: 1px solid #F1EEEB; }
.ct-submit { display: inline-flex; align-items: center; gap: 8px; margin: 0; padding: 14px 34px; border: none; border-radius: 999px; background: #D93A3A; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; line-height: 1.2; cursor: pointer; box-shadow: 0 8px 22px rgba(217,58,58,0.30); transition: background .2s, transform .2s, box-shadow .2s; }
.ct-submit:hover { background: #B82E2E; transform: translateY(-1px); box-shadow: 0 12px 30px rgba(217,58,58,0.38); }
.ct-submit:focus-visible { outline: 2px solid #4A1020; outline-offset: 3px; }
.ct-submit[disabled] { opacity: 0.7; cursor: default; transform: none; }

.ct-status { display: none; padding: 16px 20px; border-radius: 12px; margin-bottom: 22px; font-size: 0.94rem; }
.ct-status.show { display: block; }
.ct-status.ok { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #166534; }
.ct-status.err { background: rgba(217,58,58,0.08); border: 1px solid rgba(217,58,58,0.28); color: #7b1a1a; }

.ct-side { display: flex; flex-direction: column; gap: 12px; }
.ct-mail { background: #4A1020; color: #fff; border-radius: 16px; padding: 24px; }
.ct-mail-title { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 8px; }
#ct-root .ct-mail a { display: inline-block; font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.2rem; font-weight: 600; color: #fff; text-decoration: none; word-break: break-word; }
#ct-root .ct-mail a:hover { text-decoration: underline; }
.ct-mail p { margin-top: 6px; font-size: 13px; color: rgba(255,255,255,0.7); }
#ct-root .ct-link { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 2px 12px; background: #fff; border: 1px solid #ECE9E6; border-radius: 14px; padding: 16px 18px; text-decoration: none; color: #1a1a1a; transition: border-color .18s, transform .18s, box-shadow .18s; }
#ct-root .ct-link:hover { border-color: #D93A3A; transform: translateY(-1px); box-shadow: 0 10px 24px -16px rgba(74,16,32,0.35); }
.ct-link-who { grid-column: 1; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8580; }
.ct-link-what { grid-column: 1; font-size: 15px; font-weight: 600; color: #4A1020; }
.ct-link-arrow { grid-column: 2; grid-row: 1 / span 2; font-size: 18px; color: #D93A3A; }

@media (max-width: 991px) {
  .ct-hero { padding: 104px 24px 36px; }
  .ct-body { grid-template-columns: 1fr; gap: 24px; padding: 32px 24px 72px; }
  #ct-root .ct-hero-mail { display: inline-flex; }
  .ct-side .ct-mail { display: none; }
}
@media (max-width: 600px) {
  .ct-hero { padding: 92px 20px 28px; }
  .ct-hero p { font-size: 1rem; }
  .ct-body { padding: 20px 16px 56px; gap: 16px; }
  .ct-card { padding: 24px 18px; border-radius: 16px; }
  .ct-card h2 { font-size: 1.3rem; margin-bottom: 18px; }
  .ct-grid { grid-template-columns: 1fr; gap: 14px; }
  .ct-textarea { min-height: 130px; }
  /* whole rows are the tap target, 44px tall */
  .ct-checks { gap: 4px; margin-top: 16px; }
  .ct-check { min-height: 44px; align-items: center; }
  .ct-check input[type=checkbox] { width: 22px; height: 22px; margin: 0; }
  .ct-submit-row { margin-top: 16px; padding-top: 18px; }
  .ct-submit { width: 100%; min-height: 52px; justify-content: center; font-size: 15px; }
}


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

  /* ── 2. Fonts ───────────────────────────────────────────────────────── */
  var fontPreconnect = document.createElement('link');
  fontPreconnect.rel = 'preconnect';
  fontPreconnect.href = 'https://fonts.gstatic.com';
  fontPreconnect.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreconnect);
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:wght@400..800&display=swap';
  document.head.appendChild(fontLink);

  /* ── 3. Nav + mobile overlay (body-level siblings) ──────────────────── */
  var nav = document.createElement('div');
  nav.id = 'p3nav';
  nav.className = 'p3-nav';
  nav.innerHTML = `<a href="https://www.pulseofp3.org/" class="p3-nav-logo" aria-label="Pulse of Perseverance Project"><img src="https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b02f65f0068e9fb16f0df1_P3%20Logo.svg" alt="P3 - Pulse of Perseverance" class="p3-nav-logo-img"></a>
  <div class="p3-nav-links">
    <a href="https://www.pulseofp3.org/for-students" class="p3-nav-link">For Students</a>
    <a href="https://www.pulseofp3.org/for-mentors" class="p3-nav-link">For Mentors</a>
    <a href="https://www.pulseofp3.org/platform" class="p3-nav-link">Platform</a>
    <a href="https://www.pulseofp3.org/about/about" class="p3-nav-link">About</a>
  </div>
  <div class="p3-nav-actions">
    <a href="https://enterprise.pulseofp3.org/overview" class="p3-nav-btn p3-nav-btn-enterprise">Enterprise</a>
    <a href="https://platform.pulseofp3.org/" class="p3-nav-btn p3-nav-btn-login">Login</a>
  </div>
  <button type="button" class="pp-mob-menu" id="hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>`;
  document.body.insertBefore(nav, document.body.firstChild);

  var overlay = document.createElement('div');
  overlay.id = 'pp-mob-overlay';
  overlay.className = 'pp-mob-overlay';
  overlay.innerHTML = `<a class="p3-menu-scrim" href="javascript:void(0)" aria-hidden="true" tabindex="-1"></a>
  <div class="p3-menu" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="p3-menu-top">
      <img src="https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b02f65f0068e9fb16f0df1_P3%20Logo.svg" alt="P3" class="p3-menu-logo">
      <a class="p3-menu-close" href="javascript:void(0)" role="button">Close</a>
    </div>
    <nav class="p3-menu-nav" aria-label="Site">
      <a href="https://www.pulseofp3.org/for-students">For Students</a>
      <a href="https://www.pulseofp3.org/for-mentors">For Mentors</a>
      <a href="https://www.pulseofp3.org/platform">Platform</a>
      <a href="https://www.pulseofp3.org/about/about">About</a>
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
  document.body.insertBefore(overlay, nav.nextSibling);

  /* ── 4. The page ────────────────────────────────────────────────────── */
  var root = document.createElement('div');
  root.id = 'ct-root';
  root.innerHTML = `
    <header class="ct-hero">
      <div class="ct-hero-inner">
        <h1>Get in <span class="accent">touch</span></h1>
        <p>We reply within 24 to 48 hours.</p>
        <a class="ct-hero-mail" href="mailto:help@pulseofp3.org">Email help@pulseofp3.org</a>
      </div>
    </header>
    <div class="ct-body">
      <div class="ct-card">
        <h2>Send us a message</h2>
        <div class="ct-status ok" id="ctSuccess" role="status" aria-live="polite"><strong>Thank you.</strong> Your message is on its way. We&rsquo;ll get back to you within 24 to 48 hours.</div>
        <div class="ct-status err" id="ctError" role="alert"></div>
        <!-- Field names and data-names are the native Webflow form's, unchanged
             ("Orgnisation" included), so submissions land where they always have. -->
        <form id="ct-form" method="get">
          <div class="ct-grid">
            <div class="ct-field">
              <label class="ct-label" for="ct-name">Name</label>
              <input class="ct-input" id="ct-name" name="Name" data-name="Name" type="text" maxlength="256" autocomplete="name" autocapitalize="words" enterkeyhint="next" required>
            </div>
            <div class="ct-field">
              <label class="ct-label" for="ct-email">Email</label>
              <input class="ct-input" id="ct-email" name="Email" data-name="Email" type="email" inputmode="email" maxlength="256" autocomplete="email" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="next" required>
            </div>
            <div class="ct-field">
              <label class="ct-label" for="ct-phone">Phone <span class="ct-opt">(optional)</span></label>
              <input class="ct-input" id="ct-phone" name="Phone" data-name="Phone" type="tel" inputmode="tel" maxlength="256" autocomplete="tel" enterkeyhint="next">
            </div>
            <div class="ct-field">
              <label class="ct-label" for="ct-org">School or organization <span class="ct-opt">(optional)</span></label>
              <input class="ct-input" id="ct-org" name="Orgnisation" data-name="Orgnisation" type="text" maxlength="256" autocomplete="organization" autocapitalize="words" enterkeyhint="next">
            </div>
            <div class="ct-field full">
              <label class="ct-label" for="ct-user">I am</label>
              <select class="ct-select" id="ct-user" name="User" data-name="User" required>
                <option value="">Select one</option>
                <option value="Mentee">A student</option>
                <option value="Mentor">A mentor</option>
                <option value="Other">Something else (schools, partners, press)</option>
              </select>
            </div>
            <div class="ct-field full">
              <label class="ct-label" for="ct-message">Message</label>
              <textarea class="ct-textarea" id="ct-message" name="Message" data-name="Message" maxlength="5000" autocapitalize="sentences" required></textarea>
            </div>
          </div>
          <div class="ct-checks">
            <label class="ct-check"><input type="checkbox" id="ct-privacy" name="Privacy-Checked" data-name="Privacy Checked" required><span>I agree to the P3 <a href="https://www.pulseofp3.org/app-terms-conditions#information-we-collect">Privacy Policy</a>.</span></label>
            <label class="ct-check"><input type="checkbox" id="ct-news" name="News-Checked" data-name="News Checked"><span>Send me news from P3.</span></label>
          </div>
          <div class="ct-submit-row">
            <button type="submit" class="ct-submit">Send message <span aria-hidden="true">&rarr;</span></button>
          </div>
        </form>
      </div>
      <aside class="ct-side" aria-label="Other ways to reach us">
        <div class="ct-mail">
          <p class="ct-mail-title">Email</p>
          <a href="mailto:help@pulseofp3.org">help@pulseofp3.org</a>
          <p>Chicago, IL</p>
        </div>
        <a class="ct-link" href="https://www.pulseofp3.org/download"><span class="ct-link-who">Students and mentors</span><span class="ct-link-what">Get the Pulse Launch app</span><span class="ct-link-arrow" aria-hidden="true">&rarr;</span></a>
        <a class="ct-link" href="https://enterprise.pulseofp3.org/overview"><span class="ct-link-who">Schools and organizations</span><span class="ct-link-what">P3 Enterprise</span><span class="ct-link-arrow" aria-hidden="true">&rarr;</span></a>
        <a class="ct-link" href="https://www.pulseofp3.org/about/about#press"><span class="ct-link-who">Press</span><span class="ct-link-what">P3 in the news</span><span class="ct-link-arrow" aria-hidden="true">&rarr;</span></a>
      </aside>
    </div>
  
`;
  document.body.insertBefore(root, document.body.lastChild);

  /* ── 5. Footer (body-level sibling) ─────────────────────────────────── */
  var footer = document.createElement('section');
  footer.className = 'p3-footer';
  footer.innerHTML = `<div class="p3-footer-grid"><div class="p3-footer-brand"><img src="https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b02f65f0068e9fb16f0df1_P3%20Logo.svg" loading="lazy" alt="P3 - Pulse of Perseverance" class="p3-footer-logo"><p class="p3-footer-tagline">Unlocking life-changing opportunities for young visionaries. Free on iOS &amp; Android.</p><p class="p3-footer-location">Chicago, IL &middot; Founded 2018</p><a href="https://www.pulseofp3.org/about/contact" class="p3-footer-link p3-footer-contact" style="align-self:flex-start">Contact Us</a></div><div class="p3-footer-col"><h4 class="p3-footer-col-title">Platform</h4><a href="https://pulseofp3.org/for-students" class="p3-footer-link">For Students</a><a href="https://enterprise.pulseofp3.org/overview" class="p3-footer-link">For Institutions</a><a href="https://pulseofp3.org/for-mentors" class="p3-footer-link">For Mentors</a><a href="https://pulseofp3.org/scholarships" class="p3-footer-link">Scholarships</a></div><div class="p3-footer-col"><h4 class="p3-footer-col-title">About</h4><a href="https://pulseofp3.org/about/about" class="p3-footer-link">Our Story</a><a href="https://pulseofp3.org/about/about#team" class="p3-footer-link">Team</a><a href="https://drive.google.com/file/d/1IrFocCsboO6mLZsG3GAlHjmKv_V7a9Sn/view?usp=drive_link" class="p3-footer-link">Annual Report</a><a href="/about/about#press" class="p3-footer-link">Press</a></div><div class="p3-footer-col"><h4 class="p3-footer-col-title">Connect</h4><a href="https://www.instagram.com/pulseofp3/" class="p3-footer-link">Instagram</a><a href="https://www.linkedin.com/company/pulseofperseverance/" class="p3-footer-link">LinkedIn</a><a href="https://www.youtube.com/@PulseofPerseverance" target="_blank" class="p3-footer-link">YouTube</a><a href="https://pulseofp3.org/donate" class="p3-footer-link">Donate</a></div></div><div class="p3-footer-bottom" style="display:flex;justify-content:center;align-items:center;gap:4px;padding-top:24px;flex-wrap:wrap;"><p style="margin:0;color:rgba(255,255,255,0.4);font-size:12px;">&copy; 2026 Pulse of Perseverance Project. All rights reserved.</p><a href="https://www.pulseofp3.org/app-terms-conditions" class="p3-footer-link" style="font-size:12px;text-decoration:underline;color:rgba(255,255,255,0.4);">Terms &amp; Policies</a></div>`;
  document.body.appendChild(footer);

  /* ── 6. Behaviour ───────────────────────────────────────────────────── */
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  var hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      overlay.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }
  overlay.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      overlay.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
    });
  });

  /* The form posts to Webflow's form endpoint as this page's native form
     (same page id, element id and form name), so messages keep arriving in
     the Webflow Forms panel and the team's notification email exactly as
     they did from the old template. The native form is still in the page,
     hidden; ours carries its field names and data-names. Same approach as
     the /scholarships application (sch-combined.js), proven Apr 2026.
     Keys are the data-names, single-encoded, which Webflow accepts. */
  var WF_SITE_ID = '69b02f65f0068e9fb16f09f7';
  var WF_PAGE_ID = '69b02f65f0068e9fb16f0ad3';      /* /about/contact */
  var WF_ELEMENT_ID = '60dcb428-516f-70ce-11e0-95f4590ce215';
  var WF_FORM_NAME = 'Contact Form';
  var ENDPOINT = 'https://webflow.com/api/v1/form/' + WF_SITE_ID;

  var form = document.getElementById('ct-form');
  var ok = document.getElementById('ctSuccess');
  var err = document.getElementById('ctError');
  var FALLBACK = 'Please try again, or email us at help@pulseofp3.org.';

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    ok.classList.remove('show');
    err.classList.remove('show');
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var parts = [
      'name=' + encodeURIComponent(WF_FORM_NAME),
      'pageId=' + encodeURIComponent(WF_PAGE_ID),
      'elementId=' + encodeURIComponent(WF_ELEMENT_ID),
      'domain=' + encodeURIComponent('www.pulseofp3.org'),
      'collectionId=',
      'itemSlug=',
      'source=' + encodeURIComponent(location.href),
      'test=false'
    ];
    form.querySelectorAll('input, textarea, select').forEach(function(el) {
      if (!el.name) return;
      var key = el.getAttribute('data-name') || el.name;
      var val = el.type === 'checkbox' ? (el.checked ? 'true' : 'false') : el.value;
      parts.push('fields%5B' + encodeURIComponent(key) + '%5D=' + encodeURIComponent(val));
    });

    var btn = form.querySelector('.ct-submit');
    var label = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    function done() { btn.disabled = false; btn.innerHTML = label; }
    function fail(msg) {
      err.textContent = msg + ' ' + FALLBACK;
      err.classList.add('show');
      err.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Accept': 'application/json' },
      body: parts.join('&')
    }).then(function(res) {
      done();
      if (res.ok) {
        form.reset();
        ok.classList.add('show');
        ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        fail('Your message didn’t go through (error ' + res.status + ').');
      }
    }).catch(function() {
      done();
      fail('We couldn’t reach the server.');
    });
  });
})();
