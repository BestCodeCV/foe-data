import { User } from './models/user.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    if (userId) {
        fetch('./scripts/data/users.json')
            .then(response => response.json())
            .then(data => {
                const user = data.find(user => user.id == userId);
                if (user) {
                    const userDetails = new User(user.id, user.name, user.age);
                    displayUserDetails(userDetails);
                } else {
                    console.error('User not found');
                }
            })
            .catch(error => console.error('Error loading JSON data:', error));
    }
});

function displayUserDetails(user) {
    document.getElementById('user-id').textContent = user.id;
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-age').textContent = user.age;
}