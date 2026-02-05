/**
 * Task Model for Ryan Sports Club
 * Represents sports activities and events within the club
 * 
 * This class models sports club activities like "Football Practice", "Basketball Tournament", etc.
 * with sports-specific terminology and validation rules.
 */
class Task {
    /**
     * Creates a new Task instance representing a sports activity
     * @param {string} id - Unique identifier for the activity
     * @param {string} description - Activity name (e.g., "Football Practice", "Basketball Tournament")
     * @param {string} priority - Activity priority: 'low', 'medium', 'high'
     * @param {Date|string|null} dueDate - Event date when the activity is scheduled
     * @param {string} category - Sport type (e.g., 'football', 'basketball', 'tennis', 'swimming', 'fitness')
     * @param {boolean} completed - Event status (true if event completed, false if upcoming/cancelled)
     */
    constructor(id, description, priority = 'medium', dueDate = null, category = '', completed = false) {
        this.id = id || this.generateId();
        this.description = description || '';
        this.priority = priority;
        this.dueDate = dueDate;
        this.category = category;
        this.completed = completed;
        this.createdAt = new Date().toISOString();
        this.completedAt = completed ? new Date().toISOString() : null;
    }

    /**
     * Generates a unique identifier for the activity
     * @returns {string} UUID-like identifier
     */
    generateId() {
        return 'activity_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Validates the sports activity data according to club requirements
     * @returns {Object} Validation result with isValid boolean and errors array
     */
    validate() {
        const errors = [];
        const result = {
            isValid: true,
            errors: []
        };

        // Activity name validation - must be descriptive for sports events
        if (!this.description || typeof this.description !== 'string') {
            errors.push('Activity name is required');
        } else if (this.description.trim().length === 0) {
            errors.push('Activity name cannot be empty');
        } else if (this.description.trim().length < 3) {
            errors.push('Activity name must be at least 3 characters long');
        } else if (this.description.trim().length > 100) {
            errors.push('Activity name must not exceed 100 characters');
        }

        // Priority validation - important for scheduling sports events
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(this.priority)) {
            errors.push('Priority must be one of: low, medium, high');
        }

        // Sport category validation - must be a recognized sport
        if (this.category && typeof this.category !== 'string') {
            errors.push('Sport category must be a string');
        } else if (this.category && this.category.trim().length > 50) {
            errors.push('Sport category must not exceed 50 characters');
        }

        // Event date validation - sports events need proper scheduling
        if (this.dueDate !== null) {
            let dateObj;
            if (typeof this.dueDate === 'string') {
                dateObj = new Date(this.dueDate);
            } else if (this.dueDate instanceof Date) {
                dateObj = this.dueDate;
            } else {
                errors.push('Event date must be a valid date or null');
            }

            if (dateObj && isNaN(dateObj.getTime())) {
                errors.push('Event date must be a valid date');
            }
        }

        // Event status validation
        if (typeof this.completed !== 'boolean') {
            errors.push('Event status must be a boolean value');
        }

        // ID validation
        if (!this.id || typeof this.id !== 'string') {
            errors.push('Activity ID is required and must be a string');
        }

        result.isValid = errors.length === 0;
        result.errors = errors;
        return result;
    }

    /**
     * Converts the sports activity to JSON format for storage
     * @returns {Object} JSON representation of the activity
     */
    toJSON() {
        return {
            id: this.id,
            description: this.description,
            priority: this.priority,
            dueDate: this.dueDate ? (this.dueDate instanceof Date ? this.dueDate.toISOString() : this.dueDate) : null,
            category: this.category,
            completed: this.completed,
            createdAt: this.createdAt,
            completedAt: this.completedAt
        };
    }

    /**
     * Creates a Task instance from JSON data (for loading from storage)
     * @param {Object} data - JSON data representing a sports activity
     * @returns {Task} New Task instance
     * @throws {Error} If data is invalid or missing required fields
     */
    static fromJSON(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data: must be an object');
        }

        if (!data.id) {
            throw new Error('Invalid data: missing required field "id"');
        }

        if (!data.description) {
            throw new Error('Invalid data: missing required field "description"');
        }

        // Create new task instance
        const task = new Task(
            data.id,
            data.description,
            data.priority || 'medium',
            data.dueDate,
            data.category || '',
            data.completed || false
        );

        // Preserve timestamps if they exist
        if (data.createdAt) {
            task.createdAt = data.createdAt;
        }
        if (data.completedAt) {
            task.completedAt = data.completedAt;
        }

        // Validate the created task
        const validation = task.validate();
        if (!validation.isValid) {
            throw new Error('Invalid task data: ' + validation.errors.join(', '));
        }

        return task;
    }

    /**
     * Marks the sports activity as completed
     * Updates the completion status and timestamp
     */
    markCompleted() {
        this.completed = true;
        this.completedAt = new Date().toISOString();
    }

    /**
     * Marks the sports activity as not completed (upcoming/cancelled)
     * Resets the completion status and timestamp
     */
    markIncomplete() {
        this.completed = false;
        this.completedAt = null;
    }

    /**
     * Checks if the sports event is overdue
     * @returns {boolean} True if the event date has passed and event is not completed
     */
    isOverdue() {
        if (!this.dueDate || this.completed) {
            return false;
        }

        const eventDate = new Date(this.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
        
        return eventDate < today;
    }

    /**
     * Gets a human-readable status for the sports activity
     * @returns {string} Status description
     */
    getStatus() {
        if (this.completed) {
            return 'completed';
        }
        
        if (this.isOverdue()) {
            return 'overdue';
        }
        
        if (this.dueDate) {
            const eventDate = new Date(this.dueDate);
            const today = new Date();
            const diffTime = eventDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) {
                return 'today';
            } else if (diffDays === 1) {
                return 'tomorrow';
            } else if (diffDays > 1) {
                return 'upcoming';
            }
        }
        
        return 'scheduled';
    }

    /**
     * Gets the priority level as a number for sorting
     * @returns {number} Priority value (3=high, 2=medium, 1=low)
     */
    getPriorityValue() {
        switch (this.priority) {
            case 'high': return 3;
            case 'medium': return 2;
            case 'low': return 1;
            default: return 2;
        }
    }

    /**
     * Creates a copy of the task with updated properties
     * @param {Object} updates - Properties to update
     * @returns {Task} New Task instance with updates applied
     */
    update(updates) {
        const updatedData = {
            ...this.toJSON(),
            ...updates
        };
        
        return Task.fromJSON(updatedData);
    }
}

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Task;
}