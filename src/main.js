import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const navLists = document.querySelectorAll('.nav-list');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');

      navLists.forEach(list => {
        if (list.style.display === 'flex') {
          list.style.display = 'none';
        } else {
          list.style.display = 'flex';
          list.style.flexDirection = 'column';
          list.style.position = 'absolute';
          list.style.top = '100%';
          list.style.left = '0';
          list.style.width = '100%';
          list.style.background = '#FDFBF7';
          list.style.padding = '20px';
          list.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';

          // Specific positioning for left/right lists if needed, 
          // but for now stacking them is fine or I can merge them visually.
          // Actually, let's simplify: just toggle a class on the nav container
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          navLists.forEach(list => list.style.display = 'none');
          mobileBtn.classList.remove('active');
        }

        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Add fade-in-up class to elements we want to animate
  const animatedElements = document.querySelectorAll(
    '.hero-text, .hero-image-wrapper, .about-content, .about-image-wrapper, .quote-section, .service-card, .footer-top'
  );

  animatedElements.forEach(el => {
    // Check if class is already there (from HTML)
    if (!el.classList.contains('fade-in-up')) {
      el.classList.add('fade-in-up');
    }
    observer.observe(el);
  });
});
