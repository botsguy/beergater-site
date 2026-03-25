// ===== SCROLL PROGRESS BAR =====
    // Function: updateScrollProgress()
    // Purpose: Grow the top fixed progress bar from 0% to 100% as the user scrolls
    function updateScrollProgress() {
      const bar = document.getElementById('progress-bar');
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }

    // ===== NAV SHADOW STATE =====
    // Function: updateNavShadow()
    // Purpose: Add a subtle shadow to the sticky nav after scrolling past 50px
    function updateNavShadow() {
      const nav = document.querySelector('.site-nav');
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }

    // ===== SMOOTH SCROLL LINKS =====
    // Function: enableSmoothScroll()
    // Purpose: Handle all in-page anchor navigation with consistent smooth scrolling
    function enableSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    // ===== FADE-UP REVEAL =====
    // Function: setupFadeUpObserver()
    // Purpose: Reveal elements with .fade-up when they enter the viewport
    function setupFadeUpObserver() {
      const items = document.querySelectorAll('.fade-up');
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.15 });
      items.forEach(function(item, index) {
        item.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(item);
      });
    }

    // ===== COUNT-UP ANIMATION =====
    // Function: animateCountUp(el)
    // Purpose: Animate numeric statistic counters from 0 to target value
    function animateCountUp(el) {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1500;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toString();
      }
      requestAnimationFrame(tick);
    }

    // ===== STAT COUNTER OBSERVER =====
    // Function: setupCountObserver()
    // Purpose: Trigger count-up animation once each metric enters the viewport
    function setupCountObserver() {
      const counters = document.querySelectorAll('.count-num');
      const seen = new WeakSet();
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            animateCountUp(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function(counter) { observer.observe(counter); });
    }

    // ===== CART SIDEBAR STATE =====
    // Function: openCart()
    // Purpose: Slide cart drawer into view and lock body scroll
    function openCart() {
      sidebar.style.right = '0';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    // Function: closeCartFn()
    // Purpose: Hide cart drawer and restore page scrolling
    function closeCartFn() {
      sidebar.style.right = '-400px';
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }

    // Function: updateCart()
    // Purpose: Refresh cart count, cart contents, and total value
    function updateCart() {
      cartCountEl.textContent = cartCount;
      cartCountEl.style.display = cartCount > 0 ? 'flex' : 'none';
      if (cartCount === 0) {
        cartItemsEl.innerHTML = '<p style="color:#999;text-align:center;margin-top:40px;">Your cart is empty</p>';
        cartTotalEl.textContent = '$0.00';
      } else {
        cartItemsEl.innerHTML = '<div style="display:flex;gap:16px;align-items:center;padding:16px 0;border-bottom:1px solid #f0f0f0"><img src="https://beergater.com/cdn/shop/files/BG_10.webp?v=1772902047" alt="BeerGater kit" style="width:80px;height:70px;object-fit:cover;border-radius:8px;"><div style="flex:1"><div style="font-weight:700;font-size:15px;color:#0a0e1a;">The Original BeerGater Kit</div><div style="color:#888;font-size:13px;margin-top:4px;">Qty: ' + cartCount + '</div></div><div style="font-weight:700;color:#C0392B;font-size:16px;">$' + (cartCount * cartPrice).toFixed(2) + '</div></div>';
        cartTotalEl.textContent = '$' + (cartCount * cartPrice).toFixed(2);
      }
    }

    // Function: showToast(message)
    // Purpose: Display a temporary success notification for add-to-cart actions
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.remove('show');
      void toast.offsetWidth;
      toast.classList.add('show');
    }

    // ===== VIDEO SOUND TOGGLE =====
    // Function: wireVideoSoundToggle()
    // Purpose: Toggle muted/unmuted playback while restarting the video when enabling sound
    function wireVideoSoundToggle() {
      const vid = document.getElementById('heroVideo');
      const btn = document.getElementById('soundBtn');
      let soundOn = false;
      btn.addEventListener('click', function() {
        if (!soundOn) {
          vid.muted = false;
          vid.currentTime = 0;
          vid.play();
          btn.textContent = '🔇 Mute';
          soundOn = true;
        } else {
          vid.muted = true;
          btn.textContent = '🔊 Turn On Sound';
          soundOn = false;
        }
      });
    }

    // ===== CONTACT FORM SUCCESS HANDLER =====
    // Function: wireContactForm()
    // Purpose: Replace the form with a success state after submission
    function wireContactForm() {
      const form = document.getElementById('contactForm');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        form.outerHTML = '<div class="mt-8 rounded-2xl bg-[#27ae60] text-white px-6 py-8 text-center font-bold text-lg">🍺 Thanks! We\'ll get back to you soon.</div>';
      });
    }

    // ===== INITIALIZE INTERACTIONS =====
    // Function: init()
    // Purpose: Set up page-wide behaviors once DOM is ready
    function init() {
      updateCart();
      updateNavShadow();
      enableSmoothScroll();
      setupFadeUpObserver();
      setupCountObserver();
      wireVideoSoundToggle();
      wireContactForm();

      window.addEventListener('scroll', function() {
        updateScrollProgress();
        updateNavShadow();
      }, { passive: true });

      document.getElementById('addToCartBtn').addEventListener('click', function() {
        cartCount++;
        updateCart();
        openCart();
        this.textContent = '✓ Added to Cart!';
        showToast('✓ BeerGater Kit added to cart!');
        const btn = this;
        setTimeout(function() { btn.textContent = 'ADD TO CART 🛒'; }, 2000);
      });

      document.getElementById('closeCart').addEventListener('click', closeCartFn);
      overlay.addEventListener('click', closeCartFn);
      document.querySelector('.cart-icon-btn').addEventListener('click', openCart);
    }

    // Expose values used by cart logic
    let cartCount = 0;
    const cartPrice = 299.99;
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');

    document.addEventListener('DOMContentLoaded', init);