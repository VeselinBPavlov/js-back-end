const storage = require('./db');

storage.put('first', 'firstValue');
storage.put('second', 'secondValue');
storage.put('third', 'thirdValue');

console.log(storage.get('second'));

storage.update('first', 'updated firstValue');
console.log(storage.get('first'));

storage.remove('second');
console.log(storage.getAll());
storage.clear();

storage.put('first', 'firstValue');
storage.put('second', 'secondValue');

storage
  .save()
  .then((msg) => console.log(msg))
  .catch((err) => {throw new Error(err)});

storage.put('third', 'thirdValue');

storage
  .load()
  .then((data) => console.log(data))
  .catch((err) => {throw new Error(err)});