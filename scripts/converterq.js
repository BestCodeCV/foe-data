const { KeyObject } = require('crypto');
const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const filePath = path.join(__dirname, 'data', 'guilds.json');

// Leer el archivo JSON y cargar su contenido
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    // Parsear el JSON
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error al parsear el JSON:', parseErr);
        return;
    }
    
    const guildKeys = Object.keys(jsonData)
    //console.log(guildKeys)
    guildKeys.forEach(key=>{
        const historialKeys = Object.keys(jsonData[key].historial)
        //console.log(key)
        historialKeys.forEach(keyHistorial=>{
            const datos = jsonData[key].historial[keyHistorial]
            //console.log(datos.name)
            
            const guildId = 'level_configs';
            const newName = 'Vacío';
            if (jsonData[key].historial[keyHistorial][guildId]) {
                jsonData[key].historial[keyHistorial][guildId] = newName;
            } else {
                console.error('Guild no encontrado');
                return;
            }
            const membersId = 'members'
            const members = jsonData[key].historial[keyHistorial][membersId]
            //console.log(members)
            members.forEach((member, index) => {
        
                //console.log(jsonData[key].historial[keyHistorial][membersId][index].topAchievements)
                if (jsonData[key].historial[keyHistorial][membersId][index].topAchievements) {
                    jsonData[key].historial[keyHistorial][membersId][index].topAchievements = newName;
                    jsonData[key].historial[keyHistorial][membersId][index].gbgStatistics = newName;
                    
                } else {
                    console.error('Member no encontrado');
                    return;
                }
            });
        })
    })
    const updatedJson = JSON.stringify(jsonData, null, 4);

    fs.writeFile(filePath, updatedJson, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error al escribir en el archivo:', writeErr);
            return;
        }
        console.log('Archivo JSON actualizado correctamente.');
    });
});