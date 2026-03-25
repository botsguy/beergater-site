// ===== SCROLL PROGRESS BAR =====
    // Function: updateScrollProgress()
    // Purpose: Update the fixed top progress bar based on page scroll position
    function updateScrollProgress() {
      const bar = document.getElementById('scrollProgress');
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrolled / height) * 100 : 0;
      bar.style.width = progress + '%';
    }

    // ===== NAV SHADOW TOGGLE =====
    // Function: updateNavShadow()
    // Purpose: Add depth to the sticky navigation after scrolling
    function updateNavShadow() {
      const header = document.getElementById('siteHeader');
      if (window.scrollY > 10) header.classList.add('nav-scrolled');
      else header.classList.remove('nav-scrolled');
    }

    // ===== FADE-UP INTERSECTION ANIMATION =====
    // Function: initFadeUps()
    // Purpose: Reveal elements smoothly as they enter the viewport
    function initFadeUps() {
      const items = document.querySelectorAll('.fade-up');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      }, { threshold: 0.15 });
      items.forEach(item => observer.observe(item));
    }

    // ===== COUNT-UP ANIMATION =====
    // Function: animateCountUp(el)
    // Purpose: Animate numeric stats from 0 to their target value
    function animateCountUp(el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1300;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(p * target);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    // ===== COUNT-UP OBSERVER =====
    // Function: initStats()
    // Purpose: Trigger count-up animations only when the stats section is visible
    function initStats() {
      const stats = document.querySelectorAll('[data-target]');
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCountUp(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      stats.forEach(stat => observer.observe(stat));
    }

    // ===== CART STATE HANDLING =====
    // Function: openCart() / closeCart()
    // Purpose: Show and hide the off-canvas cart sidebar
    function openCart() {
      document.getElementById('cartSidebar').classList.add('open');
      document.getElementById('cartOverlay').classList.remove('hidden');
    }
    function closeCart() {
      document.getElementById('cartSidebar').classList.remove('open');
      document.getElementById('cartOverlay').classList.add('hidden');
    }

    // ===== CART INTERACTIONS =====
    // Function: initCart()
    // Purpose: Wire cart button, close button, overlay, and checkout action
    function initCart() {
      const cartButton = document.getElementById('cartButton');
      const closeCartBtn = document.getElementById('closeCart');
      const overlay = document.getElementById('cartOverlay');
      const addToCartBtn = document.getElementById('addToCartBtn');
      const checkoutBtn = document.getElementById('checkoutBtn');
      const cartCount = document.getElementById('cart-count');

      cartButton.addEventListener('click', openCart);
      closeCartBtn.addEventListener('click', closeCart);
      overlay.addEventListener('click', closeCart);
      addToCartBtn.addEventListener('click', () => {
        cartCount.textContent = '1';
        openCart();
      });
      checkoutBtn.addEventListener('click', () => {
        window.__processPayment({
          amountCents: 29999,
          email: document.getElementById('email') ? document.getElementById('email').value || '' : '',
          productName: 'BeerGater Portable Kegerator Tap',
          productDescription: 'Portable dual-tap system for tailgates and events',
          name: document.getElementById('name') ? document.getElementById('name').value || '' : '',
          quantity: 1
        });
      });
    }

    // ===== VIDEO SOUND TOGGLE =====
    // Function: initVideoToggle()
    // Purpose: Toggle hero video sound and update button label accordingly
    function initVideoToggle() {
      const video = document.getElementById('heroVideo');
      const btn = document.getElementById('soundBtn');
      btn.addEventListener('click', () => {
        video.muted = !video.muted;
        btn.textContent = video.muted ? '🔊 Turn On Sound' : '🔇 Mute';
      });
    }

    // ===== CONTACT FORM SUCCESS STATE =====
    // Function: initContactForm()
    // Purpose: Show an inline success message on form submission
    function initContactForm() {
      const form = document.getElementById('contactForm');
      const success = document.getElementById('contactSuccess');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        success.classList.remove('hidden');
        form.reset();
      });
    }

    // ===== SMOOTH SCROLL FOR IN-PAGE ANCHORS =====
    // Function: initSmoothScroll()
    // Purpose: Provide polished navigation behavior for section links
    function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          const targetId = link.getAttribute('href');
          if (targetId.length > 1) {
            const target = document.querySelector(targetId);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    }

    // ===== PAGE BOOTSTRAP =====
    // Function: initPage()
    // Purpose: Initialize all interactive and animated behaviors on load
    function initPage() {
      updateScrollProgress();
      updateNavShadow();
      initFadeUps();
      initStats();
      initCart();
      initVideoToggle();
      initContactForm();
      initSmoothScroll();
      window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateNavShadow();
      }, { passive: true });
    }

    document.addEventListener('DOMContentLoaded', initPage);