

$(document).ready(function () {
    'use strict';

    initNavigation();
    initScrollEffects();
    initHeroAnimation();

    function initNavigation() {
        var $navbar = $('#navbar');
        var $navToggle = $('#navToggle');
        var $navMenu = $('#navMenu');
        var $navLinks = $('.nav-link');

        if (!$navbar.length || !$navToggle.length || !$navMenu.length) return;

        $(window).on('scroll', function () {
            $navbar.toggleClass('scrolled', $(window).scrollTop() > 100);
        });

        $navToggle.on('click', function () {
            $(this).toggleClass('active');
            $navMenu.toggleClass('active');
            $('body').toggleClass('menu-open');
        });

        $navLinks.on('click', function () {
            $navToggle.removeClass('active');
            $navMenu.removeClass('active');
            $('body').removeClass('menu-open');
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('#navToggle, #navMenu').length) {
                $navToggle.removeClass('active');
                $navMenu.removeClass('active');
                $('body').removeClass('menu-open');
            }
        });
        $(window).on('resize', function () {
            if ($(window).width() > 768) {
                $navToggle.removeClass('active');
                $navMenu.removeClass('active');
                $('body').removeClass('menu-open');
            }
        });
    }


    function initScrollEffects() {
        var $backToTop = $('#backToTop');

        if ($backToTop.length) {
            $(window).on('scroll', function () {
                $backToTop.toggleClass('visible', $(window).scrollTop() > 300);
            });


            $backToTop.on('click', function () {
                $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
            });
        }


        $('a[href^="#"]').on('click', function (e) {
            var $target = $($(this).attr('href'));
            if ($target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $target.offset().top
                }, 600, 'swing');
            }
        });
    }


    function initHeroAnimation() {
        var $heroElements = $('.hero-badge, .hero-title, .hero-description, .hero-actions');


        $heroElements.css({
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
        });

        $(window).on('load', function () {
            $('body').addClass('loaded');
            $heroElements.each(function (index) {
                var $el = $(this);
                setTimeout(function () {
                    $el.css({
                        opacity: 1,
                        transform: 'translateY(0)'
                    });
                }, index * 200);
            });
        });
    }
});