import { User } from './models/user.js';



import { Guild, Member } from './models/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const guilds = [];
    const memberHistoric = []
    const historialGrl = []    
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const clanId = params.get('clan');
    if (userId) {
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
                
                const { id, description, name, rank, level, membersNum, date, prestige, members } = firstEntry;
                const guildObject = new Guild(id, name, rank, level, membersNum, description, members, date, prestige);
                guilds.push(guildObject);
            });
            const actualGuild = guilds.find(guild => guild.id === parseInt(clanId, 10));
            const currentGuild = data[actualGuild.name]
            
            const historial = currentGuild["historial"]
            const historialKeys = Object.keys(historial)
            
            historialKeys.forEach(key =>{
                const entry = historial[key];
                const { members } = entry;
                const member = members.find(member => member.player_id=== parseInt(userId))
                if(member){
                    const {name, score, won_battles, era, city_name, profile_text, rank, is_active} = member
                    const link = 'https://www.forge-db.com/mx/mx4/players/profile/?server=mx4&world=Dinegu&id='+parseInt(userId)
                    const memberObject = new Member(null, name, score, won_battles, era, city_name, null, profile_text, link, rank, is_active, key, null)
                    if (memberObject && memberObject.battles !== null && memberObject.battles !== undefined
                        && memberObject.points !== null && memberObject.points !== undefined
                    ) {
                        memberHistoric.push(memberObject)
                    }
                }
            })
            const nick = document.querySelector('#nick-user');
            nick.innerHTML = `<span class="h4">Jugador:  </span>    ${memberHistoric[0].name}`
            
            renderMembersTable(memberHistoric);
            drawChart(memberHistoric)
            })
            .catch(error => console.error('Error loading JSON data:', error));
    }
    
});

function renderMembersTable(memberHistoric) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    const size = memberHistoric.length

    memberHistoric.forEach((member, index)=>{
        const finishPosition = parseInt(memberHistoric.length) - 1
        const row = document.createElement('tr');
        let datos = `
            <td class="col-1">${member.date}</td>
        `;
        console.log(member.battles + " hola " + member.points)
        if (index === parseInt(finishPosition)) {
            datos += `
            <td class="col-4">${member.points.toLocaleString()}</td>
            <td class="col-4">${member.battles.toLocaleString()}</td>
            `;
        }else{
            const differenceBattles = member.battles - memberHistoric[index+1].battles
            const differencePoints = member.points - memberHistoric[index+1].points

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
        }
        row.innerHTML = datos
        tableBody.appendChild(row);
    })


}
function drawChart(memberHistoric){
    
    const battles = memberHistoric.map(member => member.battles).reverse();
    const points = memberHistoric.map(member => member.points).reverse();
    
    const battlesData = [
        { name: 'Batallas', history: battles },
    ];
    const pointsData = [
        { name: 'Puntos', history: points }
    ];

    const ctx1 = document.getElementById('prestige-chart1').getContext('2d');
    const ctx2 = document.getElementById('prestige-chart2').getContext('2d');

    const size = memberHistoric.length;
    const arreglo = Array.from({ length: size }, (_, index) => index + 1);   
    const labels = arreglo; 


    const datasetBattle = battlesData.map(battle => {
        return {
            label: battle.name,
            data: battle.history,
            borderColor: "#FFC300", 
            fill: false
        };
    });
    const datasetPoints = pointsData.map(point => {
        return {
            label: point.name,
            data: point.history,
            borderColor: " #FF5733", 
            fill: false
        };
    });
    
    const dataBattle = {
        labels: labels,
        datasets: datasetBattle
    };
    const dataPoint = {
        labels: labels,
        datasets: datasetPoints
    };
    
    const configBattle = {
        type: 'line',
        data: dataBattle,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Historial de Batallas'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Días'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Batallas'
                    }
                }
            }
        }
    };
    const configPoint = {
        type: 'line',
        data: dataPoint,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Historial de Puntos'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Días'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Puntos'
                    }
                }
            }
        }
    };
    new Chart(ctx1, configBattle);
    new Chart(ctx2, configPoint);
    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
}
