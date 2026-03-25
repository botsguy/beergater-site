// ===== SCROLL PROGRESS BAR =====
    // Function: updateScrollProgress()
    // Purpose: Update the top progress indicator as the user scrolls the page.
    function updateScrollProgress() {
      const progress = document.getElementById('scrollProgress');
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = percentage + '%';
    }

    // ===== NAV SHADOW ON SCROLL =====
    // Function: updateNavShadow()
    // Purpose: Add subtle depth to the sticky navigation while scrolling.
    function updateNavShadow() {
      const header = document.querySelector('header');
      header.classList.toggle('shadow-lg', window.scrollY > 10);
      header.classList.toggle('shadow-black/20', window.scrollY > 10);
    }

    // ===== FADE-UP REVEAL OBSERVER =====
    // Function: setupFadeUpObserver()
    // Purpose: Reveal sections with a smooth rise-and-fade animation when visible.
    function setupFadeUpObserver() {
      const elements = document.querySelectorAll('.fade-up');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.15 });
      elements.forEach((el) => observer.observe(el));
    }

    // ===== COUNT-UP STAT ANIMATION =====
    // Function: animateCountUp(el)
    // Purpose: Animate stat numbers into place for stronger visual impact.
    function animateCountUp(el) {
      const targetText = el.textContent.trim();
      const numericMatch = targetText.match(/[\d.]+/);
      if (!numericMatch) return;
      const target = parseFloat(numericMatch[0]);
      const suffix = targetText.replace(/[\d.]+/g, '');
      const isInteger = Number.isInteger(target);
      let current = 0;
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = target * (0.15 + 0.85 * progress);
        el.textContent = (isInteger ? Math.floor(current) : current.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = targetText;
      }

      requestAnimationFrame(tick);
    }

    // ===== COUNT-UP ON VIEW =====
    // Function: setupCountUpObserver()
    // Purpose: Trigger animated stat count-up when stats enter the viewport.
    function setupCountUpObserver() {
      const nums = document.querySelectorAll('.count-num');
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCountUp(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      nums.forEach((el) => observer.observe(el));
    }

    // ===== CART SIDEBAR LOGIC =====
    // Function: openCart()
    // Purpose: Show the cart sidebar and overlay.
    function openCart() {
      document.getElementById('cartSidebar').classList.add('open');
      document.getElementById('overlay').classList.remove('hidden');
    }

    // Function: closeCart()
    // Purpose: Hide the cart sidebar and overlay.
    function closeCart() {
      document.getElementById('cartSidebar').classList.remove('open');
      document.getElementById('overlay').classList.add('hidden');
    }

    // Function: showToast(message)
    // Purpose: Display a temporary confirmation message.
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    }

    // Function: updateCartUI()
    // Purpose: Keep cart count and total in sync with the visible state.
    function updateCartUI() {
      document.getElementById('cart-count').textContent = '1';
      document.getElementById('cartQty').textContent = '1';
      document.getElementById('cartTotal').textContent = '299.99';
    }

    // ===== VIDEO SOUND TOGGLE =====
    // Function: setupVideoSoundToggle()
    // Purpose: Enable users to unmute the hero video and toggle mute back on.
    function setupVideoSoundToggle() {
      const vid = document.getElementById('heroVideo');
      const btn = document.getElementById('soundBtn');
      btn.addEventListener('click', function () {
        if (vid.muted) {
          vid.muted = false;
          vid.currentTime = 0;
          vid.play();
          btn.textContent = '🔇 Mute';
        } else {
          vid.muted = true;
          btn.textContent = '🔊 Turn On Sound';
        }
      });
    }

    // ===== SMOOTH SCROLL ANCHORS =====
    // Function: setupSmoothAnchors()
    // Purpose: Smoothly scroll internal anchor links to their sections.
    function setupSmoothAnchors() {
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', function (e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    // ===== CONTACT FORM SUBMIT =====
    // Function: handleContactSubmit(e)
    // Purpose: Simulate a successful message send and show confirmation.
    function handleContactSubmit(e) {
      e.preventDefault();
      const success = document.getElementById('formSuccess');
      success.classList.remove('hidden');
      e.target.reset();
    }

    // ===== INITIALIZE PAGE INTERACTIONS =====
    // Function: init()
    // Purpose: Wire up all page interactions after DOM content is available.
    function init() {
      updateScrollProgress();
      updateNavShadow();
      setupFadeUpObserver();
      setupCountUpObserver();
      setupVideoSoundToggle();
      setupSmoothAnchors();
      updateCartUI();

      window.addEventListener('scroll', () => { updateScrollProgress(); updateNavShadow(); }, { passive: true });
      document.getElementById('addToCartBtn').addEventListener('click', function () {
        openCart();
        updateCartUI();
        showToast('Added to cart');
      });
      document.getElementById('closeCart').addEventListener('click', closeCart);
      document.getElementById('overlay').addEventListener('click', closeCart);
      document.getElementById('cart-icon').addEventListener('click', openCart);
      document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    }

    document.addEventListener('DOMContentLoaded', init);