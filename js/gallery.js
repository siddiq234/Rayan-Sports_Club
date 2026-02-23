document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    initGalleryFilters();
    initLightbox();
    enhanceGalleryExperience();
    optimizeGalleryPerformance();
    addSmoothScrolling();
    initScrollAnimations();
    initCounterAnimation();

    function initGalleryFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                filterGallery(this.getAttribute('data-filter'), galleryItems);
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
                    if (item.classList.contains('hidden')) item.style.display = 'none';
                }, 300);
            }
        });
    }

    function initLightbox() {
        document.addEventListener('keydown', function (e) {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox || !lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
        });
    }

    window.openLightbox = function (element) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');

        const data = getImageData(element);

        lightboxImage.innerHTML = data.imageSrc
            ? `<img src="${data.imageSrc}" alt="${data.title}" style="width:100%;height:100%;object-fit:cover;">`
            : `<i class="${data.icon}"></i>`;
        lightboxImage.style.background = data.background;
        lightboxTitle.textContent = data.title;
        lightboxDescription.textContent = data.description;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { lightbox.style.opacity = '1'; }, 10);
    };

    window.closeLightbox = function () {
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
        const img = element.querySelector('.image-placeholder img');

        let title = 'Gallery Image';
        let description = 'Ryan Sports Club';

        if (overlayContent) {
            const titleEl = overlayContent.querySelector('h4');
            const descEl = overlayContent.querySelector('p');
            if (titleEl) title = titleEl.textContent;
            if (descEl) description = descEl.textContent;
        }

        return {
            title,
            description,
            imageSrc: img ? img.src : null,
            icon: icon ? icon.className : 'fas fa-image',
            background: placeholder ? window.getComputedStyle(placeholder).background : 'var(--gradient-primary)'
        };
    }

    function enhanceGalleryExperience() {
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });

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

    function optimizeGalleryPerformance() {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target.querySelector('.image-placeholder');
                    if (placeholder && !placeholder.classList.contains('loaded')) {
                        setTimeout(() => {
                            placeholder.classList.add('loaded');
                            placeholder.style.opacity = '1';
                        }, Math.random() * 500 + 200);
                    }
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.gallery-item').forEach(item => {
            const placeholder = item.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.opacity = '0.7';
                lazyObserver.observe(item);
            }
        });
    }

    function addSmoothScrolling() {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', function () {
                setTimeout(() => {
                    const gallerySection = document.querySelector('.photo-gallery');
                    if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            });
        });
    }

    function initScrollAnimations() {
        const elements = document.querySelectorAll('.champion-card, .gallery-item, .stat-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    function initCounterAnimation() {
        const statsSection = document.querySelector('.gallery-stats');
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.stat-number').forEach(counter => {
                        const target = parseInt(counter.textContent.replace(/\D/g, ''));
                        const suffix = counter.textContent.replace(/\d/g, '');
                        if (!target) return;

                        let current = 0;
                        const increment = target / 100;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            counter.textContent = Math.floor(current) + suffix;
                        }, 20);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Touch swipe to close lightbox on mobile
    let touchStartX = 0;
    document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
    document.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active') && Math.abs(diff) > 50) {
            closeLightbox();
        }
    });

});