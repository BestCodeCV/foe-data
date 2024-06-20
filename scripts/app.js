// Importar el modelo User
import { User } from './models/user.js';

// Función para cargar y mostrar los datos
document.addEventListener('DOMContentLoaded', () => {
    fetch('./scripts/data/users.json')
        .then(response => response.json())
        .then(data => {
            const users = data.map(user => new User(user.id, user.name, user.age));
            renderUsersTable(users);
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

// Función para renderizar la tabla con los usuarios
function renderUsersTable(users) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = ''; // Limpiar cualquier contenido previo
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
        `;
        tableBody.appendChild(row);
    });
}