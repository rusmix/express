const express = require('express');
const usersRouter = express.Router();
const UsersController = require('../controllers/usersController');
const { body } = require('express-validator');
const User = require('../database/models/user');

const usersController = new UsersController(User)

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/:id', usersController.getUser);

usersRouter.post('/',
    body('name').isString(),
    body('login').isString(),
    body('password').isString(),
    usersController.createUser
);

usersRouter.delete('/:id', usersController.deleteUser);

usersRouter.patch('/:id',
    body('name').if(body('name').exists()).isString(),
    body('login').if(body('login').exists()).isString(),
    body('password').if(body('password').exists()).isString(),
    usersController.updateUser
);

module.exports = usersRouter;