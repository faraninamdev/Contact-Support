// Staggered animation for form elements
document.addEventListener('DOMContentLoaded', function() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.classList.add('visible');
        }, 150 + (index * 120));
    });
});

document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const issueType = document.getElementById('issueType').value;
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    let isValid = true;
    
    if (!name) {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    }
    
    if (!email) {
        showError('emailError', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!issueType) {
        showError('issueTypeError', 'Please select an issue type');
        isValid = false;
    }
    
    if (!message) {
        showError('messageError', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('supportForm').reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        }, 1800);
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add real-time validation for email field
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
});

// Enhanced focus states
const formControls = document.querySelectorAll('.form-control');
formControls.forEach(control => {
    control.addEventListener('focus', () => {
        control.parentElement.style.transform = 'translateY(-1px)';
        // Handle custom select focus
        if (control.tagName === 'SELECT') {
            const customSelect = control.closest('.custom-select');
            if (customSelect) {
                customSelect.style.transform = 'translateY(-1px)';
            }
        }
    });
    
    control.addEventListener('blur', () => {
        control.parentElement.style.transform = 'translateY(0)';
        // Handle custom select blur
        if (control.tagName === 'SELECT') {
            const customSelect = control.closest('.custom-select');
            if (customSelect) {
                customSelect.style.transform = 'translateY(0)';
            }
        }
    });
});