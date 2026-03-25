// ===== SMOOTH NAV SHADOW / SCROLL PROGRESS =====
    // Function: updateScrollUI()
    // Purpose: Update scroll progress bar width and toggle nav shadow on scroll.
    // Triggers: Window scroll events.
    function updateScrollUI() {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop || 0;
      var scrollHeight = document.body.scrollHeight - window.innerHeight;
      var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      var bar = document.getElementById('progress-bar');
      var nav = document.getElementById('site-nav');
      if (bar) bar.style.width = Math.max(0, Math.min(100, progress)) + '%';
      if (nav) nav.classList.toggle('scrolled', scrollTop > 50);
    }

    // ===== FADE-UP SCROLL REVEAL =====
    // Function: revealOnView()
    // Purpose: Add visible class to elements as they enter viewport.
    // Triggers: IntersectionObserver with threshold 0.1.
    function revealOnView() {
      var items = document.querySelectorAll('.fade-up');
      var observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      items.forEach(function(item) { observer.observe(item); });
    }

    // ===== COUNT-UP ANIMATION =====
    // Function: animateCount(el)
    // Purpose: Animate stat counters from 0 to target using requestAnimationFrame.
    // Triggers: When .count-up element enters viewport.
    function animateCount(el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var start = null;
      var duration = 1500;
      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toString();
      }
      requestAnimationFrame(step);
    }

    // ===== COUNT-UP OBSERVER =====
    // Function: observeCounters()
    // Purpose: Trigger count-up animation once when counters appear in view.
    // Triggers: IntersectionObserver on .count-up elements.
    function observeCounters() {
      var counters = document.querySelectorAll('.count-up');
      var seen = new WeakSet();
      var observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      counters.forEach(function(counter) { observer.observe(counter); });
    }

    // ===== CONTACT FORM HANDLER =====
    // Function: handleContactSubmit(e)
    // Purpose: Prevent default submit, hide form, and show success message.
    // Triggers: Contact form submission.
    function handleContactSubmit(e) {
      e.preventDefault();
      var form = document.getElementById('contact-form');
      var success = document.getElementById('contact-success');
      if (form) form.classList.add('hidden');
      if (success) success.classList.remove('hidden');
    }

    document.addEventListener('DOMContentLoaded', function() {
      revealOnView();
      observeCounters();
      updateScrollUI();

      var form = document.getElementById('contact-form');
      if (form) form.addEventListener('submit', handleContactSubmit);

      document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
          var href = this.getAttribute('href');
          if (href && href.length > 1) {
            var target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    });

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('resize', updateScrollUI, { passive: true });