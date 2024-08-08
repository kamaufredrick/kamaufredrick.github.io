document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        let valid = true;
        clearErrorMessages();
        formSuccess.textContent = '';
        formError.textContent = '';

        // Name validation
        if (!validateName(nameInput.value.trim())) {
            showError(nameInput, 'Name must contain only letters.');
            valid = false;
        } else if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            valid = false;
        } else {
            removeError(nameInput); // Remove error class if valid
        }

        // Email validation
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Invalid email address.');
            valid = false;
        } else {
            removeError(emailInput); // Remove error class if valid
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message cannot be empty.');
            valid = false;
        } else {
            removeError(messageInput); // Remove error class if valid
        }

        if (valid) {
            // Send form data via AJAX
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    formSuccess.textContent = result.success;
                    form.reset(); // Reset form fields
                } else {
                    result.errors.forEach(error => {
                        formError.textContent += `${error} `;
                    });
                }
            } catch (error) {
                formError.textContent = 'An error occurred. Please try again.';
            }
        } else {
            formError.textContent = 'Please fix the errors above.';
        }
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    function validateName(name) {
        const re = /^[A-Za-z\s]+$/; // Regex to allow only letters and spaces
        return re.test(name);
    }

    function showError(input, message) {
        // Add error class to input or textarea
        input.classList.add('error');
        
        // Create error message element
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function removeError(input) {
        // Remove error class from input or textarea
        input.classList.remove('error');
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(elem => elem.remove());
        document.querySelectorAll('input.error, textarea.error').forEach(input => input.classList.remove('error'));
    }
});
