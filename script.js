// ===== SCROLL PROGRESS BAR =====
    // Function: updateScrollProgress()
    // Purpose: Update the top progress indicator as the page is scrolled
    function updateScrollProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      var bar = document.getElementById('scrollProgress');
      if (bar) bar.style.width = progress + '%';
    }

    // ===== NAV SHADOW ON SCROLL =====
    // Function: updateHeaderShadow()
    // Purpose: Add subtle shadow when the header is no longer at top
    function updateHeaderShadow() {
      var header = document.getElementById('siteHeader');
      if (!header) return;
      header.style.boxShadow = (window.scrollY > 10) ? '0 10px 30px rgba(0,0,0,0.35)' : 'none';
    }

    // ===== FADE-UP REVEAL =====
    // Function: revealOnView()
    // Purpose: Reveal elements with .fade-up when they enter viewport
    function revealOnView() {
      var els = document.querySelectorAll('.fade-up');
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.15 });
      els.forEach(function(el) { io.observe(el); });
    }

    // ===== COUNT-UP ANIMATION =====
    // Function: animateCounters()
    // Purpose: Increment statistic values using requestAnimationFrame
    function animateCounters() {
      var counters = document.querySelectorAll('.count-num');
      var io = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target') || '0', 10);
          var start = 0;
          var duration = 1400;
          var startTime = null;
          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            el.textContent = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          observer.unobserve(el);
        });
      }, { threshold: 0.5 });
      counters.forEach(function(c) { io.observe(c); });
    }

    // ===== CART DRAWER =====
    // Function: openCart()
    // Purpose: Show the cart sidebar and overlay
    function openCart() { document.body.classList.add('cart-open'); }

    // Function: closeCart()
    // Purpose: Hide the cart sidebar and overlay
    function closeCart() { document.body.classList.remove('cart-open'); }

    // Function: updateCart()
    // Purpose: Update cart badge count in the navigation
    function updateCart(count) {
      var badge = document.getElementById('cart-count');
      if (badge) badge.textContent = count;
    }

    // Function: showToast()
    // Purpose: Display a temporary purchase confirmation message
    function showToast(message) {
      var toast = document.createElement('div');
      toast.className = 'fixed bottom-6 left-6 z-[100] bg-green-600 text-white px-5 py-4 rounded-2xl shadow-2xl';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(function() { toast.remove(); }, 2200);
    }

    // ===== CONTACT FORM SUCCESS =====
    // Function: handleContactSuccess()
    // Purpose: Simulate successful contact submission for the landing page form
    function handleContactSuccess() {
      var btn = document.getElementById('contactSubmitBtn');
      var success = document.getElementById('contactSuccess');
      if (btn && success) {
        btn.addEventListener('click', function() {
          success.classList.remove('hidden');
        });
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      updateScrollProgress();
      updateHeaderShadow();
      revealOnView();
      animateCounters();
      handleContactSuccess();

      var addToCartBtn = document.getElementById('addToCartBtn');
      var closeCartBtn = document.getElementById('closeCart');
      var cartIcon = document.getElementById('cart-icon');
      var cartOverlay = document.getElementById('cartOverlay');
      if (addToCartBtn) addToCartBtn.addEventListener('click', function() { updateCart(1); openCart(); showToast('Added to cart!'); });
      if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
      if (cartIcon) cartIcon.addEventListener('click', openCart);
      if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

      // ===== VIDEO SOUND OVERLAY =====
      // Function: activateVideoSound()
      // Purpose: Unmute, restart, and play the hero video after overlay click
      var bgVideo = document.getElementById('bgVideo');
      var soundOverlay = document.getElementById('soundOverlay');
      if (bgVideo && soundOverlay) { soundOverlay.addEventListener('click', function() { bgVideo.muted = false; bgVideo.currentTime = 0; bgVideo.play(); soundOverlay.style.display = 'none'; });
      }

      // ===== SMOOTH SCROLL =====
      // Function: initSmoothScroll()
      // Purpose: Smooth-scroll all in-page anchor links
      document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
          var href = this.getAttribute('href');
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    });

    window.addEventListener('scroll', function() {
      updateScrollProgress();
      updateHeaderShadow();
    });