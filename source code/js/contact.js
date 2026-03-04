document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    initFormTabs();
    initRatingSystems();
    initFormSubmissions();

    function initFormTabs() {
        const tabs = document.querySelectorAll('.form-tab');
        const forms = document.querySelectorAll('.contact-form');

        if (!tabs.length || !forms.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetId = this.getAttribute('data-form');

                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                forms.forEach(form => {
                    if (form.id === targetId + 'Form') {
                        form.classList.add('active');
                        form.style.animation = 'none';
                        form.offsetHeight;
                        form.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        form.classList.remove('active');
                    }
                });
            });
        });
    }

    function initRatingSystems() {
        const ratingContainers = document.querySelectorAll('.rating-stars');

        ratingContainers.forEach(container => {
            const stars = container.querySelectorAll('i');

            stars.forEach(star => {
                star.addEventListener('mouseover', function () {
                    highlightStars(stars, parseInt(this.getAttribute('data-rating')));
                });

                star.addEventListener('click', function () {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    container.setAttribute('data-selected', rating);
                    highlightStars(stars, rating);
                });
            });

            container.addEventListener('mouseleave', function () {
                highlightStars(stars, parseInt(this.getAttribute('data-selected')) || 0);
            });
        });
    }

    function highlightStars(stars, rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            star.classList.toggle('active', starRating <= rating);
            star.style.color = starRating <= rating ? 'var(--secondary)' : 'var(--gray-300)';
        });
    }

    function initFormSubmissions() {
        const formIds = [
            'generalInquiryForm',
            'suggestionSubmissionForm',
            'complaintSubmissionForm',
            'feedbackSubmissionForm'
        ];

        formIds.forEach(id => {
            const form = document.getElementById(id);
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
        const originalContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.classList.remove('btn-primary');
            submitBtn.style.backgroundColor = 'var(--accent)';
            submitBtn.style.color = 'white';

            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            form.reset();

            form.querySelectorAll('.rating-stars').forEach(container => {
                container.removeAttribute('data-selected');
                highlightStars(container.querySelectorAll('i'), 0);
            });

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.classList.add('btn-primary');
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);
        }, 1500);
    }

    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icons[type] || icons.info}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateX(calc(100% + 2rem))';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

});
