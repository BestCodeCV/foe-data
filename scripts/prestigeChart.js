// Ejemplo de datos de historial de prestigio (simulado)
const guildsData = [
    { guildName: 'Guild One', prestigeHistory: [1000, 1100, 1050, 1200, 1250] },
    { guildName: 'Guild Two', prestigeHistory: [900, 950, 920, 1000, 1050] },
    // Otros datos de guilds
];

document.addEventListener('DOMContentLoaded', () => {
    const ctx1 = document.getElementById('prestige-chart1').getContext('2d');
    const ctx2 = document.getElementById('prestige-chart2').getContext('2d');
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']; // Ejemplo de etiquetas de tiempo

    const datasets = guildsData.map(guild => {
        return {
            label: guild.guildName,
            data: guild.prestigeHistory,
            borderColor: getRandomColor(), // Función para obtener colores aleatorios
            fill: false
        };
    });

    const data = {
        labels: labels,
        datasets: datasets
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Historial de Prestigios'
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
                        text: 'Prestigio'
                    }
                }
            }
        }
    };

    new Chart(ctx1, config);
    new Chart(ctx2, config);
    function getRandomColor() {
        // Genera un color hexadecimal aleatorio
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
});