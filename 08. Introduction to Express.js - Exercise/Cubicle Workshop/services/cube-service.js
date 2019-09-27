const fs = require('fs');

module.exports = {
    addCube: (cube) => {
        fs.readFile('../Cubicle Workshop/database/database.json', (err, data) => {
            if (err) {
                throw err;
            }
    
            let cubes = JSON.parse(data);
            cubes.push(cube);
            let json = JSON.stringify(cubes);
    
            fs.writeFile('../Cubicle Workshop/database/database.json', json, () => console.log('Cube is saved successfully!'));        
        });  
    },

    getAllCubes: () => {        
        fs.readFile('../Cubicle Workshop/database/database.json', (err, data) => {
            if (err) {
                throw err;
            }
    
            let cubes = JSON.parse(data);
            console.log(cubes)
            return cubes;
        });          
    }
}