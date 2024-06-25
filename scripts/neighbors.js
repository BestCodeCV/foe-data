import { Neighbor } from './models/utils.js';
const neighbors = []
document.addEventListener('DOMContentLoaded', () => {
    
        fetch('./scripts/data/neighbors.json')
            .then(response => response.json())
            .then(data => {
                const topKeys = Object.keys(data)
                topKeys.forEach(element =>{
                    const { name, img, atq, def, pos, units } = data[element]
                    const neighbor = new Neighbor(name, img, atq, def, pos, units)
                    neighbors.push(neighbor)
                })
                renderMembersTable(neighbors);
            })
            .catch(error => console.error('Error loading JSON data:', error));
});

function renderMembersTable(neighbors) {
    const tableBody = document.querySelector('#card-container');
    let datos = ``
    neighbors.forEach(neighbor=>{
        datos+=getHtml(neighbor)
    })
    tableBody.innerHTML = datos;
    
}
function getHtml(player){
    console.log("jugadores" + player)
    let dataPlayer = `
            <div class="col-12 col-md-6 col-xl-6 p-1">
                    <div class="card">
                        <div class="row m-0 p-0">
                            <div class="col-2 p-2">
                                <img src="${player.img}" class="img-fluid w-100 h-100" alt="Imagen Principal" style="object-fit: cover;">
                            </div>
                            <div class="col-10 p-2">
                                <div class="row">
                                    <div class ="col col-2 text-truncate fw-bold">
                                        #${player.pos}
                                    </div>
                                    <div class ="col col-4 text-truncate fw-bold">
                                        ${player.name}
                                    </div>
                                    <div class ="col col-3 text-truncate fw-bold">
                                        ${player.atq}
                                    </div>
                                    <div class ="col col-3 text-truncate fw-bold">
                                        ${player.def}
                                    </div>
                                </div>
                                <div class="row p-2">`
    dataPlayer +=getImgs(player)
    dataPlayer +=               `</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
    ` 
    return dataPlayer
}
function getImgs(player){
    let info = ``
    const imgs = {
        1: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_permafrost_drone-6bece67f3.jpg",
        2: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_molecular_enforcer-3cfce05df.jpg",
        3: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_icebreaker-d30bd329b.jpg",
        4: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_pressurizer-8b1ecfe72.jpg",
        5: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_overclock_orbiter-ff13787a2.jpg",
        6: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_SpaceAgeTitan_champion-b584bb8f1.jpg",
        7: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_javeliner-157d8d545.jpg",
        8: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_rogue-8dbaf4fa6.jpg",
        9: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_abyssal_glider-4909bae5f.jpg",
        10: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_division_drones-1c12a5556.jpg",
        11: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_glacier_hiker-141910372.jpg",
        12: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_harpoon_grenadier-be1f794a4.jpg",
        13: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_cavitation_tank-113000342.jpg",
        14: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_SpaceAgeJupiterMoon_champion-0c4df80d5.jpg",
        15: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_energy_cannon-828c5b779.jpg",
        16: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_observer_drone-c3b28f26a.jpg",
        17: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_steel_fist-480e91701.jpg",
        18: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_ghost_blaster-20e0e1cac.jpg",
        19: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_power_dragon-a8a6acd4a.jpg",
        20: "https://foeen.innogamescdn.com/assets/shared/unit_portraits/armyuniticons_90x90/armyuniticons_90x90_SpaceAgeVenus_champion-08efdc7e4.jpg"
    }
    const imgDefault = `
        <div class="col m-0 p-1">

        </div>
    `
    let array = Array.from({length: 8}, () => imgDefault);

    player.units.forEach((key, index)=>{
        const datoAux  = `
        <div class="col m-0 p-1">
            <img src="${imgs[key]}" class="img-fluid w-100 h-100 " alt="Imagen Principal" style="object-fit: cover;">
        </div>
        `
        array[index] = datoAux
    })
    array.forEach(elemento=>{
        info += elemento
    })
    return info
}

const btnPosition = document.getElementById('btn-position');
const btnName = document.getElementById('btn-name');
const btnAtack = document.getElementById('btn-atack');
const btnDefense = document.getElementById('btn-defense');
let reverse = false
let name = false 
let ataque = false
let defensa = false
btnPosition.addEventListener('click', function() {
    if(!reverse){
        let x = [...neighbors]
        renderMembersTable(x.reverse());
    }else{
        renderMembersTable(neighbors);
    }
    reverse=!reverse
});
btnName.addEventListener('click', function() {
    if(!name){
        let x = [...neighbors]
        x.sort(function (a, b){
            return a.name.localeCompare(b.name, 'en', { numeric: true })
        });
        renderMembersTable(x);
    }else{
        let x = [...neighbors]
        x.sort(function (a, b){
            return a.name.localeCompare(b.name, 'en', { numeric: true })
        });
        renderMembersTable(x.reverse());
    }
    name=!name
});
btnAtack.addEventListener('click', function() {
    if(!ataque){
        let x = [...neighbors]
        console.log(x)
        x.sort(function (a, b){
            return parseInt(a.atq) - (parseInt(b.atq))
        });
        renderMembersTable(x);
    }else{
        let x = [...neighbors]
        x.sort(function (a, b){
            return parseInt(a.atq) - (parseInt(b.atq))
        });
          
        console.log(x)
        renderMembersTable(x.reverse());
    }
    ataque=!ataque
});
btnDefense.addEventListener('click', function() {
    if(!defensa){
        let x = [...neighbors]
        x.sort(function (a, b){
            return parseInt(a.def) - (parseInt(b.def))
        });
        renderMembersTable(x);
    }else{
        let x = [...neighbors]
        x.sort(function (a, b){
            return parseInt(a.def) - (parseInt(b.def))
        });
          
        renderMembersTable(x.reverse());
    }
    defensa=!defensa
});