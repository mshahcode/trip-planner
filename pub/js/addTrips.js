document.addEventListener("DOMContentLoaded", () => {
    const tripForm = document.getElementById('planTripForm');
    const tableBody = document.querySelector('#planTripTable tbody');

    tripForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm(tripForm)) {
            tripForm.classList.add('was-validated');
            return;
        }

        const formData = getFormData();
        addTableRow(formData);
        resetForm(tripForm);
    });

    tableBody.addEventListener('click', handleRowDelete);
});


function validateForm(form) {
    const destinationInput = document.getElementById('destinationCity');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    const destination = destinationInput.value.trim();
    const startDateValue = startDateInput.value;
    const endDateValue = endDateInput.value;

    const cityRegex = /^[a-zA-Z\s]+$/;

    let isValid = true;

    if (!destination) {
        destinationInput.setCustomValidity('City name cannot be empty.');
        destinationInput.nextElementSibling.innerHTML = "City name cannot be empty.";
        isValid = false;
    } else if (!cityRegex.test(destination)) {
        destinationInput.setCustomValidity('City name cannot contain numbers or special characters.');
        destinationInput.nextElementSibling.innerHTML = "City name cannot contain numbers or special characters.";
        isValid = false;
    } else {
        destinationInput.setCustomValidity('');
    }

    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

    return isValid && form.checkValidity();
}

function getFormData() {
    const destination = document.getElementById('destinationCity').value.trim();
    const startDateValue = document.getElementById('startDate').value;
    const endDateValue = document.getElementById('endDate').value;
    const travelers = document.getElementById('numberOfPeople').value;
    const travelType = document.getElementById('travelType').value;

    const preferences = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    const accommodation = document.querySelector('input[name="accommodation"]:checked')?.value;

    return {
        destination,
        startDateValue,
        endDateValue,
        travelers,
        travelType,
        preferences,
        accommodation
    };
}

function addTableRow(formData) {
    const tableBody = document.querySelector('#planTripTable tbody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${formData.destination}</td>
        <td>${formData.travelers}</td>
        <td>${formData.startDateValue}</td>
        <td>${formData.endDateValue}</td>
        <td>${formData.travelType}</td>
        <td>${formData.preferences.join(', ') || 'None'}</td>
        <td>${formData.accommodation || 'None'}</td>
        <td><button type="button" class="delete-btn btn btn-danger px-3">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
}

function resetForm(form) {
    form.reset();
    form.classList.remove('was-validated');
}

function handleRowDelete(e) {
    if (e.target && e.target.classList.contains('delete-btn')) {
        e.target.closest('tr').remove();
    }
}
