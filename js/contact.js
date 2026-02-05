// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Initialize contact page functionality
    initFormTabs();
    initRatingSystems();
    initFormSubmissions();

    console.log('📬 Contact page loaded successfully!');

    // Tab Switching Logic
    function initFormTabs() {
        const tabs = document.querySelectorAll('.form-tab');
        const forms = document.querySelectorAll('.contact-form');

        if (!tabs.length || !forms.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetId = this.getAttribute('data-form');

                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Switch form with animation
                forms.forEach(form => {
                    if (form.id === targetId + 'Form') {
                        // Show target form
                        form.classList.add('active');
                        // Reset animation
                        form.style.animation = 'none';
                        form.offsetHeight; /* trigger reflow */
                        form.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        form.classList.remove('active');
                    }
                });
            });
        });
    }

    // Rating System Logic (for interactive stars)
    function initRatingSystems() {
        const ratingContainers = document.querySelectorAll('.rating-stars');

        ratingContainers.forEach(container => {
            const stars = container.querySelectorAll('i');

            stars.forEach(star => {
                // Hover effect
                star.addEventListener('mouseover', function () {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    highlightStars(stars, rating);
                });

                // Click effect (set rating)
                star.addEventListener('click', function () {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    container.setAttribute('data-selected', rating);
                    highlightStars(stars, rating);
                });
            });

            // Reset on mouse leave if no rating selected
            container.addEventListener('mouseleave', function () {
                const selected = parseInt(this.getAttribute('data-selected')) || 0;
                highlightStars(stars, selected);
            });
        });
    }

    function highlightStars(stars, rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.add('active');
                star.style.color = 'var(--secondary)';
            } else {
                star.classList.remove('active');
                star.style.color = 'var(--gray-300)';
            }
        });
    }

    // Form Submission Logic
    function initFormSubmissions() {
        const forms = [
            'generalInquiryForm',
            'suggestionSubmissionForm',
            'complaintSubmissionForm',
            'feedbackSubmissionForm'
        ];

        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    handleFormSubmit(this);
                });
            }
        });
    }

    function handleFormSubmit(form) {
        const submitBtn = form.querySelector('.form-submit');
        const originalBtnContent = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Converting...';

        // Simulate API call
        setTimeout(() => {
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.classList.remove('btn-primary');
            submitBtn.style.backgroundColor = 'var(--accent)';
            submitBtn.style.color = 'white';

            // Show notification
            showNotification('Message sent successfully! We will get back to you soon.', 'success');

            // Reset form
            form.reset();

            // Reset stars if applicable
            const starContainers = form.querySelectorAll('.rating-stars');
            starContainers.forEach(container => {
                container.removeAttribute('data-selected');
                const stars = container.querySelectorAll('i');
                highlightStars(stars, 0);
            });

            // Reset button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.classList.add('btn-primary');
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);

        }, 1500);
    }

    // Notification System (Reusing from other pages or redefining if standalone)
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';

        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add basic styles directly if not in CSS
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                    border-left: 4px solid var(--primary);
                    max-width: 300px;
                }
                .notification-success { border-left-color: var(--accent); }
                .notification-error { border-left-color: #ef4444; }
                .notification-content { display: flex; align-items: flex-start; gap: 10px; }
                .notification i { margin-top: 3px; }
                .notification-success i { color: var(--accent); }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

});
