const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('showtime');

populateUI();

let ticketPrice = +movieSelect.value;

// Generate seating layout
function generateSeats() {
    for (let i = 0; i < 13; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        
        // First group of 3 seats
        for (let j = 0; j < 3; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            row.appendChild(seat);
        }
        
        // Space between groups
        row.appendChild(createSpace());
        
        // Second group of 3 seats
        for (let j = 0; j < 3; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            row.appendChild(seat);
        }
        
        // Space between groups
        row.appendChild(createSpace());

        // Third group of 3 seats
        for (let j = 0; j < 3; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            row.appendChild(seat);
        }

        // Space between groups
        row.appendChild(createSpace());

        // Fourth group of 3 seats
        for (let j = 0; j < 3; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            row.appendChild(seat);
        }

        // Space between groups
        row.appendChild(createSpace());

        // Fifth group of 3 seats
        for (let j = 0; j < 3; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            row.appendChild(seat);
        }

        container.appendChild(row);
    }
}

// Create space element
function createSpace() {
    const space = document.createElement('div');
    space.classList.add('space');
    return space;
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seats = document.querySelectorAll('.row .seat');
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        const seats = document.querySelectorAll('.row .seat');
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Confirm booking button click event
confirmBookingBtn.addEventListener('click', () => {
    // Redirect to a new page (replace 'new-page.html' with your actual page)
    window.location.href = 'new-page.html';
});


// Initial count and total set
updateSelectedCount();

// Generate seats dynamically
generateSeats();
