/* ==========================================================================
   Kripik Balado Salsabila — Script utama
   1. Toggle navigasi mobile
   2. Header shadow saat scroll
   3. Reveal on scroll
   4. Page transition (fade in / fade out antar halaman)
   5. Tahun otomatis di footer
   ========================================================================== */

(function () {
  'use strict';

  /* 1. Navigasi mobile ------------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 2. Header shadow saat scroll ------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 3. Reveal on scroll ----------------------------------------------------- */
  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealItems.forEach((el) => observer.observe(el));
    } else {
      revealItems.forEach((el) => el.classList.add('visible'));
    }
  }

  /* 4. Page transition ------------------------------------------------------ */
  const pageFade = document.querySelector('.page-fade');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fade-in saat halaman selesai dimuat.
  if (pageFade) {
    requestAnimationFrame(() => pageFade.classList.add('is-ready'));
  }

  // Anggap sebuah link sebagai navigasi internal ke halaman lain (bukan anchor,
  // bukan target baru, bukan link eksternal / mailto / wa.me).
  function isInternalPageLink(anchor) {
    if (!anchor) return false;
    if (anchor.target === '_blank') return false;
    if (anchor.hasAttribute('download')) return false;

    const href = anchor.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return false;
    }

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    // Hanya untuk perpindahan ke dokumen HTML yang berbeda.
    return url.pathname !== window.location.pathname;
  }

  if (pageFade && !prefersReducedMotion) {
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = event.target.closest('a');
      if (!isInternalPageLink(anchor)) return;

      event.preventDefault();
      const destination = anchor.href;
      pageFade.classList.add('is-leaving');

      let navigated = false;
      const go = () => {
        if (navigated) return;
        navigated = true;
        window.location.href = destination;
      };

      pageFade.addEventListener('transitionend', go, { once: true });
      // Fallback jika transitionend tidak terpicu.
      setTimeout(go, 500);
    });

    // Pulihkan tampilan saat kembali dari cache (tombol back/forward).
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        pageFade.classList.remove('is-leaving');
        pageFade.classList.add('is-ready');
      }
    });
  }

  /* 5. Tahun otomatis ------------------------------------------------------- */
  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  /* 6. Custom cursor -------------------------------------------------------- */
  // Aktif hanya pada perangkat dengan pointer presisi (mouse/trackpad) dan
  // ketika pengguna tidak meminta pengurangan gerakan.
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (hasFinePointer && !prefersReducedMotion) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.body.classList.add('has-custom-cursor');

    // Posisi terkini pointer dan posisi ring yang mengejar (efek lag halus).
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;

    const interactiveSelector = 'a, button, input, textarea, select, label, .gallery-item, [role="button"], .product-card, .filter-btn';

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      if (!visible) {
        visible = true;
        document.body.classList.add('cursor-active');
      }

      const el = event.target instanceof Element ? event.target : null;
      const target = el ? el.closest(interactiveSelector) : null;
      document.body.classList.toggle('cursor-hover', Boolean(target));
    });

    // Sembunyikan saat pointer meninggalkan jendela.
    document.addEventListener('mouseleave', () => {
      visible = false;
      document.body.classList.remove('cursor-active');
    });
    document.addEventListener('mouseenter', () => {
      visible = true;
      document.body.classList.add('cursor-active');
    });

    // Umpan balik saat menekan.
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));

    // Animasi ring mengejar posisi pointer.
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);
  }
})();
