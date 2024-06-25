import { Guild, Member } from './models/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const guilds = [];
    const memberHistoric = []
    const flags = {
        "flag_3": 'https://cdn.forge-db.com/images/guild_flags/flag_3.jpg',
        "flag_31": 'https://cdn.forge-db.com/images/guild_flags/flag_31.jpg',
        "flag_9": 'https://cdn.forge-db.com/images/guild_flags/flag_9.jpg',
        "premium_flag_5": 'https://cdn.forge-db.com/images/guild_flags/premium_flag_5.jpg',
        "flag_30": 'https://cdn.forge-db.com/images/guild_flags/flag_30.jpg',
    };
    //31 kraken, 9 leones, 3 pretos, 
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    if (userId) {
        fetch('./scripts/data/guilds.json')
            .then(response => response.json())
            .then(data => {
                const guild = data[userId]
                const { historial } = guild;
                const historialKeys = Object.keys(historial)
                
                historialKeys.forEach(key =>{
                    const entry = historial[key];
                    const { description, name, rank, level, membersNum, flag, members, prestige } = entry;
                    const guildObject = new Guild(key, name, rank, level, membersNum, description, members, flag, prestige);
                    guilds.push(guildObject)
                })
                guilds.forEach(guildOfArray => {
                    const members = [];
                    const membersKeys = Object.keys(guildOfArray.members)
                    membersKeys.forEach(keyMember =>{
                        const member = guildOfArray.members[keyMember]
                        const {player_id, name, score, won_battles, era, city_name, clan_id, profile_text, forge_db, rank, is_active, date, clan } = member
                        const link = 'https://www.forge-db.com/mx/mx4/players/profile/?server=mx4&world=Dinegu&id='+player_id
                        const memberObject = new Member(player_id, name, score, won_battles, era, city_name, clan_id, profile_text, link, rank, is_active, date, clan)
                        members.push(memberObject)
                    })
                    memberHistoric.push(members)
                })
                console.log(guilds[0])

                const txName = document.querySelector('#name-clan');
                const txRanking = document.querySelector('#ranking');
                const txNivel = document.querySelector('#nivel');
                const txPrestige = document.querySelector('#prestige');
                const txMembers = document.querySelector('#num-members');
                const flag = document.querySelector('#flag');
                const tittle = document.querySelector('#tittle');
                tittle.innerHTML = `${guilds[0].name}`


                txName.innerHTML = `${guilds[0].name}`
                txRanking.innerHTML = `${guilds[0].rank}`
                txNivel.innerHTML = `${guilds[0].level}`
                txPrestige.innerHTML = `${guilds[0].prestige.toLocaleString()}`
                txMembers.innerHTML = `${guilds[0].membersNum}`
                console.log(flags[guilds[0].date])
                if(flags[guilds[0].date]){
                    flag.src = flags[guilds[0].date]
                }
                renderMembersTable(memberHistoric);
            })
            .catch(error => console.error('Error loading JSON data:', error));
    }
});

function renderMembersTable(memberHistoric) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    const size = memberHistoric.length
    if(size === 1){
        memberHistoric[0].forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="col-1">${member.rank}</td>
                <td class="col-4">${member.name}</td>
                <td >${member.points.toLocaleString()}</td>
                <td>${member.battles.toLocaleString()}</td>
            `;
            row.addEventListener('click', () => {
                window.location.href = `user-details.html?id=${member.id}&clan=${member.clan_id}`;
            });
            tableBody.appendChild(row);
        });
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
    }
}