/* Joy D'Vivre Wellness — main.js
   Scroll reveals, sticky header, mobile nav, active link highlighting */

(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var nav = document.getElementById('site-nav');
  var toggle = document.getElementById('nav-toggle');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky header shadow ---------- */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  function closeNav() {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      closeNav();
    }
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  /* Stagger children inside .stagger containers */
  document.querySelectorAll('.stagger').forEach(function (group) {
    Array.prototype.slice.call(group.querySelectorAll('.reveal')).forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 0.09) + 's');
    });
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var pending = reveals.slice();

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });

    /* Elements can be jumped past without ever intersecting (anchor links,
       loading with a #hash) — reveal anything that ends up above the viewport
       so it isn't stuck invisible when the visitor scrolls back up. */
    var sweepQueued = false;
    function revealAbove() {
      sweepQueued = false;
      for (var i = pending.length - 1; i >= 0; i--) {
        var el = pending[i];
        if (el.classList.contains('in-view')) {
          pending.splice(i, 1);
        } else if (el.getBoundingClientRect().bottom < 0) {
          el.classList.add('in-view');
          revealObserver.unobserve(el);
          pending.splice(i, 1);
        }
      }
    }
    window.addEventListener('scroll', function () {
      if (!sweepQueued && pending.length) {
        sweepQueued = true;
        requestAnimationFrame(revealAbove);
      }
    }, { passive: true });
    revealAbove();
  }

  /* ---------- Active nav link while scrolling ---------- */
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Catch images that failed before JS loaded ---------- */
  document.querySelectorAll('img[data-ph]').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0 && !img.classList.contains('is-placeholder')) {
      window.imgFallback(img);
    }
  });
})();
