const env = 'development';

const express = require('express');
const settings = require('./config/settings')[env];
const database = require('./config/database');
const server = require('./config/server');
const routes = require('./config/routes');

database(settings);
const app = express();
server(app);
const port = settings.port;

routes(app);

app.listen(port, () => `Server is listening on port ${port}...`);
console.log(`Server is listening on port ${port}...`);