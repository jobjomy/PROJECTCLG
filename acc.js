function submitForm() {
    var name = document.getElementById('name').value;
    var branch = document.getElementById('branch').value;
    var section = document.getElementById('section').value;
    var year = document.getElementById('year').value;
    var usn = document.getElementById('usn').value;

    console.log('Name:', name);
    console.log('Branch:', branch);
    console.log('Section:', section);
    console.log('Year:', year);
    console.log('USN:', usn);

    // Validate if the required fields are filled
    if (name && usn) {
        // Simulate a successful login and redirect
        alert('Login successful!');
        window.location.href = 'index1.html'; // Redirect back to the main page
    } else {
        alert('Please fill in the required fields: Name and USN.');
    }
}
