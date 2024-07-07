import { User } from './models/user.js';
import { Guild, Member } from './models/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const clanLeones = "Leones"
    const clanPretos = "Pretos"
    const clanKraken = "Kraken"
    const clanD = "El clan"
    const clanPirata = "Mugiwaras"
    const clanAndaluz = "Andaluz"
    const clanByob = "BYOB"
    const clanGenei = "Genei"

    const pies = [
        "07/07", "05/07", "04/07", "03/07", "01/07", "28/06", "26/06"
    ]
    const leones = {
        name: clanLeones,
        ptos: [54721, 50777,48537,45233, 42829,36169,32901]
    }        
    const pretos = {
        name: clanPretos,
        ptos: [43512, 40240,38664,36096, 33932,28312,25748]
    }       
    const kraken = {
        name: clanKraken,
        ptos: [39328, 36000,34628,31176, 29384,23156,20648]
    }       
    const d = {
        name: clanD,
        ptos: [28452, 26260,25100,23780, 22464,18364,16588]
    }       
    const pirata = {
        name: clanPirata,
        ptos: [23376, 21244,20668,18472, 17036,13484,12088]
    }       
    const andaluz = {
        name: clanAndaluz,
        ptos: [22932,20744,19656,17960, 16356,13032,11772]
    }       
    const byob = {
        name: clanByob,
        ptos: [19452, 17372,16564,15048, 13656,10796,9704]
    }       
    const genei = {
        name: clanGenei,
        ptos: [19104, 17284,16304,14392, 13248,11684,10456]
    }       
    
    const datos = [leones, pretos, kraken, d, pirata, andaluz, byob, genei]
    drawChart(datos,pies)

});

function drawChart(datos, pies){
    
    const ctx1 = document.getElementById('prestige-chart1').getContext('2d');

    const labels = pies.reverse(); 
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
    const datasetBattle = datos.map((guild, index) => {
        return {
            label: guild.name,
            data: guild.ptos.reverse(),
            borderColor: colors[index], 
            fill: false
        };
    });
   
    
    const dataBattle = {
        labels: labels,
        datasets: datasetBattle
    };
   
    
    const configBattle = {
        type: 'line',
        data: dataBattle,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Ranking Q'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Día'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Ptos en el Ranking'
                    }
                }
            }
        }
    };
    
    new Chart(ctx1, configBattle);
}
