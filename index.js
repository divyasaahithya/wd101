const form = document.getElementById('registrationForm');
const tableBody = document.getElementById('tableBody');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Correct IDs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('termsCheckbox').checked;

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const ageMonthDifference = today.getMonth() - birthDate.getMonth();
    if (ageMonthDifference < 0 || (ageMonthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55 years.');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        termsAccepted: termsAccepted ? 'Yes' : 'No'
    };

    const existingEntries = JSON.parse(localStorage.getItem('userRecords')) || [];
    existingEntries.push(userData);
    localStorage.setItem('userRecords', JSON.stringify(existingEntries));

    renderTable();
    form.reset();
});

function renderTable() {
    const savedEntries = JSON.parse(localStorage.getItem('userRecords')) || [];
    tableBody.innerHTML = ''; 

    savedEntries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.termsAccepted}</td>
        `;
        tableBody.appendChild(row);
    });
}

window.onload = renderTable;
