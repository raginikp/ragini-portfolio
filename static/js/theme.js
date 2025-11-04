(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Check for saved user preference or system preference
        const getCurrentTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            return prefersDarkScheme.matches ? 'dark' : 'light';
        };

        // Apply theme
        function applyTheme() {
            const theme = getCurrentTheme();
            document.documentElement.setAttribute('data-bs-theme', theme);
            document.body.classList.toggle('dark-theme', theme === 'dark');
            if (themeIcon) {
                themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            if (typeof AOS !== 'undefined') AOS.refresh();
        }

        // Toggle theme
        function toggleTheme() {
            const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme();
        }

        // Initialize
        applyTheme();
        if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

        // Watch for system theme changes
        prefersDarkScheme.addEventListener('change', () => {
            if (!localStorage.getItem('theme')) {
                applyTheme();
            }
        });
    });
})();