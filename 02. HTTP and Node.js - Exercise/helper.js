let helper = (() => {
    function isString(key) {
        if (typeof key !== 'string') {
            console.log('Error! The key must be string.');
            return;
        }
    }
    
    function isExist(db, key) {  
        if (db.hasOwnProperty(key) === false) {
            console.log('Error! Key do not exists.');
            return;
        }    
    }
    
    function isNotExist(db, key) {  
        if (db.hasOwnProperty(key)) {
            console.log('Error! Key already exists.');
            return;
        }    
    }
    
    function isEmpty(db) {
        if (db === {}) {
            console.log('Error! Database is empty!');
            return;
        }
    }
    return { isString, isExist, isNotExist, isEmpty }
})();

module.exports = helper;