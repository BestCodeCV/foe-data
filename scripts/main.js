import { User } from './models/user.js';
import { Guild, Member } from './models/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const guilds = [];
    const memberHistoric = []
    const historialGrl = []    
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const clanId = params.get('clan');
    const MarioID = 387826
    const DanielleID = 629473
    const PsycoID = 1083722
    const AquilesID = 310325
    const XtxID = 891490

    const userIds = [MarioID, DanielleID, PsycoID, AquilesID, XtxID]
    const clanIds = ["B.Y.O.B.", "B.Y.O.B.", "LEONES BLANCOS", "Praetorian’s", "Praetorian’s"]
    
        fetch('./scripts/data/guilds.json')
            .then(response => response.json())
            .then(data => {
            clanIds.forEach((clan, index)=>{
                const historialMember = []
                const currentGuild = data[clan]
                const historial = currentGuild["historial"]
                const historialKeys = Object.keys(historial)
                
                historialKeys.forEach(key =>{
                    const entry = historial[key];
                    const { members } = entry;
                    const member = members.find(member => member.player_id=== parseInt(userIds[index]))
                    if(member){
                        const {name, score, won_battles, era, city_name, profile_text, rank, is_active} = member
                        const link = 'https://www.forge-db.com/mx/mx4/players/profile/?server=mx4&world=Dinegu&id='+parseInt(userIds[index])
                        const memberObject = new Member(null, name, score, won_battles, era, city_name, null, profile_text, link, rank, is_active, key, null)
                        historialMember.push(memberObject)
                    }
                })
                memberHistoric.push(historialMember)
            })
            //console.log(memberHistoric)
            const nick = document.querySelector('#nick-user');
            nick.innerHTML = `<span class="h4">Foe Stats</span>`
            //renderMembersTable(memberHistoric);
            drawChart(memberHistoric)
            })
            .catch(error => console.error('Error loading JSON data:', error));
    
});

function renderMembersTable(memberHistoric) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    memberHistoric.forEach((historialMember, index)=>{
        historialMember.forEach(member=>{
            console.log(member.battles)
        })
        const finishPosition = parseInt(memberHistoric.length) - 1
        const row = document.createElement('tr');
        /*let datos = `
            <td class="col-1">${member.date}</td>
        `;
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
        }*/
        //row.innerHTML = datos
        tableBody.appendChild(row);
    })


}
function drawChart(memberHistoric){
    
    const battles = []
    const points = []
    const names = []
    const battlesData = []
    const pointsData = []
    

    memberHistoric.forEach(historialMember=>{
        const battlesForMember = []
        const pointsForMember = []
        const namesForMember = []
        let nameMember = ""
        historialMember.forEach(member=>{
            battlesForMember.push(member.battles)
            pointsForMember.push(member.points)
            namesForMember.push(member.name)
            nameMember = member.name
        })
        battles.push(battlesForMember.reverse())
        points.push(pointsForMember.reverse())
        names.push(namesForMember)
        battlesData.push({ name: nameMember, history: battlesForMember });
        pointsData.push({ name: nameMember, history: pointsForMember })
    })
    console.log(memberHistoric.length)
    console.log(names)
    //const battles = memberHistoric.map(member => member.battles).reverse();
    //const points = memberHistoric.map(member => member.points).reverse();
    
    /*const battlesData = [
        { name: 'Batallas', history: battles }
    ];
    const pointsData = [
        { name: 'Puntos', history: points }
    ];*/
    const ctx1 = document.getElementById('prestige-chart1').getContext('2d');
    const ctx2 = document.getElementById('prestige-chart2').getContext('2d');

    let numDatos = 0
    battles.forEach(battleArray => {
        if (battleArray.length > numDatos) {
            numDatos = battleArray.length;
        }
    });
    const arreglo = Array.from({ length: numDatos }, (_, index) => index + 1);   

    const labels = arreglo; 
    const colors = [
        '#1f77b4', // Azul
        '#ff7f0e', // Naranja
        '#2ca02c', // Verde
        '#d62728', // Rojo
        '#9467bd', // Púrpura
        '#8c564b', // Marrón
        '#e377c2', // Rosa
        '#7f7f7f', // Gris
        '#bcbd22', // Oliva
        '#17becf'  // Cian
    ];
    const datasetBattle = battlesData.map((battle, index) => {
        return {
            label: battle.name,
            data: battle.history,
            borderColor: colors[index], 
            fill: false
        };
    });
    const datasetPoints = pointsData.map((point, index) => {
        return {
            label: point.name,
            data: point.history,
            borderColor: colors[index], 
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
