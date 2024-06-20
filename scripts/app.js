import { User } from './models/user.js';

document.addEventListener('DOMContentLoaded', () => {
    fetch('./scripts/data/users.json')
        .then(response => response.json())
        .then(data => {
            const users = data.map(user => new User(user.id, user.name, user.age));
            renderUsersTable(users);
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

function renderUsersTable(users) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
        `;
        row.addEventListener('click', () => {
            window.location.href = `user-details.html?id=${user.id}`;
        });
        tableBody.appendChild(row);
    });
}