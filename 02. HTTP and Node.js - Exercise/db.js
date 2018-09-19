const helper = require('./helper');
const fs = require('fs');

let db = {};

let put = (key, value) => {
    helper.isString(key);
    helper.isNotExist(key);
    db[key] = value;
}

let get = (key) => {
    helper.isString(key);
    helper.isExist(db, key);
    return db[key];
}

let update = (key, value) => {
    helper.isString(key);
    helper.isExist(db, key);
    db[key] = value;
}

let remove = (key) => {
    helper.isString(key);
    helper.isExist(db, key);  
    delete db[key];
}

let clear = () => {
    db = {};
}

let getAll = () => {
    helper.isEmpty(db);
    return db;
}

let save = () => {
    return new Promise((resolve, reject) => {

        let dataStringifyed = JSON.stringify(db);
        fs.writeFile('./storage.json', dataStringifyed, (err) => {
          if (err) {
            reject(err);
            return;
          }
    
          resolve('File saved.');
        });
    });
}

let load = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./storage.json', 'utf8', (err, fileData) => {
            if (err) {
              reject(err);
              return;
            }
      
            db = JSON.parse(fileData);      
            resolve(db);
        });
   });
}

module.exports = {
    db: db,
    put: put,
    get: get, 
    getAll: getAll,
    update: update,
    remove: remove,
    clear: clear,
    save: save,
    load: load 
}