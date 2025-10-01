document.addEventListener('DOMContentLoaded', function() {
    // Initialize Masonry Grid
    const grid = document.querySelector('.gallery-grid');
    let msnry;
    
    if (grid) {
        imagesLoaded(grid, function() {
            msnry = new Masonry(grid, {
                itemSelector: '.gallery-item',
                columnWidth: '.gallery-item',
                percentPosition: true,
                transitionDuration: '0.4s',
                stagger: 30,
                initLayout: false
            });
            
            // Trigger layout after images are loaded
            msnry.layout();
            
            // Add loaded class for animations
            grid.classList.add('masonry-loaded');
            
            // Show all items with animation
            const items = grid.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                item.style.setProperty('--delay', index);
                item.classList.add('fade-in');
            });
        });
        
        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const items = grid.querySelectorAll('.gallery-item');
                
                items.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('fade-in');
                    }
                });
                
                // Re-layout after filtering
                if (msnry) {
                    msnry.layout();
                }
            });
        });
        
        // Load more functionality
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // Simulate loading more items (replace with actual data loading)
                const currentCount = document.querySelectorAll('.gallery-item').length;
                const newItems = [];
                const categories = ['events', 'campus', 'friends', 'achievements'];
                const categoryNames = ['Events', 'Campus', 'Friends', 'Achievements'];
                
                for (let i = 1; i <= 6; i++) {
                    const itemIndex = currentCount + i;
                    const randomCategory = Math.floor(Math.random() * categories.length);
                    
                    const item = document.createElement('div');
                    item.className = 'gallery-item fade-in';
                    item.setAttribute('data-category', categories[randomCategory]);
                    item.style.setProperty('--delay', i);
                    
                    item.innerHTML = `
                        <img src="{{ url_for('static', filename='images/college-fest/') }}${itemIndex}.jpg" 
                             alt="College Memory ${itemIndex}"
                             onerror="this.onerror=null; this.src='https://picsum.photos/800/600?random=${itemIndex}';">
                        <div class="gallery-overlay">
                            <span class="gallery-category">${categoryNames[randomCategory]}</span>
                            <div class="gallery-info">
                                <h3>Memory Title ${itemIndex}</h3>
                                <p>New memory added to the collection.</p>
                            </div>
                        </div>
                    `;
                    
                    newItems.push(item);
                }
                
                // Append new items to grid
                newItems.forEach(item => {
                    grid.appendChild(item);
                    
                    // Initialize imagesLoaded for new items
                    imagesLoaded(item, function() {
                        if (msnry) {
                            msnry.appended(item);
                            item.classList.add('fade-in');
                        }
                    });
                    
                    // Add click event for lightbox
                    item.addEventListener('click', function(e) {
                        if (!e.target.closest('button') && !e.target.closest('a')) {
                            openLightbox(this);
                        }
                    });
                });
                
                // Hide load more button if we've reached a certain number of items
                if (currentCount >= 24) {
                    loadMoreBtn.style.display = 'none';
                }
            });
        }
    }
    
    // Lightbox functionality
    function openLightbox(element) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxTitle = lightbox.querySelector('.lightbox-title');
        const lightboxDesc = lightbox.querySelector('.lightbox-description');
        const lightboxCategory = lightbox.querySelector('.lightbox-category');
        const lightboxDate = lightbox.querySelector('.lightbox-date');
        
        // Get data from clicked element or its children
        const imgSrc = element.querySelector('img').src;
        const title = element.querySelector('h3')?.textContent || 'Memory';
        const description = element.querySelector('p')?.textContent || 'No description available.';
        const category = element.getAttribute('data-category') || 'general';
        
        // Set lightbox content
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = description;
        lightboxCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        lightboxDate.textContent = new Date().toLocaleDateString();
        
        // Show lightbox
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
    }
    
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown);
    }
    
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            // Navigate to previous image
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            // Navigate to next image
            navigateLightbox(1);
        }
    }
    
    function navigateLightbox(direction) {
        // Implementation for navigating between images
        console.log('Navigate', direction);
    }
    
    // Close lightbox when clicking outside content
    document.querySelector('.lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Close button
    document.querySelector('.close-btn').addEventListener('click', closeLightbox);
    
    // View details buttons in horizontal scroll
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const lightbox = document.getElementById('lightbox');
            lightbox.querySelector('.lightbox-img').src = this.getAttribute('data-image');
            lightbox.querySelector('.lightbox-title').textContent = this.getAttribute('data-title');
            lightbox.querySelector('.lightbox-description').textContent = this.getAttribute('data-description');
            lightbox.querySelector('.lightbox-category').textContent = this.getAttribute('data-category');
            lightbox.querySelector('.lightbox-date').textContent = new Date(this.getAttribute('data-date')).toLocaleDateString();
            
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        });
    });
    
    // Parallax effect for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    window.addEventListener('mousemove', function(e) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        galleryItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;
            
            const moveX = (mouseX - centerX) * 0.01;
            const moveY = (mouseY - centerY) * 0.01;
            
            item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });
});
