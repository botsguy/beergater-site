const progressBar = document.getElementById('progress-bar');
    const nav = document.getElementById('siteNav');
    const countNodes = document.querySelectorAll('.count-num');
    const fadeNodes = document.querySelectorAll('.fade-up');
    const cartCountEl = document.getElementById('cart-count');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const toast = document.getElementById('toast');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const closeCartBtn = document.getElementById('closeCart');
    const heroVideo = document.getElementById('heroVideo');
    const soundBtn = document.getElementById('soundBtn');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    let cartCount = 0;
    let cartOpen = false;

    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.remove('hidden');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
    }

    function updateCart() {
      cartCountEl.textContent = cartCount;
      cartItems.innerHTML = cartCount ? `<div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <div class="font-semibold">The Original BeerGater Kit</div>
        <div class="text-sm text-slate-500 mt-1">Qty: ${cartCount}</div>
        <div class="text-red-600 font-bold mt-2">$299.99</div>
      </div>` : '<p class="text-slate-500">Your cart is empty.</p>';
      cartTotal.textContent = cartCount ? '$299.99' : '$0.00';
    }

    function openCart() {
      cartSidebar.style.right = '0';
      cartOverlay.classList.remove('hidden');
      cartOpen = true;
    }

    function closeCart() {
      cartSidebar.style.right = '-400px';
      cartOverlay.classList.add('hidden');
      cartOpen = false;
    }

    window.addEventListener('scroll', function() {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = pct + '%';
      nav.style.boxShadow = window.scrollY > 50 ? '0 10px 30px rgba(0,0,0,.35)' : 'none';
    });

    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15 });

    fadeNodes.forEach(function(el) { revealObserver.observe(el); });

    const countObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.animated) return;
        el.dataset.animated = '1';
        const target = parseInt(el.dataset.target, 10) || 0;
        const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / 1500, 1);
          el.textContent = Math.floor(target * p);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });

    countNodes.forEach(function(el) { countObserver.observe(el); });

    addToCartBtn.addEventListener('click', function() {
      cartCount += 1;
      updateCart();
      openCart();
      showToast('✓ BeerGater Kit added to cart!');
    });

    cartIconBtn.addEventListener('click', function() {
      cartOpen ? closeCart() : openCart();
    });

    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    soundBtn.addEventListener('click', function() {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        heroVideo.currentTime = 0;
        heroVideo.play();
        soundBtn.textContent = '🔇 Mute';
      } else {
        heroVideo.muted = true;
        soundBtn.textContent = '🔊 Turn On Sound';
      }
    });

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      formSuccess.classList.remove('hidden');
      contactForm.reset();
      setTimeout(function() { formSuccess.classList.add('hidden'); }, 3500);
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    updateCart();