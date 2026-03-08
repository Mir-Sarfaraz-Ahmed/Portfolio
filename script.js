/* =============================================
   PORTFOLIO — SCRIPT.JS  (Improved Version)
   Author: Mir Sarfaraz Ahmed
   ============================================= */

window.onload = function () {

  /* ── 1. TYPING ANIMATION ── */
  const phrases = [
    'Python Developer 🐍',
    'IoT & Arduino Builder 🔧',
    'AI Enthusiast 🤖',
    'Web Developer (in progress) 💻',
    'NCC Cadet 🎖️',
  ];

  const typingEl = document.getElementById('typing-text');
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typingTimer;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === current.length) {
      // pause at end
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    typingTimer = setTimeout(type, speed);
  }

  if (typingEl) type();


  /* ── 2. SCROLL REVEAL (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));


  /* ── 3. SKILL BARS (animate on scroll) ── */
  const skillBars = document.querySelectorAll('.skill-fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width  = target.getAttribute('data-width') + '%';
          // small delay so animation is visible
          setTimeout(() => { target.style.width = width; }, 150);
          barObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach(bar => barObserver.observe(bar));


  /* ── 4. NAVBAR — SCROLL STYLE + ACTIVE LINK ── */
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  function updateNav() {
    // scrolled style
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // active link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run once on load


  /* ── 5. SCROLL TO TOP BUTTON ── */
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── 6. CONTACT FORM (with loading state) ── */
  const form      = document.getElementById('contact-form');
  const status    = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Show loading state
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending…';
      status.innerHTML      = '';
      status.style.color    = '';

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method:  'POST',
          body:    data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.innerHTML   = '✅ Message sent successfully!';
          status.style.color = '#16a34a';
          form.reset();
        } else {
          status.innerHTML   = '❌ Submission failed. Please try again.';
          status.style.color = '#dc2626';
        }
      } catch (error) {
        status.innerHTML   = '⚠️ Network error. Please check your connection.';
        status.style.color = '#d97706';
      } finally {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

};
