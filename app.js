const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./database/db');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');


class App {
  constructor() {
    this.app = express();
  }

  #initializeRoutes() {
    this.app.use(bodyParser.json());

    this.app.use('/users', usersRouter);
  }

  async #connectToDatabase() {
    return connectToDatabase();
  }

  async bootstrap() {
    await this.#connectToDatabase();
    this.#initializeRoutes();

    const port = process.env.PORT;
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
}


module.exports = App;