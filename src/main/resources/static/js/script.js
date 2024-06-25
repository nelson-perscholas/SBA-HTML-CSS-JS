document.addEventListener('DOMContentLoaded', function() {
    // Populate event dropdown with event names from table
    const eventDropdown = document.getElementById('event-dropdown');
    const eventListTable = document.getElementById('event-list');

    if (eventDropdown && eventListTable) {
        // Populate dropdown with event names from table rows
        const eventRows = eventListTable.querySelectorAll('tbody tr');
        eventRows.forEach(row => {
            const eventName = row.cells[0].textContent.trim(); // Assuming event name is in first cell
            const option = document.createElement('option');
            option.textContent = eventName;
            eventDropdown.appendChild(option);
        });
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
