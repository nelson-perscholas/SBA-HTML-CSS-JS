document.addEventListener('DOMContentLoaded', function() {
    // Populate event dropdown with event names from table
    const eventDropdown = document.getElementById('event-dropdown');
    const eventListTable = document.getElementById('event-list');

    if (eventDropdown && eventListTable) {
        // Clear any existing options
        eventDropdown.innerHTML = '';

        // Populate dropdown with event names from table rows
        const eventRows = eventListTable.querySelectorAll('tbody tr');
        for (const row of eventRows) {
            const eventName = row.cells[0].textContent.trim();
            const option = document.createElement('option');
            option.textContent = eventName;
            eventDropdown.appendChild(option);
        }
    }

    // Email validation regex pattern
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Event registration form submission
    const eventRegistrationForm = document.getElementById('event-registration');
    if (eventRegistrationForm) {
        eventRegistrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission

            // Form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const selectedEvent = eventDropdown.value;

            // Basic validation
            if (name === '' || email === '' || selectedEvent === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Email validation
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Replace with backend URL or function for event registration
            const registrationUrl = 'https://example.com/api/register';

            fetch(registrationUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, event: selectedEvent }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    alert('Registration successful!');
                    eventRegistrationForm.reset(); // Reset form after submission
                })
                .catch(error => {
                    console.error('Error submitting registration:', error);
                    alert('Error occurred while registering for the event. Please try again later.');
                });
        });
    }
});
