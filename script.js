// ===== SCROLL PROGRESS BAR =====
    // Function: updateProgressBar()
    // Purpose: Update the fixed top progress indicator based on page scroll.
    function updateProgressBar() {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var scrollHeight = doc.scrollHeight - doc.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      var bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = pct + '%';
    }

    // ===== NAV SHADOW ON SCROLL =====
    // Function: updateNavShadow()
    // Purpose: Add elevated shadow to sticky navigation after scrolling.
    function updateNavShadow() {
      var header = document.getElementById('site-header');
      if (!header) return;
      if ((window.scrollY || 0) > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    // ===== FADE-UP REVEAL OBSERVER =====
    // Function: initializeRevealObserver()
    // Purpose: Reveal elements with .fade-up when they enter the viewport.
    function initializeRevealObserver() {
      var elements = document.querySelectorAll('.fade-up');
      if (!('IntersectionObserver' in window)) {
        elements.forEach(function(el){ el.classList.add('visible'); });
        return;
      }
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14 });
      elements.forEach(function(el){ observer.observe(el); });
    }

    // ===== COUNT-UP ANIMATION =====
    // Function: animateCountUp(el)
    // Purpose: Animate numeric stats from 0 to target value using requestAnimationFrame.
    function animateCountUp(el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var start = 0;
      var duration = 1500;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // ===== CART STATE AND RENDERING =====
    // Function: renderCart()
    // Purpose: Update sidebar contents, total, and badge count from local cart state.
    var cart = [];
    function renderCart() {
      var itemsEl = document.getElementById('cartItems');
      var countEl = document.getElementById('cart-count');
      var totalEl = document.getElementById('cartTotal');
      if (!itemsEl || !countEl || !totalEl) return;
      itemsEl.innerHTML = cart.length ? cart.map(function(item) {
        return '<div class="flex items-center gap-4 border rounded-2xl p-4"><img src="' + item.image + '" alt="" class="w-16 h-16 object-cover rounded-xl"><div class="flex-1"><div class="font-semibold">' + item.name + '</div><div class="text-sm text-slate-500">$' + item.price.toFixed(2) + '</div></div></div>';
      }).join('') : '<div class="text-slate-500 py-10 text-center">Your cart is empty.</div>';
      countEl.textContent = cart.length;
      var total = cart.reduce(function(sum, item){ return sum + item.price; }, 0);
      totalEl.textContent = '$' + total.toFixed(2);
    }

    // ===== TOGGLE CART SIDEBAR =====
    // Function: openCart()
    // Purpose: Display cart sidebar and dim backdrop.
    function openCart() {
      var sidebar = document.getElementById('cartSidebar');
      var overlay = document.getElementById('cartOverlay');
      if (sidebar) sidebar.style.transform = 'translateX(0)';
      if (overlay) overlay.classList.remove('hidden');
    }

    // Function: closeCart()
    // Purpose: Hide cart sidebar and backdrop.
    function closeCart() {
      var sidebar = document.getElementById('cartSidebar');
      var overlay = document.getElementById('cartOverlay');
      if (sidebar) sidebar.style.transform = 'translateX(100%)';
      if (overlay) overlay.classList.add('hidden');
    }

    // ===== TOAST FEEDBACK =====
    // Function: showToast(message)
    // Purpose: Briefly display a success message to the user.
    function showToast(message) {
      var toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = message;
      toast.classList.remove('opacity-0');
      toast.classList.add('opacity-100');
      setTimeout(function() {
        toast.classList.add('opacity-0');
        toast.classList.remove('opacity-100');
      }, 1800);
    }

    // ===== ADD TO CART HANDLER =====
    // Function: addBeerGaterToCart()
    // Purpose: Add the BeerGater kit to the in-page cart state.
    function addBeerGaterToCart() {
      cart.push({ name: 'The Original BeerGater Kit', price: 299.99, image: 'https://beergater.com/cdn/shop/files/BG_10.webp?v=1772902047' });
      renderCart();
      showToast('✓ BeerGater Kit added to cart!');
      openCart();
    }

    // ===== VIDEO OVERLAY UNMUTE =====
    // Function: initializeVideoOverlay()
    // Purpose: Enable sound and restart the video when the overlay is clicked.
    function initializeVideoOverlay() {
      var bgVideo = document.getElementById('bgVideo');
      var soundOverlay = document.getElementById('soundOverlay');
      if (bgVideo && soundOverlay) {
        soundOverlay.addEventListener('click', function() {
          bgVideo.muted = false;
          bgVideo.currentTime = 0;
          bgVideo.play();
          soundOverlay.style.display = 'none';
        });
      }
    }

    // ===== SMOOTH SCROLL =====
    // Function: initializeSmoothScroll()
    // Purpose: Smoothly scroll internal anchor links to their targets.
    function initializeSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
          var targetId = this.getAttribute('href');
          if (targetId.length > 1) {
            var target = document.querySelector(targetId);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    }

    // ===== CONTACT FORM SUCCESS MESSAGE =====
    // Function: initializeContactForm()
    // Purpose: Prevent default submission and show a green confirmation message.
    function initializeContactForm() {
      var form = document.getElementById('contactForm');
      var success = document.getElementById('contactSuccess');
      if (!form || !success) return;
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        success.classList.remove('hidden');
      });
    }

    window.addEventListener('scroll', function() {
      updateProgressBar();
      updateNavShadow();
    });

    document.addEventListener('DOMContentLoaded', function() {
      updateProgressBar();
      updateNavShadow();
      initializeRevealObserver();
      initializeVideoOverlay();
      initializeSmoothScroll();
      initializeContactForm();
      document.querySelectorAll('.count-num').forEach(function(el) {
        animateCountUp(el);
      });
      renderCart();
      var addBtn = document.getElementById('addToCartBtn');
      var cartIcon = document.getElementById('cart-icon');
      var closeBtn = document.getElementById('closeCart');
      var overlay = document.getElementById('cartOverlay');
      if (addBtn) addBtn.addEventListener('click', addBeerGaterToCart);
      if (cartIcon) cartIcon.addEventListener('click', openCart);
      if (closeBtn) closeBtn.addEventListener('click', closeCart);
      if (overlay) overlay.addEventListener('click', closeCart);
    });