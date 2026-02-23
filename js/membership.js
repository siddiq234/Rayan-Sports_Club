document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    initMembershipForm();
    initPlanSelection();

    function initPlanSelection() {
        const startDateInput = document.getElementById('startDate');
        if (startDateInput) {
            const today = new Date().toISOString().split('T')[0];
            startDateInput.min = today;

            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            startDateInput.value = nextWeek.toISOString().split('T')[0];
        }
    }

    window.selectPlan = function (planType) {
        const planSelect = document.getElementById('membershipPlan');
        if (planSelect) planSelect.value = planType;

        document.querySelector('.membership-form-section').scrollIntoView({ behavior: 'smooth' });

        document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('selected'));
        const selectedCard = document.querySelector(`[onclick="selectPlan('${planType}')"]`).closest('.plan-card');
        if (selectedCard) selectedCard.classList.add('selected');
    };

    function initMembershipForm() {
        const form = document.getElementById('membershipForm');
        if (form) form.addEventListener('submit', handleFormSubmission);
    }

    function handleFormSubmission(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const membershipData = {};

        for (let [key, value] of formData.entries()) {
            if (membershipData[key]) {
                membershipData[key] = Array.isArray(membershipData[key])
                    ? [...membershipData[key], value]
                    : [membershipData[key], value];
            } else {
                membershipData[key] = value;
            }
        }

        membershipData.submissionDate = new Date().toISOString();
        membershipData.membershipId = generateMembershipId();

        saveMembershipData(membershipData);
        showSuccessModal(membershipData);
    }

    function generateMembershipId() {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `RSC${timestamp}${random}`;
    }

    function saveMembershipData(data) {
        try {
            const existing = JSON.parse(localStorage.getItem('ryanSportsClubMemberships') || '[]');
            existing.push(data);
            localStorage.setItem('ryanSportsClubMemberships', JSON.stringify(existing));
        } catch (error) {
            console.error('Error saving membership data:', error);
        }
    }

    function showSuccessModal(membershipData) {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Welcome to Ryan Sports Club!</h2>
                    <p>Your membership application has been submitted successfully.</p>
                </div>
                <div class="modal-body">
                    <div class="membership-details">
                        <div class="detail-item">
                            <strong>Membership ID:</strong>
                            <span>${membershipData.membershipId}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Plan:</strong>
                            <span>${membershipData.membershipPlan}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Start Date:</strong>
                            <span>${new Date(membershipData.startDate).toLocaleDateString()}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Member Name:</strong>
                            <span>${membershipData.firstName} ${membershipData.lastName}</span>
                        </div>
                    </div>
                    <div class="next-steps">
                        <h3>Next Steps:</h3>
                        <ul>
                            <li>Check your email for confirmation and payment instructions</li>
                            <li>Visit our facility for orientation and key card pickup</li>
                            <li>Download our mobile app for easy access and booking</li>
                            <li>Schedule your complimentary fitness assessment</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="closeSuccessModal()">
                        <span>Continue</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => { modal.style.opacity = '1'; }, 10);
    }

    window.closeSuccessModal = function () {
        const modal = document.querySelector('.success-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                window.location.href = 'index.html';
            }, 300);
        }
    };

    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
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

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
    }

    document.addEventListener('input', function (e) {
        if (e.target.type === 'email') {
            e.target.style.borderColor = e.target.value && !validateEmail(e.target.value) ? '#ef4444' : '';
        }
        if (e.target.type === 'tel') {
            e.target.style.borderColor = e.target.value && !validatePhone(e.target.value) ? '#ef4444' : '';
        }
    });

});
