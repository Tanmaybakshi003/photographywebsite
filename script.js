    // ============================================
    // ARUN SAREEN PHOTOGRAPHY — SCRIPT
    // ============================================

    document.addEventListener('DOMContentLoaded', () => {

      /* ---------- PRELOADER ---------- */
      const preloader = document.getElementById('preloader');
      window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 500);
      });
      // fallback in case load event already fired
      setTimeout(() => preloader.classList.add('hidden'), 1800);

      /* ---------- HEADER ON SCROLL ---------- */
      const header = document.getElementById('siteHeader');
      const onScroll = () => {
        if (window.scrollY > 60) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll);
      onScroll();

      /* ---------- MOBILE NAV TOGGLE ---------- */
      const navToggle = document.getElementById('navToggle');
      const mainNav = document.getElementById('mainNav');
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        mainNav.classList.toggle('open');
      });
      mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('open');
          mainNav.classList.remove('open');
        });
      });

      /* ---------- HERO SLIDESHOW ---------- */
      const heroImgs = document.querySelectorAll('[data-hero]');
      let heroIndex = 0;
      if (heroImgs.length > 1) {
        setInterval(() => {
          heroImgs[heroIndex].classList.remove('active');
          heroIndex = (heroIndex + 1) % heroImgs.length;
          heroImgs[heroIndex].classList.add('active');
        }, 5500);
      }

      /* ---------- SCROLL REVEAL ---------- */
      const revealEls = document.querySelectorAll('[data-aos]');
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => revealObserver.observe(el));

      /* ---------- GALLERY FILTER ---------- */
      const filterBtns = document.querySelectorAll('.filter-btn');
      const galleryItems = document.querySelectorAll('.gallery-item');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;
          galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.cat === filter) {
              item.classList.remove('hide');
            } else {
              item.classList.add('hide');
            }
          });
        });
      });

      /* ---------- BEFORE / AFTER SLIDER ---------- */
      const baSlider = document.getElementById('baSlider');
      const baAfter = document.querySelector('.ba-after');
      const baDivider = document.getElementById('baDivider');
      if (baSlider) {
        const updateBA = (val) => {
          baAfter.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
          baDivider.style.left = `${val}%`;
        };
        updateBA(baSlider.value);
        baSlider.addEventListener('input', (e) => updateBA(e.target.value));
      }

      /* ---------- FAQ ACCORDION ---------- */
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const q = item.querySelector('.faq-q');
        q.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          faqItems.forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      });

      /* ---------- BOOKING FORM ---------- */
      const bookingForm = document.getElementById('bookingForm');
      const formSuccess = document.getElementById('formSuccess');
      if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const submitBtn = bookingForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;

          try {
            const formData = new FormData(bookingForm);
            const response = await fetch(bookingForm.action, {
              method: 'POST',
              body: formData,
              headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
              formSuccess.textContent = "Thank you! Your inquiry has been received — we'll be in touch within 24 hours.";
              formSuccess.classList.remove('error');
              formSuccess.classList.add('show');
              bookingForm.reset();
            } else {
              throw new Error('Submission failed');
            }
          } catch (err) {
            formSuccess.textContent = "Something went wrong sending your inquiry. Please email us directly at hello@arunsareenphotography.com or use WhatsApp.";
            formSuccess.classList.add('show', 'error');
          } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            setTimeout(() => formSuccess.classList.remove('show', 'error'), 8000);
          }
        });
      }

    });
