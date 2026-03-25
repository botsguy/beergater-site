// ===== SCROLL PROGRESS BAR =====
    // Function: updateScrollProgress()
    // Purpose: Update the red top progress bar based on page scroll position.
    function updateScrollProgress() {
      const progress = document.getElementById('scrollProgress');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = value + '%';
    }

    // ===== NAV SHADOW ON SCROLL =====
    // Function: updateNavShadow()
    // Purpose: Add subtle shadow to sticky nav when the page is scrolled.
    function updateNavShadow() {
      const header = document.querySelector('header');
      header.classList.toggle('shadow-lg', window.scrollY > 10);
    }

    // ===== FADE-UP OBSERVER =====
    // Function: initFadeUpObserver()
    // Purpose: Reveal content blocks smoothly as they enter the viewport.
    function initFadeUpObserver() {
      const items = document.querySelectorAll('.fade-up');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      }, { threshold: 0.15 });
      items.forEach(item => observer.observe(item));
    }

    // ===== COUNT-UP ANIMATION =====
    // Function: animateCounters()
    // Purpose: Animate stat numbers from zero to their target values.
    function animateCounters() {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = () => {
          current += step;
          if (current >= target) {
            counter.textContent = target;
            return;
          }
          counter.textContent = current;
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }

    // ===== CART STATE =====
    // Function: renderCart()
    // Purpose: Update cart UI, counts, and totals from in-memory state.
    const cart = { items: [{ name: 'BeerGater Portable Kegerator Tap', price: 299.99, qty: 1 }] };
    function renderCart() {
      const cartItems = document.getElementById('cartItems');
      const cartCount = document.getElementById('cart-count');
      const cartTotal = document.getElementById('cartTotal');
      const emptyCartText = document.getElementById('emptyCartText');
      const totalQty = cart.items.reduce((sum, item) => sum + item.qty, 0);
      const total = cart.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
      cartCount.textContent = totalQty;
      cartTotal.textContent = '$' + total.toFixed(2);
      cartItems.innerHTML = '';
      if (!cart.items.length) {
        cartItems.appendChild(emptyCartText);
        return;
      }
      cart.items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between gap-4 border border-slate-200 rounded-2xl p-4';
        row.innerHTML = '<div><div class="font-semibold">' + item.name + '</div><div class="text-sm text-slate-500">Qty ' + item.qty + '</div></div><div class="text-right"><div class="font-semibold">$' + item.price.toFixed(2) + '</div><button class="text-sm text-[#c0392b]" data-remove="' + index + '">Remove</button></div>';
        cartItems.appendChild(row);
      });
      cartItems.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', e => {
          cart.items.splice(parseInt(e.currentTarget.getAttribute('data-remove'), 10), 1);
          renderCart();
        });
      });
    }

    // ===== CART TOGGLE =====
    // Function: openCart()/closeCart()
    // Purpose: Show and hide the slide-out cart drawer and overlay.
    function openCart() {
      document.getElementById('cartSidebar').classList.remove('translate-x-full');
      const overlay = document.getElementById('cartOverlay');
      overlay.classList.remove('pointer-events-none', 'opacity-0');
      overlay.classList.add('opacity-100');
    }
    function closeCart() {
      document.getElementById('cartSidebar').classList.add('translate-x-full');
      const overlay = document.getElementById('cartOverlay');
      overlay.classList.add('pointer-events-none', 'opacity-0');
      overlay.classList.remove('opacity-100');
    }

    // ===== VIDEO SOUND OVERLAY =====
    // Function: enableVideoSound()
    // Purpose: Unmute and replay the hero demo video when overlay is clicked.
    function enableVideoSound() {
      const bgVideo = document.getElementById('bgVideo');
      const soundOverlay = document.getElementById('soundOverlay');
      bgVideo.muted = false;
      bgVideo.currentTime = 0;
      bgVideo.play();
      soundOverlay.style.display = 'none';
    }

    // ===== SMOOTH SCROLL =====
    // Function: bindSmoothScroll()
    // Purpose: Ensure anchor navigation scrolls smoothly across the page.
    function bindSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
          const id = link.getAttribute('href');
          if (id.length > 1) {
            e.preventDefault();
            document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    // ===== INIT =====
    // Function: initPage()
    // Purpose: Wire up all interactions after DOM loads.
    function initPage() {
      updateScrollProgress();
      updateNavShadow();
      initFadeUpObserver();
      animateCounters();
      renderCart();
      bindSmoothScroll();

      window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateNavShadow();
      });

      document.getElementById('cartBtn').addEventListener('click', openCart);
      document.getElementById('closeCartBtn').addEventListener('click', closeCart);
      document.getElementById('cartOverlay').addEventListener('click', closeCart);
      document.getElementById('soundOverlay').addEventListener('click', enableVideoSound);

      document.getElementById('addToCartBtn').addEventListener('click', () => {
        cart.items = [{ name: 'BeerGater Portable Kegerator Tap', price: 299.99, qty: 1 }];
        renderCart();
        openCart();
      });

      document.getElementById('checkoutBtn').addEventListener('click', () => {
        window.__processPayment({
          amountCents: 29999,
          email: '',
          productName: 'BeerGater Portable Kegerator Tap',
          productDescription: 'The original tailgate experience',
          name: '',
          quantity: 1
        });
      });
    }

    document.addEventListener('DOMContentLoaded', initPage);