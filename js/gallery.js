// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize gallery functionality
    initGalleryFilters();
    initLightbox();
    
    console.log('📸 Gallery page loaded successfully!');

    // Gallery filtering functionality
    function initGalleryFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items
                filterGallery(filter, galleryItems);
            });
        });
    }

    function filterGallery(filter, items) {
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    if (item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    // Lightbox functionality
    function initLightbox() {
        // Close lightbox when clicking outside or on close button
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // Global function for opening lightbox
    window.openLightbox = function(element) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        
        // Get image data from the clicked element
        const imageData = getImageData(element);
        
        // Update lightbox content
        lightboxImage.innerHTML = `<i class="${imageData.icon}"></i>`;
        lightboxImage.style.background = imageData.background;
        lightboxTitle.textContent = imageData.title;
        lightboxDescription.textContent = imageData.description;
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    };

    // Global function for closing lightbox
    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    };

    function getImageData(element) {
        const overlayContent = element.querySelector('.overlay-content');
        const icon = element.querySelector('.image-placeholder i');
        const placeholder = element.querySelector('.image-placeholder');
        
        let title = 'Gallery Image';
        let description = 'Ryan Sports Club';
        let iconClass = 'fas fa-image';
        let background = 'var(--gradient-primary)';
        
        if (overlayContent) {
            const titleElement = overlayContent.querySelector('h4');
            const descElement = overlayContent.querySelector('p');
            
            if (titleElement) title = titleElement.textContent;
            if (descElement) description = descElement.textContent;
        }
        
        if (icon) {
            iconClass = icon.className;
        }
        
        if (placeholder) {
            const computedStyle = window.getComputedStyle(placeholder);
            background = computedStyle.background || 'var(--gradient-primary)';
        }
        
        return {
            title: title,
            description: description,
            icon: iconClass,
            background: background
        };
    }

    // Gallery image data for enhanced experience
    const galleryData = {
        facilities: [
            {
                title: 'Olympic Swimming Pool',
                description: '50m professional swimming facility with 8 lanes, perfect for competitive training and recreational swimming.',
                icon: 'fas fa-swimming-pool'
            },
            {
                title: 'Modern Gym Equipment',
                description: 'State-of-the-art fitness machines from leading manufacturers, regularly maintained and updated.',
                icon: 'fas fa-dumbbell'
            },
            {
                title: 'Basketball Courts',
                description: 'Professional indoor courts with proper lighting and ventilation for optimal playing conditions.',
                icon: 'fas fa-basketball-ball'
            },
            {
                title: 'Recovery Center',
                description: 'Comprehensive wellness and recovery facilities including saunas, massage rooms, and relaxation areas.',
                icon: 'fas fa-spa'
            }
        ],
        events: [
            {
                title: 'Annual Awards Ceremony',
                description: 'Celebrating our champions and recognizing outstanding achievements in various sports categories.',
                icon: 'fas fa-trophy'
            },
            {
                title: 'Family Fun Day',
                description: 'Community gathering event with activities for all ages, bringing families together through sports.',
                icon: 'fas fa-users'
            },
            {
                title: 'Charity Marathon',
                description: 'Annual charity run supporting local community causes, bringing together runners for a good cause.',
                icon: 'fas fa-heart'
            }
        ],
        sports: [
            {
                title: 'Swimming Competition',
                description: 'Athletes showcasing their skills in various swimming strokes and distances.',
                icon: 'fas fa-swimmer'
            },
            {
                title: 'Tennis Tournament',
                description: 'Intense matches featuring our talented tennis players in action on professional courts.',
                icon: 'fas fa-tennis-ball'
            },
            {
                title: 'Football Match',
                description: 'Team sports at its finest with our football teams competing in league matches.',
                icon: 'fas fa-futbol'
            }
        ],
        champions: [
            {
                title: 'Medal Ceremony',
                description: 'Victory moments captured as our athletes receive recognition for their outstanding achievements.',
                icon: 'fas fa-medal'
            },
            {
                title: 'Championship Team',
                description: 'Our winning squad celebrating their success in regional and national competitions.',
                icon: 'fas fa-crown'
            },
            {
                title: 'Rising Stars',
                description: 'Future champions in training, showing promise and dedication in their respective sports.',
                icon: 'fas fa-star'
            }
        ]
    };

    // Enhanced gallery interaction
    function enhanceGalleryExperience() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            // Add hover effects
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add loading animation
            const placeholder = item.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.opacity = '0';
                setTimeout(() => {
                    placeholder.style.opacity = '1';
                    placeholder.style.transition = 'opacity 0.5s ease';
                }, index * 100);
            }
        });
    }

    // Initialize enhanced experience
    enhanceGalleryExperience();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.champion-card, .gallery-item, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Gallery statistics counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent.replace(/\D/g, '');
            const suffix = counter.textContent.replace(/\d/g, '');
            
            if (target) {
                animateCounter(counter, parseInt(target), suffix);
            }
        });
    }

    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.gallery-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    // Navigate to previous image (could be implemented)
                    break;
                case 'ArrowRight':
                    // Navigate to next image (could be implemented)
                    break;
            }
        }
    });

    // Touch/swipe support for mobile lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const lightbox = document.getElementById('lightbox');
        
        if (lightbox.classList.contains('active')) {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left - next image
                    console.log('Swipe left - next image');
                } else {
                    // Swiped right - previous image
                    console.log('Swipe right - previous image');
                }
            }
        }
    }

    // Performance optimization for gallery
    function optimizeGalleryPerformance() {
        // Lazy loading simulation for image placeholders
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target.querySelector('.image-placeholder');
                    if (placeholder && !placeholder.classList.contains('loaded')) {
                        // Simulate image loading
                        setTimeout(() => {
                            placeholder.classList.add('loaded');
                            placeholder.style.opacity = '1';
                        }, Math.random() * 500 + 200);
                    }
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        galleryItems.forEach(item => {
            const placeholder = item.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.opacity = '0.7';
                lazyObserver.observe(item);
            }
        });
    }

    // Initialize performance optimizations
    optimizeGalleryPerformance();

    // Add smooth scrolling to gallery sections
    function addSmoothScrolling() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Smooth scroll to gallery section after filtering
                setTimeout(() => {
                    const gallerySection = document.querySelector('.photo-gallery');
                    if (gallerySection) {
                        gallerySection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100);
            });
        });
    }

    addSmoothScrolling();
});