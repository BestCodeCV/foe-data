import { Guild } from './models/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const guilds = [];
    fetch('./scripts/data/guilds.json')
        .then(response => response.json())
        .then(data => {
            const guildKeys = Object.keys(data);
            if (guildKeys.length === 0) {
                throw new TypeError('No guilds found in data');
            }
            guildKeys.forEach(key => {
                const guild = data[key];
                const { historial } = guild;
                const firstHistorialKey = Object.keys(historial)[0];// obtiene el key del primero
                const firstEntry = historial[firstHistorialKey]; // con el key obtiene de historial un objeto
                
                const { description, name, rank, level, membersNum, date, prestige } = firstEntry;
                const guildObject = new Guild(key, name, rank, level, membersNum, description, "", date, prestige);
                guilds.push(guildObject);
            });
            renderGuildsTable(guilds);
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
function renderGuildsTable(guilds) {
    guilds.sort((guildA, guildB) => guildB.prestige - guildA.prestige);
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    guilds.forEach(guild => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${guild.rank}</td>
            <td>${guild.name}</td>
            <td class="col-4">${guild.name}</td>
            <td>${guild.prestige}</td>
            <td>${guild.level}</td>
            <td>${guild.membersNum}</td>
        `;
        row.addEventListener('click', () => {
            window.location.href = `guild-details.html?id=${guild.id}`;
            console.log("clikado")
        });
        tableBody.appendChild(row);
    });
}