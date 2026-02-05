// Ryan Sports Club - Professional Animated JavaScript
$(document).ready(function() {
    'use strict';

    // Immediate fallback to hide loading screen if there are issues
    setTimeout(function() {
        if ($('#loading-screen').is(':visible')) {
            $('#loading-screen').addClass('hidden');
            setTimeout(function() {
                $('#loading-screen').remove();
            }, 500);
        }
    }, 3000); // Fallback after 3 seconds maximum

    // Initialize the application
    initializeApp();

    function initializeApp() {
        // Initialize loading screen
        initLoadingScreen();
        
        // Initialize animations
        initAOS();
        
        // Initialize navigation
        initNavigation();
        
        // Initialize hero effects
        initHeroEffects();
        
        // Initialize forms
        initForms();
        
        // Initialize counters
        initCounters();
        
        // Initialize scroll effects
        initScrollEffects();
        
        // Initialize particles
        initParticles();
        
        console.log('🏆 Ryan Sports Club - Professional website loaded successfully!');
    }

    // Loading Screen
    function initLoadingScreen() {
        // Hide loading screen after a shorter time and ensure it works without external dependencies
        setTimeout(function() {
            $('#loading-screen').addClass('hidden');
            setTimeout(function() {
                $('#loading-screen').remove();
            }, 500);
        }, 1500); // Reduced from 2000ms to 1500ms
        
        // Also hide on window load as backup
        $(window).on('load', function() {
            setTimeout(function() {
                $('#loading-screen').addClass('hidden');
                setTimeout(function() {
                    $('#loading-screen').remove();
                }, 500);
            }, 800);
        });

        // Click to skip loading screen
        $('#loading-screen').on('click', function() {
            $(this).addClass('hidden');
            setTimeout(function() {
                $('#loading-screen').remove();
            }, 500);
        });
    }

    // Initialize AOS (Animate On Scroll)
    function initAOS() {
        // Check if AOS is loaded, if not, continue without it
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out-cubic',
                once: true,
                offset: 100,
                delay: 100
            });
        } else {
            console.log('AOS library not loaded, continuing without scroll animations');
        }
    }

    // Navigation
    function initNavigation() {
        const navbar = $('#navbar');
        const navToggle = $('#nav-toggle');
        const navMenu = $('#nav-menu');
        const navLinks = $('.nav-link');

        // Navbar scroll effect
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                navbar.addClass('scrolled');
            } else {
                navbar.removeClass('scrolled');
            }
        });

        // Mobile menu toggle
        navToggle.on('click', function() {
            $(this).toggleClass('active');
            navMenu.toggleClass('active');
        });

        // Smooth scrolling for navigation links
        navLinks.on('click', function(e) {
            const href = $(this).attr('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = $(href);
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800, 'easeInOutCubic');
                    
                    // Close mobile menu
                    navToggle.removeClass('active');
                    navMenu.removeClass('active');
                    
                    // Update active link
                    navLinks.removeClass('active');
                    $(this).addClass('active');
                }
            }
        });

        // Update active navigation on scroll
        $(window).on('scroll', debounce(updateActiveNav, 100));
    }

    function updateActiveNav() {
        const scrollPos = $(window).scrollTop() + 100;
        const sections = $('section[id]');
        
        sections.each(function() {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionHeight = section.outerHeight();
            const sectionId = section.attr('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $('.nav-link').removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    }

    // Hero Effects
    function initHeroEffects() {
        // Typing effect for hero title
        const titleMain = $('.title-main');
        const text = titleMain.text();
        titleMain.text('');
        
        setTimeout(function() {
            typeWriter(titleMain, text, 100);
        }, 1000);

        // Parallax effect for hero
        $(window).on('scroll', function() {
            const scrolled = $(window).scrollTop();
            const parallax = scrolled * 0.5;
            $('.hero-background').css('transform', `translateY(${parallax}px)`);
        });
    }

    function typeWriter(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Particle System
    function initParticles() {
        const particlesContainer = $('#particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
    }

    function createParticle(container) {
        const particle = $('<div class="particle"></div>');
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 2;

        particle.css({
            left: x + '%',
            top: y + '%',
            width: size + 'px',
            height: size + 'px',
            animationDuration: duration + 's',
            animationDelay: delay + 's'
        });

        container.append(particle);
    }

    // Counter Animation
    function initCounters() {
        const counters = $('.stat-number[data-count]');
        let animated = false;

        $(window).on('scroll', function() {
            if (!animated && isElementInViewport(counters.first()[0])) {
                animated = true;
                counters.each(function() {
                    const counter = $(this);
                    const target = parseInt(counter.data('count'));
                    animateCounter(counter, target);
                });
            }
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.text(Math.floor(current));
        }, 20);
    }

    // Forms
    function initForms() {
        // Membership Form
        $('#membershipForm').on('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'membership');
        });

        // Suggestion Form
        $('#suggestionForm').on('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'suggestion');
        });

        // Feedback Form
        $('#feedbackForm').on('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'feedback');
        });

        // Form field animations
        $('.form-group input, .form-group select, .form-group textarea').on('focus blur', function() {
            $(this).closest('.form-group').toggleClass('focused');
        });

        // Custom select styling
        $('select').on('change', function() {
            if ($(this).val()) {
                $(this).addClass('has-value');
            } else {
                $(this).removeClass('has-value');
            }
        });
    }

    function handleFormSubmission(form, type) {
        const submitBtn = $(form).find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        // Show loading state
        submitBtn.prop('disabled', true)
                 .html('<i class="fas fa-spinner fa-spin"></i> Processing...');

        // Simulate form processing
        setTimeout(function() {
            // Collect form data
            const formData = collectFormData(form, type);
            
            // Save to localStorage
            saveFormData(formData, type);
            
            // Show success message
            showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} submitted successfully!`, 'success');
            
            // Reset form
            form.reset();
            $(form).find('.form-group').removeClass('focused');
            $(form).find('select').removeClass('has-value');
            
            // Reset button
            submitBtn.prop('disabled', false).html(originalText);
            
            console.log(`${type} submitted:`, formData);
        }, 2000);
    }

    function collectFormData(form, type) {
        const formData = {
            type: type,
            timestamp: new Date().toISOString()
        };

        $(form).find('input, select, textarea').each(function() {
            const field = $(this);
            const name = field.attr('id') || field.attr('name');
            
            if (field.attr('type') === 'checkbox') {
                if (!formData.interests) formData.interests = [];
                if (field.is(':checked')) {
                    formData.interests.push(field.val());
                }
            } else if (field.attr('type') === 'radio') {
                if (field.is(':checked')) {
                    formData[name] = field.val();
                }
            } else if (name && field.val()) {
                formData[name] = field.val();
            }
        });

        return formData;
    }

    function saveFormData(data, type) {
        const storageKey = `ryansports_${type}`;
        const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
        existingData.push(data);
        localStorage.setItem(storageKey, JSON.stringify(existingData));
    }

    // Scroll Effects
    function initScrollEffects() {
        // Back to top button
        const backToTop = $('#backToTop');
        
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 300) {
                backToTop.addClass('visible');
            } else {
                backToTop.removeClass('visible');
            }
        });

        backToTop.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800, 'easeInOutCubic');
        });

        // Reveal animations on scroll
        $(window).on('scroll', debounce(revealOnScroll, 100));
    }

    function revealOnScroll() {
        $('.sport-card, .recreation-card, .champion-card, .gallery-item').each(function() {
            if (isElementInViewport(this)) {
                $(this).addClass('revealed');
            }
        });
    }

    // Card Hover Effects
    $(document).on('mouseenter', '.sport-card', function() {
        $(this).find('.card-background').addClass('hovered');
    }).on('mouseleave', '.sport-card', function() {
        $(this).find('.card-background').removeClass('hovered');
    });

    // Gallery Lightbox Effect
    $('.gallery-item').on('click', function() {
        const title = $(this).find('h3').text();
        const description = $(this).find('p').text();
        showLightbox(title, description);
    });

    function showLightbox(title, description) {
        const lightbox = $(`
            <div class="lightbox-overlay">
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <div class="lightbox-image">
                        <i class="fas fa-image"></i>
                    </div>
                    <div class="lightbox-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        `);

        $('body').append(lightbox);
        
        setTimeout(function() {
            lightbox.addClass('active');
        }, 10);

        lightbox.on('click', function(e) {
            if (e.target === this || $(e.target).hasClass('lightbox-close')) {
                lightbox.removeClass('active');
                setTimeout(function() {
                    lightbox.remove();
                }, 300);
            }
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <i class="fas fa-${getNotificationIcon(type)}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close">&times;</button>
            </div>
        `);

        $('body').append(notification);
        
        setTimeout(function() {
            notification.addClass('show');
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(function() {
            removeNotification(notification);
        }, 5000);

        // Manual close
        notification.find('.notification-close').on('click', function() {
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.removeClass('show');
        setTimeout(function() {
            notification.remove();
        }, 300);
    }

    function getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-triangle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Utility Functions
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Custom easing for jQuery animations
    $.easing.easeInOutCubic = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    // Keyboard Navigation
    $(document).on('keydown', function(e) {
        // ESC key closes modals/overlays
        if (e.keyCode === 27) {
            $('.lightbox-overlay').removeClass('active');
            setTimeout(function() {
                $('.lightbox-overlay').remove();
            }, 300);
        }
    });

    // Performance Optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        // Update scroll-based animations here
        ticking = false;
    }

    $(window).on('scroll', requestTick);

    // Debug Functions (Development Only)
    window.viewStoredData = function() {
        console.log('Membership Data:', JSON.parse(localStorage.getItem('ryansports_membership') || '[]'));
        console.log('Suggestion Data:', JSON.parse(localStorage.getItem('ryansports_suggestion') || '[]'));
        console.log('Feedback Data:', JSON.parse(localStorage.getItem('ryansports_feedback') || '[]'));
    };

    window.clearStoredData = function() {
        localStorage.removeItem('ryansports_membership');
        localStorage.removeItem('ryansports_suggestion');
        localStorage.removeItem('ryansports_feedback');
        console.log('All stored data cleared');
    };

    // Add dynamic styles for notifications and lightbox
    const dynamicStyles = `
        <style>
        .notification {
            position: fixed;
            top: 100px;
            right: -400px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 1rem 1.5rem;
            z-index: 10000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 300px;
            max-width: 400px;
        }

        .notification.show {
            right: 20px;
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .notification-content i {
            font-size: 1.2rem;
        }

        .notification-success {
            border-left: 4px solid #28a745;
        }

        .notification-success i {
            color: #28a745;
        }

        .notification-error {
            border-left: 4px solid #dc3545;
        }

        .notification-error i {
            color: #dc3545;
        }

        .notification-close {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #666;
        }

        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .lightbox-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .lightbox-content {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }

        .lightbox-overlay.active .lightbox-content {
            transform: scale(1);
        }

        .lightbox-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }

        .lightbox-image {
            text-align: center;
            margin-bottom: 1rem;
        }

        .lightbox-image i {
            font-size: 4rem;
            color: var(--primary-color);
        }

        .lightbox-info h3 {
            margin-bottom: 0.5rem;
            color: var(--text-dark);
        }

        .lightbox-info p {
            color: var(--text-gray);
        }
        </style>
    `;

    $('head').append(dynamicStyles);

    console.log('🚀 Ryan Sports Club - All systems ready!');
});