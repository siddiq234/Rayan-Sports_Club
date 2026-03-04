document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    initActivityFilters();
    initActivityRegistration();

    function initActivityFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const activityCards = document.querySelectorAll('.activity-card[data-category]');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');

                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                filterActivities(filter, activityCards);
            });
        });
    }

    function filterActivities(filter, cards) {
        cards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'flex';
                void card.offsetWidth;
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    // Activity registration functionality
    function initActivityRegistration() {
    }

    window.registerForActivity = function (activityId) {
        const activityData = getActivityDetails(activityId);

        if (!activityData) {
            showNotification('Activity not found', 'error');
            return;
        }

        showRegistrationModal(activityData);
    };

    function getActivityDetails(activityId) {
        const activities = {
            'new-year-challenge': {
                id: 'new-year-challenge',
                name: 'New Year Fitness Challenge',
                type: 'Fitness Challenge',
                date: 'January 15, 2026',
                duration: 'All Month',
                description: '30-day fitness challenge to kickstart your year with healthy habits and achieve your fitness goals.',
                requirements: ['Active membership', 'Basic fitness level'],
                benefits: ['Personalized workout plan', 'Progress tracking', 'Weekly check-ins', 'Achievement certificate']
            },
            'nutrition-workshop': {
                id: 'nutrition-workshop',
                name: 'Nutrition Workshop',
                type: 'Workshop',
                date: 'January 28, 2026',
                duration: '2:00 PM - 4:00 PM',
                description: 'Learn about proper nutrition for athletes and fitness enthusiasts from certified nutritionists.',
                requirements: ['Active membership'],
                benefits: ['Nutrition guide', 'Meal planning templates', 'Q&A session', 'Recipe booklet']
            },
            'couples-workout': {
                id: 'couples-workout',
                name: "Valentine's Couples Workout",
                type: 'Social Event',
                date: 'February 14, 2026',
                duration: '6:00 PM - 8:00 PM',
                description: 'Special couples workout session followed by healthy refreshments and prizes for participating couples.',
                requirements: ['Couples registration', 'Active membership for both'],
                benefits: ['Partner workout routine', 'Healthy refreshments', 'Prizes and giveaways', 'Photo session']
            },
            'basketball-tournament': {
                id: 'basketball-tournament',
                name: 'Indoor Basketball Tournament',
                type: 'Tournament',
                date: 'February 25, 2026',
                duration: '9:00 AM - 6:00 PM',
                description: 'Annual indoor basketball tournament with prizes for winners and participation certificates for all.',
                requirements: ['Team registration (5 players)', 'Active membership'],
                benefits: ['$500 prize pool', 'Trophies for winners', 'Participation certificates', 'Tournament t-shirt']
            },
            'marathon-training': {
                id: 'marathon-training',
                name: 'Spring Marathon Training',
                type: 'Fitness Challenge',
                date: 'March 15, 2026',
                duration: '12 Weeks',
                description: '12-week marathon training program for beginners and experienced runners preparing for spring races.',
                requirements: ['Active membership', 'Medical clearance for long-distance running'],
                benefits: ['Professional coaching', 'Training schedule', 'Nutrition guidance', 'Race registration assistance']
            },
            'injury-prevention': {
                id: 'injury-prevention',
                name: 'Injury Prevention Workshop',
                type: 'Workshop',
                date: 'March 30, 2026',
                duration: '1:00 PM - 3:00 PM',
                description: 'Learn proper warm-up techniques, injury prevention strategies, and recovery methods from sports medicine experts.',
                requirements: ['Active membership'],
                benefits: ['Injury prevention guide', 'Exercise demonstrations', 'Recovery techniques', 'Q&A with experts']
            },
            'tennis-championship': {
                id: 'tennis-championship',
                name: 'Spring Tennis Championship',
                type: 'Tournament',
                date: 'April 20, 2026',
                duration: 'Weekend Event',
                description: 'Annual spring tennis championship with multiple categories for different skill levels and age groups.',
                requirements: ['Individual registration', 'Active membership', 'Skill level assessment'],
                benefits: ['Multiple categories', 'Professional umpires', 'Trophies and medals', 'Tournament gear']
            },
            'family-fun-day': {
                id: 'family-fun-day',
                name: 'Family Fun Day',
                type: 'Social Event',
                date: 'April 28, 2026',
                duration: '10:00 AM - 4:00 PM',
                description: 'Special family event with activities for all ages, games, competitions, and healthy food options.',
                requirements: ['Family registration', 'At least one active member'],
                benefits: ['Family activities', 'Kids games', 'Healthy food options', 'Family photos']
            },
            'swimming-championships': {
                id: 'swimming-championships',
                name: 'Swimming Championships',
                type: 'Tournament',
                date: 'May 15, 2026',
                duration: 'Full Weekend',
                description: 'Annual swimming championships featuring all strokes and distances for competitive swimmers.',
                requirements: ['Individual registration', 'Swimming proficiency test', 'Active membership'],
                benefits: ['All stroke categories', 'Age group divisions', 'Medals and trophies', 'Championship records']
            },
            'swimming-clinic': {
                id: 'swimming-clinic',
                name: 'Swimming Technique Clinic',
                type: 'Workshop',
                date: 'May 25, 2026',
                duration: '3:00 PM - 5:00 PM',
                description: 'Improve your swimming technique with professional coaches focusing on all four competitive strokes.',
                requirements: ['Basic swimming ability', 'Active membership'],
                benefits: ['Technique analysis', 'Personalized feedback', 'Stroke improvement tips', 'Video analysis']
            },
            'football-league': {
                id: 'football-league',
                name: 'Summer Football League',
                type: 'Tournament',
                date: 'June 10, 2026',
                duration: '8 Weeks',
                description: '8-week summer football league with teams competing for the championship trophy and prizes.',
                requirements: ['Team registration (11 players)', 'Active membership for all players'],
                benefits: ['8-week season', 'Professional referees', 'Championship trophy', 'League statistics']
            },
            'solstice-celebration': {
                id: 'solstice-celebration',
                name: 'Summer Solstice Celebration',
                type: 'Social Event',
                date: 'June 21, 2026',
                duration: '4:00 PM - 10:00 PM',
                description: 'Celebrate the longest day of the year with outdoor activities, BBQ, and evening entertainment.',
                requirements: ['Active membership', 'RSVP required'],
                benefits: ['Outdoor activities', 'BBQ dinner', 'Live entertainment', 'Sunset celebration']
            },
            'awards-ceremony': {
                id: 'awards-ceremony',
                name: 'Annual Sports Awards Ceremony',
                type: 'Social Event',
                date: 'March 15, 2026',
                duration: '7:00 PM - 10:00 PM',
                description: 'Celebrate our members\' achievements and recognize outstanding performances in various sports categories.',
                requirements: ['RSVP required', 'Formal attire'],
                benefits: ['Awards presentation', 'Dinner included', 'Entertainment', 'Networking opportunity']
            },
            'wellness-fair': {
                id: 'wellness-fair',
                name: 'Health & Wellness Fair',
                type: 'Workshop',
                date: 'March 22, 2026',
                duration: '9:00 AM - 3:00 PM',
                description: 'Free health screenings, wellness consultations, and fitness assessments for all members.',
                requirements: ['Active membership', 'Pre-registration recommended'],
                benefits: ['Free health screenings', 'Fitness assessments', 'Wellness consultations', 'Health resources']
            },
            'equipment-expo': {
                id: 'equipment-expo',
                name: 'Fitness Equipment Expo',
                type: 'Workshop',
                date: 'April 5, 2026',
                duration: '10:00 AM - 6:00 PM',
                description: 'Try the latest fitness equipment and technology from leading manufacturers and fitness brands.',
                requirements: ['Active membership'],
                benefits: ['Equipment trials', 'Expert demonstrations', 'Special discounts', 'Technology showcase']
            }
        };

        return activities[activityId] || null;
    }

    function showRegistrationModal(activity) {
        const modal = document.createElement('div');
        modal.className = 'registration-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Register for ${activity.name}</h2>
                    <button class="modal-close" onclick="closeRegistrationModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="activity-info">
                        <div class="info-item">
                            <strong>Type:</strong>
                            <span>${activity.type}</span>
                        </div>
                        <div class="info-item">
                            <strong>Date:</strong>
                            <span>${activity.date}</span>
                        </div>
                        <div class="info-item">
                            <strong>Duration:</strong>
                            <span>${activity.duration}</span>
                        </div>
                        <div class="info-item">
                            <strong>Description:</strong>
                            <span>${activity.description}</span>
                        </div>
                    </div>
                    
                    <div class="requirements-section">
                        <h3>Requirements</h3>
                        <ul>
                            ${activity.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="benefits-section">
                        <h3>What's Included</h3>
                        <ul>
                            ${activity.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <form class="registration-form" id="activityRegistrationForm">
                        <input type="hidden" name="activityId" value="${activity.id}">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="regFirstName">First Name *</label>
                                <input type="text" id="regFirstName" name="firstName" required>
                            </div>
                            <div class="form-group">
                                <label for="regLastName">Last Name *</label>
                                <input type="text" id="regLastName" name="lastName" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="regEmail">Email Address *</label>
                                <input type="email" id="regEmail" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="regPhone">Phone Number *</label>
                                <input type="tel" id="regPhone" name="phone" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="regMemberId">Membership ID</label>
                            <input type="text" id="regMemberId" name="memberId" placeholder="Enter your membership ID">
                        </div>
                        
                        <div class="form-group">
                            <label for="regComments">Additional Comments</label>
                            <textarea id="regComments" name="comments" rows="3" 
                                placeholder="Any special requirements or questions..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="agreement" required>
                                <span>I agree to the terms and conditions for this activity *</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-outline" onclick="closeRegistrationModal()">
                        <span>Cancel</span>
                    </button>
                    <button class="btn btn-primary" onclick="submitActivityRegistration()">
                        <span>Register Now</span>
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        document.body.style.overflow = 'hidden';
    }

    window.closeRegistrationModal = function () {
        const modal = document.querySelector('.registration-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    };

    window.submitActivityRegistration = function () {
        const form = document.getElementById('activityRegistrationForm');
        if (!form) return;

        // Validate form
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim() && field.type !== 'checkbox') {
                isValid = false;
                field.style.borderColor = '#ef4444';
            } else if (field.type === 'checkbox' && !field.checked) {
                isValid = false;
                field.closest('.checkbox-item').style.borderColor = '#ef4444';
            } else {
                field.style.borderColor = '';
                if (field.type === 'checkbox') {
                    field.closest('.checkbox-item').style.borderColor = '';
                }
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const registrationData = {};

        for (let [key, value] of formData.entries()) {
            registrationData[key] = value;
        }

        registrationData.registrationDate = new Date().toISOString();
        registrationData.registrationId = generateRegistrationId();

        saveActivityRegistration(registrationData);

        closeRegistrationModal();
        showSuccessNotification(registrationData);
    };

    function generateRegistrationId() {
        const prefix = 'ACT';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `${prefix}${timestamp}${random}`;
    }

    function saveActivityRegistration(data) {
        try {
            const existingRegistrations = JSON.parse(localStorage.getItem('ryanSportsClubActivityRegistrations') || '[]');

            existingRegistrations.push(data);

            localStorage.setItem('ryanSportsClubActivityRegistrations', JSON.stringify(existingRegistrations));

        } catch (error) {
            console.error('Error saving activity registration:', error);
        }
    }

    function showSuccessNotification(registrationData) {
        const activity = getActivityDetails(registrationData.activityId);

        showNotification(`Successfully registered for ${activity.name}! Registration ID: ${registrationData.registrationId}`, 'success');
    }

    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, type === 'success' ? 6000 : 4000);
    }

    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

});
