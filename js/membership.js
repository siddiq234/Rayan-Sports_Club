// Membership Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize membership functionality
    initMembershipForm();
    initPlanSelection();
    
    console.log('💪 Membership page loaded successfully!');

    let currentStep = 1;
    const totalSteps = 3;

    // Plan selection functionality
    function initPlanSelection() {
        // Set minimum date to today
        const startDateInput = document.getElementById('startDate');
        if (startDateInput) {
            const today = new Date().toISOString().split('T')[0];
            startDateInput.min = today;
            
            // Set default to next week
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            startDateInput.value = nextWeek.toISOString().split('T')[0];
        }
    }

    // Plan selection from pricing cards
    window.selectPlan = function(planType) {
        const membershipPlanSelect = document.getElementById('membershipPlan');
        if (membershipPlanSelect) {
            membershipPlanSelect.value = planType;
        }
        
        // Scroll to form
        document.querySelector('.membership-form-section').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Highlight selected plan
        document.querySelectorAll('.plan-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[onclick="selectPlan('${planType}')"]`).closest('.plan-card');
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
    };

    // Multi-step form functionality
    function initMembershipForm() {
        updateFormDisplay();
        updateProgressBar();
        
        // Form submission
        const form = document.getElementById('membershipForm');
        if (form) {
            form.addEventListener('submit', handleFormSubmission);
        }
    }

    // Step navigation
    window.changeStep = function(direction) {
        if (direction === 1 && !validateCurrentStep()) {
            return;
        }
        
        currentStep += direction;
        
        if (currentStep < 1) currentStep = 1;
        if (currentStep > totalSteps) currentStep = totalSteps;
        
        updateFormDisplay();
        updateProgressBar();
        updateNavigationButtons();
    };

    function updateFormDisplay() {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        // Previous button
        if (prevBtn) {
            prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
        }
        
        // Next/Submit buttons
        if (currentStep === totalSteps) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'inline-flex';
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    function updateProgressBar() {
        const progressFill = document.getElementById('progressFill');
        const progressSteps = document.querySelectorAll('.progress-step');
        
        // Update progress bar
        if (progressFill) {
            const progressPercentage = (currentStep / totalSteps) * 100;
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber < currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === currentStep) {
                step.classList.add('active');
            }
        });
    }

    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (!currentStepElement) return true;
        
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
                
                // Remove error styling after user starts typing
                field.addEventListener('input', function() {
                    this.style.borderColor = '';
                }, { once: true });
            }
        });
        
        // Special validation for step 3 (agreements)
        if (currentStep === 3) {
            const requiredCheckboxes = currentStepElement.querySelectorAll('input[name="agreements"][required]');
            requiredCheckboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    isValid = false;
                    checkbox.closest('.checkbox-item').style.borderColor = '#ef4444';
                    
                    checkbox.addEventListener('change', function() {
                        this.closest('.checkbox-item').style.borderColor = '';
                    }, { once: true });
                }
            });
        }
        
        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
        }
        
        return isValid;
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        
        if (!validateCurrentStep()) {
            return;
        }
        
        // Collect form data
        const formData = new FormData(e.target);
        const membershipData = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (membershipData[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(membershipData[key])) {
                    membershipData[key].push(value);
                } else {
                    membershipData[key] = [membershipData[key], value];
                }
            } else {
                membershipData[key] = value;
            }
        }
        
        // Add timestamp
        membershipData.submissionDate = new Date().toISOString();
        membershipData.membershipId = generateMembershipId();
        
        // Save to localStorage (in real app, this would be sent to server)
        saveMembershipData(membershipData);
        
        // Show success message
        showSuccessModal(membershipData);
    }

    function generateMembershipId() {
        const prefix = 'RSC';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `${prefix}${timestamp}${random}`;
    }

    function saveMembershipData(data) {
        try {
            // Get existing memberships
            const existingMemberships = JSON.parse(localStorage.getItem('ryanSportsClubMemberships') || '[]');
            
            // Add new membership
            existingMemberships.push(data);
            
            // Save back to localStorage
            localStorage.setItem('ryanSportsClubMemberships', JSON.stringify(existingMemberships));
            
            console.log('Membership data saved:', data);
        } catch (error) {
            console.error('Error saving membership data:', error);
        }
    }

    function showSuccessModal(membershipData) {
        // Create modal
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
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .success-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 1.5rem;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            
            .modal-header {
                text-align: center;
                padding: 3rem 3rem 2rem;
                background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
                color: white;
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 2.5rem;
            }
            
            .modal-header h2 {
                color: white;
                margin-bottom: 1rem;
            }
            
            .modal-header p {
                color: rgba(255, 255, 255, 0.9);
                margin: 0;
            }
            
            .modal-body {
                padding: 2rem 3rem;
            }
            
            .membership-details {
                background: var(--gray-50);
                border-radius: 1rem;
                padding: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 0;
                border-bottom: 1px solid var(--gray-200);
            }
            
            .detail-item:last-child {
                border-bottom: none;
            }
            
            .next-steps h3 {
                color: var(--gray-900);
                margin-bottom: 1rem;
            }
            
            .next-steps ul {
                list-style: none;
                padding: 0;
            }
            
            .next-steps li {
                padding: 0.5rem 0;
                padding-left: 1.5rem;
                position: relative;
                color: var(--gray-600);
            }
            
            .next-steps li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--accent);
                font-weight: bold;
            }
            
            .modal-actions {
                padding: 2rem 3rem;
                text-align: center;
                border-top: 1px solid var(--gray-200);
            }
        `;
        document.head.appendChild(style);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    window.closeSuccessModal = function() {
        const modal = document.querySelector('.success-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                // Redirect to home page
                window.location.href = 'index.html';
            }, 300);
        }
    };

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 2rem;
                background: white;
                border-radius: 0.5rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            
            .notification-info {
                border-left: 4px solid var(--primary);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 1.5rem;
            }
            
            .notification-error i {
                color: #ef4444;
            }
            
            .notification-info i {
                color: var(--primary);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Form validation helpers
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Add real-time validation
    document.addEventListener('input', function(e) {
        if (e.target.type === 'email') {
            if (e.target.value && !validateEmail(e.target.value)) {
                e.target.style.borderColor = '#ef4444';
            } else {
                e.target.style.borderColor = '';
            }
        }
        
        if (e.target.type === 'tel') {
            if (e.target.value && !validatePhone(e.target.value)) {
                e.target.style.borderColor = '#ef4444';
            } else {
                e.target.style.borderColor = '';
            }
        }
    });
});