// ===== SCROLL PROGRESS BAR =====
    // Function: updateScrollProgress()
    // Purpose: Update the fixed top scroll bar based on page position
    function updateScrollProgress() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      document.getElementById('scrollProgress').style.width = (scrollTop / height) * 100 + '%';
    }

    // ===== NAV SHADOW =====
    // Function: updateNavShadow()
    // Purpose: Add shadow when user scrolls past top to improve header contrast
    function updateNavShadow() {
      document.getElementById('siteHeader').classList.toggle('nav-shadow', window.scrollY > 20);
    }

    // ===== FADE-UP OBSERVER =====
    // Function: revealOnScroll()
    // Purpose: Reveal sections and cards as they enter the viewport
    function revealOnScroll() {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); obs.unobserve(entry.target); } });
      }, { threshold: 0.15 });
      document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    }

    // ===== COUNT-UP ANIMATION =====
    // Function: animateCounters()
    // Purpose: Animate numerical stats when the stats bar becomes visible
    function animateCounters() {
      const els = document.querySelectorAll('.count-up');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll ? null : null;
          document.querySelectorAll('.count-up').forEach(el => {
            const target = +el.dataset.target, step = Math.ceil(target / 60);
            let cur = 0;
            const t = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(t); } el.textContent = cur; }, 20);
          });
          obs.disconnect();
        });
      }, { threshold: 0.4 });
      if (els[0]) obs.observe(els[0]);
    }

    // ===== CART LOGIC =====
    // Function: renderCart()
    // Purpose: Refresh cart sidebar items, total, and badge count
    const cart = [{ name: 'BeerGater v9', price: 299.99, qty: 1 }];
    function renderCart() {
      const items = document.getElementById('cartItems');
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
      document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
      items.innerHTML = cart.map(i => `<div class="flex justify-between items-center bg-white/5 rounded-2xl p-4"><div><div class="font-semibold">${i.name}</div><div class="text-white/60 text-sm">Qty ${i.qty}</div></div><div class="font-semibold">$${(i.price * i.qty).toFixed(2)}</div></div>`).join('');
    }

    // ===== CART TOGGLE =====
    // Function: openCart()/closeCart()
    // Purpose: Show and hide the slide-in cart sidebar and overlay
    function openCart(){ document.getElementById('cartSidebar').classList.remove('cart-hidden'); document.getElementById('cartOverlay').classList.remove('overlay-hidden'); }
    function closeCart(){ document.getElementById('cartSidebar').classList.add('cart-hidden'); document.getElementById('cartOverlay').classList.add('overlay-hidden'); }

    // ===== HERO VIDEO SOUND TOGGLE =====
    // Function: toggleVideoSound()
    // Purpose: Mute/unmute hero video and update button label
    function toggleVideoSound() {
      const v = document.getElementById('heroVideo');
      const b = document.getElementById('soundBtn');
      v.muted = !v.muted;
      b.textContent = v.muted ? '🔇 Sound Off' : '🔊 Sound On';
    }

    // ===== SMOOTH SCROLL =====
    // Function: smoothScrollTo()
    // Purpose: Provide reliable anchor navigation with offset awareness
    function smoothScrollTo(hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ===== CONTACT FORM =====
    // Function: handleContactSubmit()
    // Purpose: Simulate success state for the contact form submission
    function handleContactSubmit(e) {
      e.preventDefault();
      document.getElementById('contactSuccess').classList.remove('hidden');
      e.target.reset();
    }

    // ===== PURCHASE HANDLER =====
    // Function: handlePurchase()
    // Purpose: Send the BeerGater product through built-in payment processing
    function handlePurchase() {
      const email = prompt('Enter your email to continue:');
      const name = prompt('Enter your name (optional):') || '';
      if (!email) return;
      window.__processPayment({ amountCents: 29999, email: email, productName: 'BeerGater v9', productDescription: 'The original tailgate experience', name: name, quantity: 1 });
    }

    // ===== INITIALIZATION =====
    // Function: initBeerGaterPage()
    // Purpose: Wire up scrolling, animations, cart, video, and navigation behavior
    function initBeerGaterPage() {
      renderCart();
      revealOnScroll();
      animateCounters();
      updateScrollProgress();
      updateNavShadow();

      window.addEventListener('scroll', () => { updateScrollProgress(); updateNavShadow(); });

      document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const href = a.getAttribute('href'); if (href.length > 1) { e.preventDefault(); smoothScrollTo(href); } }));

      document.getElementById('soundBtn').addEventListener('click', toggleVideoSound);
      document.getElementById('addToCartBtn').addEventListener('click', openCart);
      document.getElementById('buyNowBtn').addEventListener('click', handlePurchase);
      document.getElementById('checkoutBtn').addEventListener('click', handlePurchase);
      document.getElementById('closeCartBtn').addEventListener('click', closeCart);
      document.getElementById('cartOverlay').addEventListener('click', closeCart);
      document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    }

    document.addEventListener('DOMContentLoaded', initBeerGaterPage);