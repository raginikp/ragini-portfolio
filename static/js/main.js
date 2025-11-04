document.addEventListener('DOMContentLoaded', () => {
  // Scroll Up Button
  const scrollUpBtn = document.getElementById('scrollUpBtn');
  if(scrollUpBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollUpBtn.style.display = 'flex';
      } else {
        scrollUpBtn.style.display = 'none';
      }
    });
    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: true,
      offset: 100,
      delay: 100,
      disable: window.innerWidth < 768,
      startEvent: 'DOMContentLoaded'
    });
  }

  // Smooth scrolling for in-page anchors only
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Highlight nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  function highlightNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        activeLink?.classList.add('active');
      } else {
        activeLink?.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink();

  // Refresh AOS on load and resize
  function refreshAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }
  window.addEventListener('load', refreshAOS);
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshAOS, 500);
  });

  // Progress bar animation with IntersectionObserver
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width') + '%';
      bar.style.width = '0';
      const color = bar.getAttribute('data-color');
      if(color) {
        bar.style.setProperty('--skill-color', color);
      }
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  }
  const progressBarObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateProgressBars();
        progressBarObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  document.querySelectorAll('.progress').forEach(progress => {
    progressBarObserver.observe(progress);
  });

  // Theme toggle button that reloads page on toggle
  const toggleBtn = document.getElementById('theme-toggle');
  if(toggleBtn){
    function setTheme(theme) {
      localStorage.setItem('theme', theme);
    }
    // On page load, apply saved or system theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', savedTheme || (systemPrefersDark ? 'dark' : 'light'));
    
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      setTheme(newTheme);
      // Reload page to apply theme globally
      window.location.reload();
    });
  }
});
