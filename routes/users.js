const express = require('express');
const usersRouter = express.Router();
const User = require('../database/models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const { getUsers, getUser, createUser, deleteUser, updateUser } = require('../controllers/user');
const { body } = require('express-validator');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUser);

usersRouter.post('/', 
    body('name').isString(), 
    body('login').isString(), 
    body('password').isString(), 
    createUser);

usersRouter.delete('/:id', deleteUser);

usersRouter.patch('/:id', 
    body('name').if(body('name').exists()).isString(), 
    body('login').if(body('login').exists()).isString(), 
    body('password').if(body('password').exists()).isString(),
    
    updateUser);

module.exports = usersRouter;