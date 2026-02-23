document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    initSportsFilters();
    initBookingSystem();

    function initSportsFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const sportCards = document.querySelectorAll('.sport-detail-card[data-category]');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');

                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                filterSports(filter, sportCards);
            });
        });
    }

    function filterSports(filter, cards) {
        cards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
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

    function initBookingSystem() {
    }

    window.bookSession = function (sportType) {
        const sportData = getSportDetails(sportType);

        if (!sportData) {
            showNotification('Sport not found', 'error');
            return;
        }

        showBookingModal(sportData);
    };

    function getSportDetails(sportType) {
        const sports = {
            'basketball': {
                id: 'basketball',
                name: 'Basketball',
                type: 'Indoor Sport',
                description: 'Professional basketball court with modern facilities and expert coaching.',
                hours: '6:00 AM - 10:00 PM',
                capacity: '10 players per court',
                duration: '1-2 hours',
                equipment: ['Basketball', 'Court shoes recommended', 'Water bottle'],
                rules: [
                    '5 players per team on court',
                    '4 quarters of 12 minutes each',
                    '24-second shot clock',
                    'Professional NBA rules apply'
                ],
                pricing: {
                    'member': { hourly: 15, daily: 50 },
                    'guest': { hourly: 25, daily: 80 }
                }
            },
            'tabletennis': {
                id: 'tabletennis',
                name: 'Table Tennis',
                type: 'Indoor Sport',
                description: 'Multiple professional table tennis tables with high-quality equipment.',
                hours: '7:00 AM - 9:00 PM',
                capacity: '2-4 players per table',
                duration: '30 minutes - 2 hours',
                equipment: ['Paddles available', 'Professional tables', 'Tournament balls'],
                rules: [
                    'Best of 5 or 7 sets',
                    '11 points per set',
                    'Must win by 2 points',
                    'Service alternates every 2 points'
                ],
                pricing: {
                    'member': { hourly: 10, daily: 30 },
                    'guest': { hourly: 15, daily: 45 }
                }
            },
            'swimming': {
                id: 'swimming',
                name: 'Swimming',
                type: 'Water Sport',
                description: 'Olympic-size swimming pool with professional coaching and training programs.',
                hours: '5:00 AM - 11:00 PM',
                capacity: 'Multiple lanes available',
                duration: '30 minutes - 2 hours',
                equipment: ['Lane ropes', 'Kickboards', 'Pull buoys', 'Swim caps required'],
                rules: [
                    'Swim caps required',
                    'No diving in shallow end',
                    'Follow lane etiquette',
                    'Shower before entering pool'
                ],
                pricing: {
                    'member': { hourly: 12, daily: 40 },
                    'guest': { hourly: 20, daily: 60 }
                }
            },
            'football': {
                id: 'football',
                name: 'Football',
                type: 'Outdoor Sport',
                description: 'Full-size football field with natural grass and professional standards.',
                hours: '6:00 AM - 8:00 PM',
                capacity: '22 players (11 vs 11)',
                duration: '1.5-2 hours',
                equipment: ['Football provided', 'Cleats recommended', 'Shin guards required'],
                rules: [
                    '90 minutes match duration',
                    '11 players per team',
                    'Offside rule applies',
                    'FIFA standard rules'
                ],
                pricing: {
                    'member': { hourly: 30, daily: 100 },
                    'guest': { hourly: 50, daily: 150 }
                }
            },
            'tennis': {
                id: 'tennis',
                name: 'Tennis',
                type: 'Outdoor Sport',
                description: 'Professional tennis courts with both clay and hard surfaces.',
                hours: '6:00 AM - 9:00 PM',
                capacity: '2-4 players per court',
                duration: '1-2 hours',
                equipment: ['Rackets available for rent', 'Tennis balls provided', 'Court shoes recommended'],
                rules: [
                    'Best of 3 or 5 sets',
                    'Deuce scoring system',
                    'Service alternates each game',
                    'ITF standard rules'
                ],
                pricing: {
                    'member': { hourly: 20, daily: 70 },
                    'guest': { hourly: 35, daily: 120 }
                }
            }
        };

        return sports[sportType] || null;
    }

    function showBookingModal(sport) {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Book ${sport.name} Session</h2>
                    <button class="modal-close" onclick="closeBookingModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="sport-info">
                        <div class="info-grid">
                            <div class="info-item">
                                <strong>Sport:</strong>
                                <span>${sport.name}</span>
                            </div>
                            <div class="info-item">
                                <strong>Type:</strong>
                                <span>${sport.type}</span>
                            </div>
                            <div class="info-item">
                                <strong>Hours:</strong>
                                <span>${sport.hours}</span>
                            </div>
                            <div class="info-item">
                                <strong>Capacity:</strong>
                                <span>${sport.capacity}</span>
                            </div>
                            <div class="info-item">
                                <strong>Duration:</strong>
                                <span>${sport.duration}</span>
                            </div>
                        </div>
                        
                        <div class="pricing-info">
                            <h3>Pricing</h3>
                            <div class="pricing-grid">
                                <div class="price-card">
                                    <h4>Members</h4>
                                    <div class="price">$${sport.pricing.member.hourly}/hour</div>
                                    <div class="price-daily">$${sport.pricing.member.daily}/day</div>
                                </div>
                                <div class="price-card">
                                    <h4>Guests</h4>
                                    <div class="price">$${sport.pricing.guest.hourly}/hour</div>
                                    <div class="price-daily">$${sport.pricing.guest.daily}/day</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <form class="booking-form" id="sportBookingForm">
                        <input type="hidden" name="sportId" value="${sport.id}">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bookingDate">Preferred Date *</label>
                                <input type="date" id="bookingDate" name="date" required>
                            </div>
                            <div class="form-group">
                                <label for="bookingTime">Preferred Time *</label>
                                <select id="bookingTime" name="time" required>
                                    <option value="">Select time</option>
                                    <option value="06:00">6:00 AM</option>
                                    <option value="07:00">7:00 AM</option>
                                    <option value="08:00">8:00 AM</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                    <option value="17:00">5:00 PM</option>
                                    <option value="18:00">6:00 PM</option>
                                    <option value="19:00">7:00 PM</option>
                                    <option value="20:00">8:00 PM</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bookingDuration">Duration *</label>
                                <select id="bookingDuration" name="duration" required>
                                    <option value="">Select duration</option>
                                    <option value="1">1 hour</option>
                                    <option value="1.5">1.5 hours</option>
                                    <option value="2">2 hours</option>
                                    <option value="3">3 hours</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="bookingType">Booking Type *</label>
                                <select id="bookingType" name="type" required>
                                    <option value="">Select type</option>
                                    <option value="member">Member</option>
                                    <option value="guest">Guest</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bookingName">Full Name *</label>
                                <input type="text" id="bookingName" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="bookingEmail">Email Address *</label>
                                <input type="email" id="bookingEmail" name="email" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bookingPhone">Phone Number *</label>
                                <input type="tel" id="bookingPhone" name="phone" required>
                            </div>
                            <div class="form-group">
                                <label for="bookingPlayers">Number of Players</label>
                                <input type="number" id="bookingPlayers" name="players" min="1" max="22" value="1">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="bookingNotes">Special Requirements</label>
                            <textarea id="bookingNotes" name="notes" rows="3" 
                                placeholder="Equipment needs, coaching requests, etc..."></textarea>
                        </div>
                        
                        <div class="booking-summary" id="bookingSummary" style="display: none;">
                            <h3>Booking Summary</h3>
                            <div class="summary-content">
                                <div class="summary-item">
                                    <span>Sport:</span>
                                    <span id="summarySport">${sport.name}</span>
                                </div>
                                <div class="summary-item">
                                    <span>Date & Time:</span>
                                    <span id="summaryDateTime">-</span>
                                </div>
                                <div class="summary-item">
                                    <span>Duration:</span>
                                    <span id="summaryDuration">-</span>
                                </div>
                                <div class="summary-item">
                                    <span>Type:</span>
                                    <span id="summaryType">-</span>
                                </div>
                                <div class="summary-item total">
                                    <span>Total Cost:</span>
                                    <span id="summaryTotal">$0</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-outline" onclick="closeBookingModal()">
                        <span>Cancel</span>
                    </button>
                    <button class="btn btn-primary" onclick="submitBooking()">
                        <span>Book Session</span>
                        <i class="fas fa-calendar-check"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const dateInput = document.getElementById('bookingDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }

        const form = document.getElementById('sportBookingForm');
        if (form) {
            form.addEventListener('change', updateBookingSummary);
            form.addEventListener('input', updateBookingSummary);
        }

        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        document.body.style.overflow = 'hidden';
    }

    function updateBookingSummary() {
        const form = document.getElementById('sportBookingForm');
        const summary = document.getElementById('bookingSummary');

        if (!form || !summary) return;

        const formData = new FormData(form);
        const date = formData.get('date');
        const time = formData.get('time');
        const duration = formData.get('duration');
        const type = formData.get('type');
        const sportId = formData.get('sportId');

        if (date && time && duration && type) {
            const sport = getSportDetails(sportId);
            const cost = calculateCost(sport, duration, type);

            document.getElementById('summaryDateTime').textContent = `${formatDate(date)} at ${formatTime(time)}`;
            document.getElementById('summaryDuration').textContent = `${duration} hour${duration > 1 ? 's' : ''}`;
            document.getElementById('summaryType').textContent = type.charAt(0).toUpperCase() + type.slice(1);
            document.getElementById('summaryTotal').textContent = `$${cost}`;

            summary.style.display = 'block';
        } else {
            summary.style.display = 'none';
        }
    }

    function calculateCost(sport, duration, type) {
        if (!sport || !sport.pricing[type]) return 0;
        return Math.round(sport.pricing[type].hourly * parseFloat(duration));
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    window.closeBookingModal = function () {
        const modal = document.querySelector('.booking-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    };

    window.submitBooking = function () {
        const form = document.getElementById('sportBookingForm');
        if (!form) return;

        // Validate form
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';

                // Remove error styling after user starts typing
                field.addEventListener('input', function () {
                    this.style.borderColor = '';
                }, { once: true });
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const bookingData = {};

        for (let [key, value] of formData.entries()) {
            bookingData[key] = value;
        }

        bookingData.bookingDate = new Date().toISOString();
        bookingData.bookingId = generateBookingId();
        bookingData.status = 'pending';

        const sport = getSportDetails(bookingData.sportId);
        bookingData.cost = calculateCost(sport, bookingData.duration, bookingData.type);

        saveBooking(bookingData);

        closeBookingModal();
        showBookingConfirmation(bookingData);
    };

    function generateBookingId() {
        const prefix = 'BK';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `${prefix}${timestamp}${random}`;
    }

    function saveBooking(data) {
        try {
            const existingBookings = JSON.parse(localStorage.getItem('ryanSportsClubBookings') || '[]');

            existingBookings.push(data);

            localStorage.setItem('ryanSportsClubBookings', JSON.stringify(existingBookings));

        } catch (error) {
            console.error('Error saving booking:', error);
        }
    }

    function showBookingConfirmation(bookingData) {
        const sport = getSportDetails(bookingData.sportId);

        const message = `
            Booking confirmed! 
            ${sport.name} session on ${formatDate(bookingData.date)} at ${formatTime(bookingData.time)}
            Booking ID: ${bookingData.bookingId}
            Total: $${bookingData.cost}
        `;

        showNotification(message, 'success');
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
