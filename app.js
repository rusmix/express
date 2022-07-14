const express = require('express');
require('dotenv').config();
const app = express();
const connectToDatabase = require('./database/db');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
const port = process.env.PORT;

const main = async () => {
  await connectToDatabase();

  app.use(bodyParser.json());
  app.use('/users', usersRouter);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}


main();