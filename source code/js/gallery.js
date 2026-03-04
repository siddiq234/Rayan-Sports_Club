document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    initGalleryFilters();
    initLightbox();
    enhanceGalleryExperience();

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