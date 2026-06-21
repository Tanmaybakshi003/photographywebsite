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

  /* ---------- CINEMATIC SHOWREEL ---------- */
  const showreelSection = document.querySelector('.showreel');
  const showreelVideo = document.getElementById('showreelVideo');
  const showreelPlay = document.getElementById('showreelPlay');
  if (showreelSection && showreelVideo && showreelPlay) {
    const playIcon = showreelPlay.querySelector('.play-icon i');
    let isPlayingWithSound = false;

    showreelPlay.addEventListener('click', () => {
      isPlayingWithSound = !isPlayingWithSound;
      if (isPlayingWithSound) {
        showreelVideo.muted = false;
        showreelVideo.play();
        showreelSection.classList.add('playing');
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        showreelPlay.setAttribute('aria-label', 'Pause showreel');
      } else {
        showreelVideo.muted = true;
        showreelSection.classList.remove('playing');
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        showreelPlay.setAttribute('aria-label', 'Play showreel with sound');
      }
    });

    // If the video ends, reset to the muted looping background state
    showreelVideo.addEventListener('ended', () => {
      isPlayingWithSound = false;
      showreelVideo.muted = true;
      showreelSection.classList.remove('playing');
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
    });
  }

  /* ---------- INQUIRY POPUP MODAL ---------- */
  const inquiryModal = document.getElementById('inquiryModal');
  if (inquiryModal) {
    const inquiryOverlay = document.getElementById('inquiryOverlay');
    const inquiryClose = document.getElementById('inquiryClose');
    const inquirySkip = document.getElementById('inquirySkip');
    const STORAGE_KEY = 'asp_inquiry_dismissed_v2';

    const openModal = () => {
      inquiryModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      inquiryModal.classList.remove('show');
      document.body.style.overflow = '';
      try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* storage unavailable */ }
    };

    let alreadyDismissed = false;
    try { alreadyDismissed = sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { /* storage unavailable */ }

    if (!alreadyDismissed) {
      // Show 3 seconds after the page opens
      setTimeout(openModal, 3000);
    }

    inquiryOverlay.addEventListener('click', closeModal);
    inquiryClose.addEventListener('click', closeModal);
    inquirySkip.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && inquiryModal.classList.contains('show')) closeModal();
    });
  }

  /* ---------- BOOKING FORM(S) ---------- */
  const handleFormSubmit = (form, successEl) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          successEl.textContent = "Thank you! Your inquiry has been received — we'll be in touch within 24 hours.";
          successEl.classList.remove('error');
          successEl.classList.add('show');
          form.reset();
          // If this was the popup form, close the modal shortly after success
          if (form.id === 'popupForm') {
            setTimeout(() => {
              const modal = document.getElementById('inquiryModal');
              if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                try { sessionStorage.setItem('asp_inquiry_dismissed_v2', '1'); } catch (e) {}
              }
            }, 1800);
          }
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        successEl.textContent = "Something went wrong sending your inquiry. Please email us directly at hello@arunsareenphotography.com or use WhatsApp.";
        successEl.classList.add('show', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        setTimeout(() => successEl.classList.remove('show', 'error'), 8000);
      }
    });
  };

  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');
  if (bookingForm && formSuccess) handleFormSubmit(bookingForm, formSuccess);

  const popupForm = document.getElementById('popupForm');
  const popupFormSuccess = document.getElementById('popupFormSuccess');
  if (popupForm && popupFormSuccess) handleFormSubmit(popupForm, popupFormSuccess);

});
