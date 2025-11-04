// Tech animation for experience section
document.addEventListener('DOMContentLoaded', function() {
    const experienceSection = document.getElementById('experience');
    if (!experienceSection) return;
    
    // Create tech background container if it doesn't exist
    let techBg = experienceSection.querySelector('.tech-bg');
    if (!techBg) {
        techBg = document.createElement('div');
        techBg.className = 'tech-bg';
        experienceSection.insertBefore(techBg, experienceSection.firstChild);
    }

    // Tech icons to use in the animation (Font Awesome icons)
    const techIcons = [
        { class: 'html', icon: 'fa-html5' },
        { class: 'css', icon: 'fa-css3-alt' },
        { class: 'js', icon: 'fa-js' },
        { class: 'python', icon: 'fa-python' },
        { class: 'react', icon: 'fa-react' },
        { class: 'node', icon: 'fa-node-js' },
        { class: 'git', icon: 'fa-git-alt' },
        { class: 'docker', icon: 'fa-docker' }
    ];

    // Create tech icons
    function createTechIcon() {
        const icon = document.createElement('i');
        const randomTech = techIcons[Math.floor(Math.random() * techIcons.length)];
        
        // Add classes
        icon.className = `tech-icon ${randomTech.class} ${randomTech.icon}`;
        
        // Random position
        icon.style.left = Math.random() * 100 + 'vw';
        
        // Random size
        const size = 24 + Math.random() * 16; // Between 24px and 40px
        icon.style.fontSize = size + 'px';
        
        // Random animation duration (15-30 seconds)
        const duration = 15 + Math.random() * 15;
        icon.style.animationDuration = duration + 's';
        
        // Random delay (0-5 seconds)
        icon.style.animationDelay = Math.random() * 5 + 's';
        
        // Random opacity (0.3 to 0.8)
        const opacity = 0.3 + Math.random() * 0.5;
        icon.style.opacity = opacity;
        
        techBg.appendChild(icon);
        
        // Remove icon after animation completes
        setTimeout(() => {
            if (icon.parentNode === techBg) {
                techBg.removeChild(icon);
            }
        }, duration * 1000);
    }

    function createCodeParticle() {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        
        // Random code snippet
        const codeSnippets = ['<div>', 'function()', 'const', 'let', 'return', 'class', 'import', 'export', '{}', '[]', '=>', '()'];
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        particle.textContent = snippet;
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random animation duration
        const duration = 10 + Math.random() * 20;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random font size
        const size = 12 + Math.random() * 6;
        particle.style.fontSize = size + 'px';
        
        // Random opacity
        particle.style.opacity = 0.1 + Math.random() * 0.3;
        
        techBg.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration * 1000);
    }

    // Initialize the animation
    function initAnimation() {
        // Create initial elements
        for (let i = 0; i < 15; i++) {
            createTechIcon();
        }

        // Create new elements periodically (every 1-2 seconds)
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                createTechIcon();
            }
        }, 1000 + Math.random() * 1000);
        
        // Create code particles periodically
        setInterval(createCodeParticle, 500);
    }
    
    // Start the animation only when experience section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(experienceSection);
    
    // Handle tab visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // Create a few icons when tab becomes visible
            for (let i = 0; i < 5; i++) {
                setTimeout(createTechIcon, i * 300);
            }
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recreate all particles on resize for better positioning
            const particles = document.querySelectorAll('.tech-icon, .tech-particle');
            particles.forEach(p => p.remove());
            
            for (let i = 0; i < 15; i++) {
                createTechIcon();
            }
        }, 250);
    });
});
