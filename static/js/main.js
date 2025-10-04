// Main JavaScript for Ragini's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with debug mode
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

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    // Initialize functions
    function init() {
        // Initialize any other functions here
        
        // Refresh AOS after dynamic content loads
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    // Initialize when the page loads
    window.addEventListener('load', init);

    // Update on scroll
    window.addEventListener('scroll', highlightNavLink);
    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 500);
    });

    // Progress bar animation and color handling
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            // Get the target width from data-width attribute
            const targetWidth = bar.getAttribute('data-width') + '%';
            
            // Reset width to 0 for animation
            bar.style.width = '0';
            
            // Apply custom color if data-color is set
            const color = bar.getAttribute('data-color');
            if (color) {
                bar.style.setProperty('--skill-color', color);
            }
            
            // Animate the width to target
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    // Initialize progress bar observer
    const progressBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all progress bars
    document.querySelectorAll('.progress').forEach(progress => {
        progressBarObserver.observe(progress);
    });

    // Initial call to highlight nav link
    highlightNavLink();
});