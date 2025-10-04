// Project Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle project details on click
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', function() {
            const details = this.querySelector('.project-details');
            const icon = this.querySelector('.project-toggle i');
            
            if (details.style.maxHeight) {
                details.style.maxHeight = null;
                icon.className = 'fas fa-chevron-down';
            } else {
                details.style.maxHeight = details.scrollHeight + 'px';
                icon.className = 'fas fa-chevron-up';
            }
        });
    });

    // Handle load more buttons
    document.querySelectorAll('.load-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const hiddenItems = document.querySelectorAll(targetId + ' .d-none');
            
            // Show next 2 hidden items
            for (let i = 0; i < 2 && i < hiddenItems.length; i++) {
                hiddenItems[i].classList.remove('d-none');
            }
            
            // Hide button if no more items to show
            if (hiddenItems.length <= 2) {
                this.style.display = 'none';
            }
        });
    });
});
