document.addEventListener('DOMContentLoaded', (event) => {
    const bookingForm = document.getElementById('bookingForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const bookingsList = document.getElementById('bookingsList');
    const searchInput = document.getElementById('searchInput');

    // Load bookings from local storage
    const loadBookings = () => {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookingsList.innerHTML = '';
        bookings.forEach(booking => {
            const listItem = document.createElement('li');
            listItem.textContent = `${booking.studentName} booked ${booking.lecture}`;
            bookingsList.appendChild(listItem);
        });
    };

    // Save bookings to local storage
    const saveBookings = (bookings) => {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    };

    // Add new booking
    const addBooking = (studentName, lecture) => {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        // Check for duplicate bookings
        const duplicateBooking = bookings.find(booking => booking.studentName === studentName && booking.lecture === lecture);
        if (duplicateBooking) {
            confirmationMessage.style.display = 'block';
            confirmationMessage.innerHTML = `Error: ${studentName} has already booked ${lecture}.`;
            confirmationMessage.style.backgroundColor = '#f8d7da';
            confirmationMessage.style.color = '#721c24';
            confirmationMessage.style.borderColor = '#f5c6cb';
            return false;
        }
        bookings.push({ studentName, lecture });
        saveBookings(bookings);
        return true;
    };

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const lecture = document.getElementById('lecture').value;

        if (addBooking(studentName, lecture)) {
            confirmationMessage.style.display = 'block';
            confirmationMessage.innerHTML = `Thank you, ${studentName}! You have successfully booked ${lecture}.`;
            confirmationMessage.style.backgroundColor = '#d4edda';
            confirmationMessage.style.color = '#155724';
            confirmationMessage.style.borderColor = '#c3e6cb';

            loadBookings();
            bookingForm.reset();
        }
    });

    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        const bookings = document.querySelectorAll('#bookingsList li');
        bookings.forEach(booking => {
            const text = booking.textContent.toLowerCase();
            booking.style.display = text.includes(filter) ? '' : 'none';
        });
    });

    loadBookings();
});
// Assume a function to check if user is signed in
function checkSignInStatus() {
    // Example condition for checking if user is signed in
    // Replace with your actual condition to check if user is signed in
    let userSignedIn = true; // Change this based on your actual logic

    return userSignedIn;
}

// Function to update the Join Now button text
function updateJoinNowButton() {
    let joinNowButton = document.getElementById('joinNowButton');

    if (checkSignInStatus()) {
        joinNowButton.textContent = 'Account';
        joinNowButton.href = 'account.html'; // Change the href if needed
    } else {
        joinNowButton.textContent = 'Join Now';
        joinNowButton.href = 'acc.html'; // Original href when not signed in
    }
}

// Call the function to update the button text on page load
updateJoinNowButton();
