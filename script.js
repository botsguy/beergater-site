// ===== SCROLL PROGRESS BAR =====
    // Purpose: Update the top progress indicator as the user scrolls.
    function updateScrollProgress() {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      document.getElementById('scrollProgress').style.width = height > 0 ? `${(scrolled / height) * 100}%` : '0%';
    }

    // ===== NAV SHADOW TOGGLE =====
    // Purpose: Add a subtle shadow to the sticky header after scrolling.
    function updateNavShadow() {
      const header = document.getElementById('siteHeader');
      header.classList.toggle('shadow-lg', window.scrollY > 8);
      header.classList.toggle('shadow-black/20', window.scrollY > 8);
    }

    // ===== FADE-UP REVEAL OBSERVER =====
    // Purpose: Reveal sections as they enter the viewport.
    function initRevealObserver() {
      const items = document.querySelectorAll('.fade-up');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      }, { threshold: 0.12 });
      items.forEach((item) => observer.observe(item));
    }

    // ===== COUNT-UP STATS =====
    // Purpose: Animate stat numbers when the stats section becomes visible.
    function initCountUps() {
      const stats = document.querySelectorAll('[data-count]');
      if (!stats.length) return;
    }

    // ===== CART LOGIC =====
    // Purpose: Open, close, and update the slide-out cart sidebar.
    const cart = { items: [{ name: 'BeerGater Original System', price: 299.99, qty: 1 }], open: false };

    function formatMoney(value) { return `$${value.toFixed(2)}`; }

    function renderCart() {
      const list = document.getElementById('cartItems');
      const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
      document.getElementById('cartSubtotal').textContent = formatMoney(subtotal);
      document.getElementById('cart-count').textContent = cart.items.reduce((sum, item) => sum + item.qty, 0);
      list.innerHTML = cart.items.map((item, i) => `
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="flex justify-between gap-3">
            <div>
              <div class="font-semibold">${item.name}</div>
              <div class="text-white/60 text-sm">${formatMoney(item.price)} × ${item.qty}</div>
            </div>
            <button class="text-white/50" onclick="removeCartItem(${i})">✕</button>
          </div>
        </div>
      `).join('');
    }

    function removeCartItem(index) {
      cart.items.splice(index, 1);
      if (!cart.items.length) cart.items.push({ name: 'BeerGater Original System', price: 299.99, qty: 1 });
      renderCart();
    }

    function openCart() {
      document.getElementById('cartSidebar').classList.add('open');
      document.getElementById('cartOverlay').classList.add('open');
    }

    function closeCart() {
      document.getElementById('cartSidebar').classList.remove('open');
      document.getElementById('cartOverlay').classList.remove('open');
    }

    // ===== CHECKOUT ACTION =====
    // Purpose: Send buyer to the platform payment processor.
    function checkoutCart() {
      const email = prompt('Enter your email for checkout:');
      if (!email) return;
      window.__processPayment({
        amountCents: Math.round(cart.items.reduce((sum, item) => sum + item.price * item.qty, 0) * 100),
        email: email,
        productName: 'BeerGater Original System',
        productDescription: 'BeerGater tailgate tap system',
        quantity: 1
      });
    }

    // ===== VIDEO SOUND TOGGLE =====
    // Purpose: Unmute and restart the background video when overlay is clicked.
    function enableVideoSound() {
      const video = document.getElementById('bgVideo');
      const overlay = document.getElementById('soundOverlay');
      video.muted = false;
      video.currentTime = 0;
      video.play();
      overlay.style.display = 'none';
    }

    // ===== MOBILE SMOOTH SCROLL =====
    // Purpose: Intercept internal anchor clicks and smooth-scroll.
    function bindSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    // ===== OPEN TAP VOICE =====
    // Purpose: Open voice agent directly in a popup window
    function openTapVoice() { window.open('https://paymegpt.com/agents/82333694', 'TapVoice', 'width=440,height=700,left=' + Math.round(screen.width/2 - 220) + ',top=' + Math.round(screen.height/2 - 350) + ',scrollbars=no,resizable=yes'); }

    // ===== OPEN TAP CHAT =====
    // Purpose: Trigger the native Paymegpt chat bubble to open
    function openTapChat() { var btn = document.querySelector('[data-paymegpt-trigger], .paymegpt-bubble-btn, #paymegpt-bubble-button, .paymegpt-trigger'); if (btn) { btn.click(); } else { window.open('https://paymegpt.com/agents/82333694', 'TapChat', 'width=440,height=700,left=' + Math.round(screen.width/2 - 220) + ',top=' + Math.round(screen.height/2 - 350) + ',scrollbars=no,resizable=yes'); } }

    // ===== DOM INITIALIZATION =====
    // Purpose: Wire all interactions after the document is ready.
    document.addEventListener('DOMContentLoaded', () => {
      renderCart();
      initRevealObserver();
      bindSmoothScroll();
      updateScrollProgress();
      updateNavShadow();
      document.getElementById('soundOverlay').addEventListener('click', enableVideoSound);
      document.getElementById('cartOverlay').addEventListener('click', closeCart);
      document.getElementById('closeCart').addEventListener('click', closeCart);
      document.getElementById('addToCartBtn').addEventListener('click', openCart);
      document.getElementById('buyNowBtn').addEventListener('click', checkoutCart);
      document.getElementById('checkoutBtn').addEventListener('click', checkoutCart);
      window.addEventListener('scroll', () => { updateScrollProgress(); updateNavShadow(); });
    });