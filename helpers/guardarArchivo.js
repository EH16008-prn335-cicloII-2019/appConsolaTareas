const fs = require('fs');
//Defino el path para poder llegar a escribir sobre tareas.JSON
const path = `./db/tareas.json`;
//
const guardarDB = (data) =>{
    try {
        fs.writeFileSync(path,JSON.stringify(data));    
    } catch (err) {
            throw err;
    }
    
};
const leerDB = () => {
    if (!fs.existsSync(path)) {
        return null;
    }
        const leido =fs.readFileSync(path,{encoding:'utf8', flag:'r'});
       const data = JSON.parse(leido);
       //console.log(data);
       return data;
  };
module.exports = {
    guardarDB,
    leerDB
};