const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      user: '/api/user',
      vector: '/api/vector',
      valueVector: '/api/valueVector',
    };
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.user, require('../routes/user.routes'));
    this.app.use(this.paths.vector, require('../routes/vector.routes'));
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(
      this.paths.valueVector,
      require('../routes/valueVector.routes'),
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running in port ', this.port);
    });
  }
}

module.exports = Server;
