(function () {
    'use strict';

    function createScrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        bar.style.width = '0%';
        document.body.appendChild(bar);

        window.addEventListener('scroll', function () {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        }, { passive: true });
    }

    function initScrollReveal() {
        const selectors = [
            { sel: '.section-header', cls: 'fade-up' },
            { sel: '.section-title', cls: 'fade-up' },
            { sel: '.sport-detail-card', cls: 'fade-up' },
            { sel: '.plan-card', cls: 'fade-up' },
            { sel: '.event-card', cls: 'fade-up' },
            { sel: '.contact-card', cls: 'scale-up' },
            { sel: '.benefit-card', cls: 'fade-up' },
            { sel: '.champion-card', cls: 'fade-up' },
            { sel: '.testimonial-card', cls: 'fade-up' },
            { sel: '.gallery-item', cls: 'scale-up' },
            { sel: '.activity-card', cls: 'fade-up' },
            { sel: '.month-header', cls: 'fade-left' },
            { sel: '.stat-card', cls: 'scale-up' },
            { sel: '.feature-card', cls: 'fade-up' },
            { sel: '.visual-card', cls: 'fade-up' },
            { sel: '.map-container', cls: 'fade-up' },
            { sel: '.cta-section', cls: 'fade-up' },
            { sel: '.footer-content', cls: 'fade-up' }
        ];

        selectors.forEach(function (item) {
            document.querySelectorAll(item.sel).forEach(function (el, idx) {
                if (!el.classList.contains('fade-up') &&
                    !el.classList.contains('fade-left') &&
                    !el.classList.contains('fade-right') &&
                    !el.classList.contains('scale-up')) {
                    el.classList.add(item.cls);
                }
                el.style.transitionDelay = (idx * 0.08) + 's';
            });
        });

        var grids = document.querySelectorAll(
            '.sports-grid, .plans-grid, .events-grid, .contact-grid, ' +
            '.benefits-grid, .champions-grid, .gallery-grid, .activities-grid, ' +
            '.hero-stats, .stats-grid, .feature-grid, .filter-tabs, .form-tabs'
        );
        grids.forEach(function (grid) {
            grid.classList.add('stagger-children');
        });

        var animatedEls = document.querySelectorAll(
            '.fade-up, .fade-left, .fade-right, .scale-up, .stagger-children, .animate-on-scroll'
        );

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('prepare-anim');
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedEls.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('animated');
            } else {
                el.classList.add('prepare-anim');
                observer.observe(el);
            }
        });
    }

    function initCounters() {
        var counters = document.querySelectorAll('.stat-number, [data-count]');
        if (counters.length === 0) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) { observer.observe(c); });
    }

    function animateCounter(el) {
        var target;
        var prefix = '';
        var suffix = '';

        // Prefer data-count attribute for the target value
        if (el.dataset.count) {
            target = parseInt(el.dataset.count.replace(/,/g, ''), 10);
            // Check original text for any prefix/suffix (e.g. "$" or "+")
            var text = el.textContent.trim();
            var match = text.match(/(\d[\d,]*)/);
            if (match) {
                prefix = text.substring(0, text.indexOf(match[1]));
                suffix = text.substring(text.indexOf(match[1]) + match[1].length);
            }
        } else {
            // Fall back to parsing from text content
            var text = el.textContent.trim();
            var match = text.match(/(\d[\d,]*)/);
            if (!match) return;
            target = parseInt(match[1].replace(/,/g, ''), 10);
            prefix = text.substring(0, text.indexOf(match[1]));
            suffix = text.substring(text.indexOf(match[1]) + match[1].length);
        }

        if (isNaN(target) || target === 0) return;

        var duration = 1800;
        var start = performance.now();

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function step(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var current = Math.floor(easeOutExpo(progress) * target);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    function initParallax() {
        var heroBackground = document.querySelector('.hero-background, .header-background');
        if (!heroBackground) return;

        window.addEventListener('scroll', function () {
            var scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
            }
        }, { passive: true });
    }

    function initTilt() {
        if (window.matchMedia('(hover: none)').matches) return;

        var cards = document.querySelectorAll(
            '.plan-card, .event-card, .champion-card, .benefit-card'
        );

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
                var rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
                card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }

    function initMagneticButtons() {
        if (window.matchMedia('(hover: none)').matches) return;

        document.querySelectorAll('.btn').forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15 - 2) + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transform = '';
            });
        });
    }

    function initTypingEffect() {
        var titleMain = document.querySelector('.title-main');
        if (!titleMain || titleMain.dataset.typed) return;
        if (!document.querySelector('.hero-section')) return;

        titleMain.dataset.typed = 'true';
        var fullText = titleMain.textContent;
        titleMain.textContent = '';
        titleMain.style.opacity = '1';
        titleMain.style.borderRight = '2px solid var(--primary, #2563EB)';

        var charIndex = 0;

        function type() {
            if (charIndex < fullText.length) {
                titleMain.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50);
            } else {
                setTimeout(function () {
                    titleMain.style.borderRight = 'none';
                }, 1000);
            }
        }

        setTimeout(type, 1200);
    }

    function init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        createScrollProgress();
        initScrollReveal();
        initCounters();
        initParallax();
        initTilt();
        initMagneticButtons();
        setTimeout(initTypingEffect, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
