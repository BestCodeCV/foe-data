document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
