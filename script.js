/* ===== SCROLL PROGRESS BAR LOGIC ===== */
    /* Updates the top progress indicator based on viewport scroll position */
    function updateScrollProgress() {
      const progress = document.getElementById('scrollProgress');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
    }

    /* ===== NAV GLASS EFFECT LOGIC ===== */
    /* Adds subtle translucency and shadow once the page is scrolled */
    function handleNavGlass() {
      const header = document.querySelector('header');
      if (window.scrollY > 10) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
    }

    /* ===== INTERSECTION OBSERVER REVEAL LOGIC ===== */
    /* Reveals feature cards and testimonial blocks when entering the viewport */
    function initRevealAnimations() {
      const els = document.querySelectorAll('.reveal');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.12 });
      els.forEach(el => io.observe(el));
    }

    /* ===== COUNT-UP ANIMATION LOGIC ===== */
    /* Animates stat counters from 0 to target value for impact */
    function initCountUp() {
      const items = document.querySelectorAll('.countup');
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10) || 0;
          let current = 0;
          const duration = 1200;
          const start = performance.now();
          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            current = Math.floor(target * (0.2 + 0.8 * p));
            el.textContent = current;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target;
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      }, { threshold: 0.6 });
      items.forEach(item => io.observe(item));
    }

    /* ===== SMOOTH SCROLL LOGIC ===== */
    /* Smoothly scrolls to anchored sections without abrupt jumps */
    function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    /* ===== VIDEO SOUND TOGGLE LOGIC ===== */
    /* Enables or mutes the hero video audio state and updates button label */
    function initVideoToggle() {
      const video = document.getElementById('heroVideo');
      const btn = document.getElementById('soundBtn');
      btn.addEventListener('click', () => {
        video.muted = !video.muted;
        btn.textContent = video.muted ? '🔇 Sound Off' : '🔊 Sound On';
      });
    }

    /* ===== CONTACT FORM SUBMISSION LOGIC ===== */
    /* Displays a success message after form submission */
    function initContactForm() {
      const form = document.getElementById('contactForm');
      const msg = document.getElementById('formSuccess');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        msg.classList.remove('hidden');
        form.reset();
      });
    }

    /* ===== CART STATE LOGIC ===== */
    /* Manages the cart sidebar, item count, and total display */
    function initCart() {
      const cartToggleBtn = document.getElementById('cartToggleBtn');
      const closeCartBtn = document.getElementById('closeCartBtn');
      const cartSidebar = document.getElementById('cartSidebar');
      const cartOverlay = document.getElementById('cartOverlay');
      const addToCartBtn = document.getElementById('addToCartBtn');
      const checkoutBtn = document.getElementById('checkoutBtn');
      const buyNowBtn = document.getElementById('buyNowBtn');
      const cartCount = document.getElementById('cart-count');
      const cartItems = document.getElementById('cartItems');
      const cartTotal = document.getElementById('cartTotal');
      let count = 0;
      let total = 0;

      function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.remove('hidden');
      }

      function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.add('hidden');
      }

      function addItem() {
        count += 1;
        total += 299.99;
        cartCount.textContent = count;
        cartItems.innerHTML = `
          <div class="flex items-center gap-4 rounded-2xl border border-black/10 p-4">
            <img src="https://beergater.com/cdn/shop/files/BG_10.webp?v=1772902047" alt="BeerGater" class="w-20 h-20 rounded-xl object-cover" />
            <div class="flex-1">
              <p class="font-bold">BeerGater</p>
              <p class="text-sm text-[#334155]">Portable dual-tap system</p>
              <p class="mt-2 font-semibold">$299.99</p>
            </div>
          </div>
        `;
        cartTotal.textContent = `$${total.toFixed(2)}`;
        openCart();
      }

      cartToggleBtn.addEventListener('click', openCart);
      closeCartBtn.addEventListener('click', closeCart);
      cartOverlay.addEventListener('click', closeCart);
      addToCartBtn.addEventListener('click', addItem);
      checkoutBtn.addEventListener('click', () => {
        window.__processPayment({
          amountCents: 29999,
          email: '',
          productName: 'BeerGater',
          productDescription: 'Portable dual-tap system',
          name: '',
          quantity: 1
        });
      });
      buyNowBtn.addEventListener('click', () => {
        window.__processPayment({
          amountCents: 29999,
          email: '',
          productName: 'BeerGater',
          productDescription: 'Portable dual-tap system',
          name: '',
          quantity: 1
        });
      });
    }

    /* ===== INITIALIZATION ===== */
    /* Boots all page interactions after DOM content is available */
    document.addEventListener('DOMContentLoaded', function() {
      updateScrollProgress();
      handleNavGlass();
      initRevealAnimations();
      initCountUp();
      initSmoothScroll();
      initVideoToggle();
      initContactForm();
      initCart();
    });

    window.addEventListener('scroll', function() {
      updateScrollProgress();
      handleNavGlass();
    });

    /* ===== CUSTOM BEERGATER LAUNCHER ===== */
    /* Adds animated assistant controls and routes interactions to the PayMeGPT widget */
    (function() {
      var menuOpen = false;
      var mainBtn = document.getElementById('bg-main-btn');
      var menu = document.getElementById('bg-menu');
      var chatBtn = document.getElementById('bg-chat-btn');
      var voiceBtn = document.getElementById('bg-voice-btn');
      var tooltip = document.createElement('div');
      tooltip.id = 'bg-tooltip';
      tooltip.textContent = '🏈 Hey! Ask Tap anything!';
      document.getElementById('bg-launcher').appendChild(tooltip);
      setTimeout(function() { if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip); }, 5000);
      mainBtn.addEventListener('click', function() {
        menuOpen = !menuOpen;
        menu.classList.toggle('open', menuOpen);
        document.getElementById('bg-icon').textContent = menuOpen ? '✕' : '🍺';
        document.getElementById('bg-label').textContent = menuOpen ? 'Close' : 'Ask Tap';
      });
      chatBtn.addEventListener('click', function() {
        if (window.PayMeGPT && window.PayMeGPT.open) {
          window.PayMeGPT.open({ mode: 'chat' });
        } else {
          window.open('https://paymegpt.com/agents/96369009', '_blank', 'width=420,height=680,scrollbars=no,resizable=yes');
        }
        menuOpen = false;
        menu.classList.remove('open');
        document.getElementById('bg-icon').textContent = '🍺';
        document.getElementById('bg-label').textContent = 'Ask Tap';
      });
      voiceBtn.addEventListener('click', function() {
        if (window.PayMeGPT && window.PayMeGPT.open) {
          window.PayMeGPT.open({ mode: 'voice' });
        } else {
          window.open('https://paymegpt.com/agents/96369009', '_blank', 'width=420,height=680,scrollbars=no,resizable=yes');
        }
        menuOpen = false;
        menu.classList.remove('open');
        document.getElementById('bg-icon').textContent = '🍺';
        document.getElementById('bg-label').textContent = 'Ask Tap';
      });
      document.addEventListener('click', function(e) {
        if (menuOpen && !document.getElementById('bg-launcher').contains(e.target)) {
          menuOpen = false;
          menu.classList.remove('open');
          document.getElementById('bg-icon').textContent = '🍺';
          document.getElementById('bg-label').textContent = 'Ask Tap';
        }
      });
    })();