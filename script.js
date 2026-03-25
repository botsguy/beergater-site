// ===== STICKY NAV SCROLL EFFECT =====
    // Function: handleHeaderScroll()
    // Purpose: Add a more opaque, premium look to the sticky navigation after scrolling.
    function handleHeaderScroll() {
      const header = document.getElementById('site-header');
      if (window.scrollY > 12) header.classList.add('nav-scrolled');
      else header.classList.remove('nav-scrolled');
    }

    // ===== SCROLL REVEAL ANIMATION =====
    // Function: setupRevealObserver()
    // Purpose: Reveal sections and cards with a smooth upward motion as they enter viewport.
    function setupRevealObserver() {
      const items = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      }, { threshold: 0.14 });
      items.forEach(item => observer.observe(item));
    }

    // ===== VIDEO OVERLAY CONTROL =====
    // Function: setupVideoOverlay()
    // Purpose: Hide the play overlay once the inline video begins playing.
    function setupVideoOverlay() {
      const video = document.getElementById('beergaterVideo');
      const overlay = document.getElementById('playOverlay');
      if (!video || !overlay) return;

      const hideOverlay = () => overlay.classList.add('hide');
      const showOverlay = () => { if (video.paused) overlay.classList.remove('hide'); };

      overlay.addEventListener('click', () => {
        video.play();
      });
      video.addEventListener('play', hideOverlay);
      video.addEventListener('pause', showOverlay);
      video.addEventListener('ended', showOverlay);
    }

    // ===== CONTACT FORM HANDLER =====
    // Function: setupContactForm()
    // Purpose: Prevent default submission and provide a polished in-page confirmation.
    function setupContactForm() {
      const form = document.querySelector('.contact-form');
      if (!form) return;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Message Sent!';
        setTimeout(() => { btn.textContent = original; }, 2200);
        form.reset();
      });
    }

    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('load', () => {
      handleHeaderScroll();
      setupRevealObserver();
      setupVideoOverlay();
      setupContactForm();
    });