document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    initNavigation();
    initScrollEffects();

    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navbar || !navToggle || !navMenu) return;

        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        }, { passive: true });

        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    function initScrollEffects() {
        const backToTop = document.getElementById('backToTop');

        if (backToTop) {
            window.addEventListener('scroll', function () {
                backToTop.classList.toggle('visible', window.scrollY > 300);
            }, { passive: true });

            backToTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});