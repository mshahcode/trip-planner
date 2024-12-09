document.addEventListener("DOMContentLoaded", () => {
    const tripForm = document.getElementById('planTripForm');
    const tableBody = document.querySelector('#planTripTable tbody');

    tripForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get input elements
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const destinationInput = document.getElementById('destinationCity');
        const invalidCityFeedback = document.getElementById('invalid-city-name');
        invalidCityFeedback.innerHTML = '';

        // Get input values
        const destination = document.getElementById('destinationCity').value;
        const startDateValue = startDateInput.value;
        const endDateValue = endDateInput.value;
        const travelers = document.getElementById('numberOfPeople').value;
        const travelType = document.getElementById('travelType').value;

        const cityRegex = /^[a-zA-Z\s]+$/;
        if (!destination) {
            destinationInput.setCustomValidity('City name cannot be empty.');
        } else if (!cityRegex.test(destination)) {
            invalidCityFeedback.innerHTML = "City name cannot contain numbers or special characters.";
            destinationInput.setCustomValidity('City name cannot contain numbers or special characters.');
        } else {
            destinationInput.setCustomValidity('');
        }

        // Parse dates
        const startDate = new Date(startDateValue);
        const endDate = new Date(endDateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Custom date validation
        let isValid = true;

        if (startDate < today) {
            startDateInput.setCustomValidity('Start date cannot be in the past.');
            isValid = false;
        } else {
            startDateInput.setCustomValidity('');
        }

        if (endDate < startDate) {
            endDateInput.setCustomValidity('End date cannot be earlier than start date.');
            isValid = false;
        } else {
            endDateInput.setCustomValidity('');
        }

        // Check overall form validity
        if (!isValid || !tripForm.checkValidity()) {
            tripForm.classList.add('was-validated');
            return;
        }

        // Add new row to table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${destination}</td>
            <td>${travelers}</td>
            <td>${startDateValue}</td>
            <td>${endDateValue}</td>
            <td>${travelType}</td>
            <td><button type="button" class="delete-btn btn btn-danger px-3">Delete</button></td>
        `;

        tableBody.appendChild(newRow);

        // Reset form and validation styles
        tripForm.reset();
        tripForm.classList.remove('was-validated');
    });

    // Delete Plan
    tableBody.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('delete-btn')) {
            e.target.closest('tr').remove();
        }
    });
});
