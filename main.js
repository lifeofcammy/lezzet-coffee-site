/* ============================================================
   Lezzet Coffee — Shared JavaScript
   Header/Footer injection + Mobile menu
   ============================================================ */

/**
 * Renders the site header into #site-header
 * @param {string} activePage - current page key for active nav highlight
 *   Options: 'home', 'about', 'brew', 'fortune', 'faq', 'blog', 'shop'
 * @param {boolean} isSubpage - true if page is in a subdirectory (e.g., /blog/)
 */
function renderHeader(activePage, isSubpage) {
  const prefix = isSubpage ? '../' : '';
  const el = document.getElementById('site-header');
  if (!el) return;

  const navItems = [
    { key: 'about',   label: 'About',          href: prefix + 'about.html' },
    { key: 'brew',    label: 'How to Brew',     href: prefix + 'brew.html' },
    { key: 'fortune', label: 'Fortune Reading',  href: prefix + 'fortune.html' },
    { key: 'blog',    label: 'Blog',            href: prefix + 'blog/' },
    { key: 'faq',     label: 'FAQ',             href: prefix + 'faq.html' },
  ];

  const links = navItems.map(item =>
    `<a href="${item.href}" class="${activePage === item.key ? 'active' : ''}">${item.label}</a>`
  ).join('');

  const mobileLinks = navItems.map(item =>
    `<a href="${item.href}">${item.label}</a>`
  ).join('') + `<a href="https://jminvw-uw.myshopify.com/products/lezzet-specialty-grade-turkish-coffee-classic-12-oz" class="nav-shop" style="text-align:center;margin-top:auto;">Shop Now</a>`;

  el.innerHTML = `
    <header class="site-header">
      <nav class="nav">
        <a href="${prefix}index.html" class="nav-logo">
          <img src="${prefix}images/logo.png" alt="Lezzet Coffee" class="nav-logo-img">
          <div>
            <div class="nav-logo-text">Lezzet</div>
            <div class="nav-logo-sub">Specialty Turkish Coffee</div>
          </div>
        </a>
        <div class="nav-links">
          ${links}
          <a href="https://jminvw-uw.myshopify.com/products/lezzet-specialty-grade-turkish-coffee-classic-12-oz" class="nav-shop">Shop Now</a>
        </div>
        <button class="nav-hamburger" onclick="toggleMobileMenu()" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div class="nav-mobile" id="nav-mobile">
        ${mobileLinks}
      </div>
    </header>
  `;
}

/**
 * Renders the site footer into #site-footer
 * @param {boolean} isSubpage - true if page is in a subdirectory
 */
function renderFooter(isSubpage) {
  const prefix = isSubpage ? '../' : '';
  const el = document.getElementById('site-footer');
  if (!el) return;

  const year = new Date().getFullYear();

  el.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>Lezzet</h3>
            <p>Specialty-grade Turkish coffee, freshly roasted in the USA. 500 years of tradition, brewed fresh for you.</p>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <a href="${prefix}about.html">About</a>
            <a href="${prefix}brew.html">How to Brew</a>
            <a href="${prefix}fortune.html">Fortune Reading</a>
            <a href="${prefix}blog/">Blog</a>
            <a href="${prefix}faq.html">FAQ</a>
          </div>
          <div class="footer-col">
            <h4>Shop</h4>
            <a href="https://lezzetcoffee.com">Shop Coffee</a>
            <a href="https://lezzetcoffee.com">Shipping Info</a>
            <a href="https://lezzetcoffee.com">Returns</a>
          </div>
          <div class="footer-col footer-newsletter">
            <h4>Stay in the Loop</h4>
            <p>Get brewing tips, fortune guides, and early access to new blends.</p>
            <form class="footer-newsletter-form" onsubmit="event.preventDefault();">
              <input type="email" placeholder="Your email" aria-label="Email address">
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${year} Lezzet Coffee. All rights reserved.</span>
          <div class="footer-social">
            <a href="https://instagram.com/lezzetcoffee" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
            <a href="https://tiktok.com/@lezzetcoffee" target="_blank" rel="noopener" aria-label="TikTok">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobile = document.getElementById('nav-mobile');
  if (!hamburger || !mobile) return;

  hamburger.classList.toggle('open');
  mobile.classList.toggle('open');

  // Prevent body scroll when menu is open
  document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
}

// Close mobile menu on resize to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobile = document.getElementById('nav-mobile');
    if (hamburger && mobile) {
      hamburger.classList.remove('open');
      mobile.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

/* === Scroll Reveal === */
document.addEventListener('DOMContentLoaded', function() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function(el) { observer.observe(el); });
});
