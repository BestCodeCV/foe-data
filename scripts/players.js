import { Guild, Member } from './models/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const guilds = [];
    const memberHistoric = []
        fetch('./scripts/data/tops.json')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const topKeys = Object.keys(data)
                console.log(topKeys)
                topKeys.forEach(element =>{
                    const { rankings } = data[element]
                    rankings.forEach(ranked =>{
                        const {battles, clan, player, points, rank} = ranked
                        const {id, name: nameClan} = clan
                        const {player_id, name: namePlayer, clan_id, era} = player
                        const memberObject = new Member(player_id, namePlayer, points, battles, era, null, clan_id, null, null, rank, null, null, nameClan)
                        console.log(memberObject)
                        memberHistoric.push(memberObject)
                    })
                    
                })
                renderMembersTable(memberHistoric);
            })
            .catch(error => console.error('Error loading JSON data:', error));
});

function renderMembersTable(memberHistoric) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    const size = memberHistoric.length
    memberHistoric.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="col-1">${member.rank}</td>
            <td class="col-4">${member.name}</td>
            <td >${member.points.toLocaleString()}</td>
            <td>${member.battles.toLocaleString()}</td>
            <td>${member.clan}</td>
        `;
        row.addEventListener('click', () => {
            window.location.href = `user-details.html?id=${member.id}&clan=${member.clan_id}`;
        });
        tableBody.appendChild(row);
    });
    /*if(size === 1){
        
    }else{
        memberHistoric[0].forEach(member => {
            const battlesToday = member.battles
            const memberInYesterday = memberHistoric[1].find(entry => entry.id === member.id)
            const row = document.createElement('tr');
            let datos = `
                <td class="col-1">${member.rank}</td>
                <td class="col-4">${member.name}</td>
                
            `;
            if(memberInYesterday){
                const differencePoints = member.points - memberInYesterday.points
                const differenceBattles = member.battles - memberInYesterday.battles
                if(differencePoints===0){
                    datos += `<td>${member.points.toLocaleString()} <span class="text-muted">(+${differencePoints.toLocaleString()})</span></td>`;
                }else if(differencePoints<0){
                    datos += `<td>${member.points.toLocaleString()} <span class="text-danger">(-${differencePoints.toLocaleString()})</span></td>`;
                }else if(differencePoints>0){
                    datos += `<td>${member.points.toLocaleString()} <span class="text-success">(+${differencePoints.toLocaleString()})</span></td>`;
                }
                if(differenceBattles===0){
                    datos += `<td>${member.battles.toLocaleString()} <span class="text-muted">(+${differenceBattles.toLocaleString()})</span></td>`;
                }else if(differenceBattles<0){
                    datos += `<td>${member.battles.toLocaleString()} <span class="text-danger">(-${differenceBattles.toLocaleString()})</span></td>`;
                }else if(differenceBattles>0){
                    datos += `<td>${member.battles.toLocaleString()} <span class="text-success">(+${differenceBattles.toLocaleString()})</span></td>`;
                }
            }else{
                datos += `
                <td >${member.points}</td>
                <td>${member.battles}</td>
                `;
            }
            row.innerHTML = datos
           
            row.addEventListener('click', () => {
                window.location.href = `user-details.html?id=${member.id}&clan=${member.clan_id}`;
            });
            tableBody.appendChild(row);
        });
    }*/
}