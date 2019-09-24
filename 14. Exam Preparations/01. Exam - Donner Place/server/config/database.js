const mongoose = require('mongoose');
const User = require('../models/User');

require('../models/Product');
require('../models/Order');

mongoose.Promise = global.Promise;

module.exports = (settings) => {
  mongoose.connect(settings.db, { useNewUrlParser: true });
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  let db = mongoose.connection;

  db.once('open', err => {
    if (err) {
      throw err;
    }

    console.log('MongoDB ready!');

    User.seedAdminUser();
  })

  db.on('error', err => console.log(`Database error: ${err}`));
}
