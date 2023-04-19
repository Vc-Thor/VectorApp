require('dotenv').config();
const Server = require('./src/models/server.models');

const server = new Server();

server.listen();
